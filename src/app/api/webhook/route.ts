import { db } from "@/db";
import { agents, meetings } from "@/db/schema";
import { inngest } from "@/ingest/client";
import { streamVideo } from "@/lib/stream_video";
import {
    CallEndedEvent,
    CallRecordingReadyEvent,
    CallSessionParticipantLeftEvent,
    CallSessionStartedEvent,
    CallTranscriptionReadyEvent
} from "@stream-io/node-sdk";

import { and, eq, not } from "drizzle-orm";

import { NextRequest, NextResponse } from "next/server";

function verifySignature(body : string, signature : string ) : boolean{
    return streamVideo.verifyWebhook(body,signature)
}


export async function POST(req:NextRequest){
    const signature = req.headers.get("x-signature");
    const apiKey = req.headers.get("x-api-key");
    if( !signature || !apiKey ){
        return NextResponse.json(
            { error : "Missing Signature or API key"},
            { status : 400}
        )
    }
    const body = await req.text();

    if( !verifySignature(body,signature)){
        return NextResponse.json({ error : "Invalid Signature"},{status : 401});
    }
    
    let payload : unknown;
    try{
        payload = JSON.parse(body) as Record<string,unknown>;
    }catch{
        return NextResponse.json({error : "Invalid JSON"}, { status : 400 });
    }

    const eventType = ( payload  as Record<string,unknown>)?.type;

    if( eventType === "call.session_started"){
        const event = payload as CallSessionStartedEvent;
        const meetindId = event.call.custom?.meetingId;
        if( !meetindId ){
            return NextResponse.json({error : "Missing MeetingId"}, { status : 400 });
        }
        const [ existingMeeting ] = await db
        .select()
        .from(meetings)
        .where(
            and(
                eq(meetings.id,meetindId),
                not(eq(meetings.status,"completed")),
                not(eq(meetings.status,"active")),
                not(eq(meetings.status,"cancelled")),
            )
        );
           if( !existingMeeting ){
            return NextResponse.json({error : "Missing Meeting"}, { status : 404 });
        }

        await db.update(meetings).set({
            status : "active",
            startedAt : new Date(),
        })
        .where(eq(meetings.id, existingMeeting.id));

        const [ existingAgent ] = await db
        .select()
        .from(agents)
        .where(eq(agents.id,existingMeeting.agentId));
        if( !existingAgent ){
                return NextResponse.json({error : "Missing Agent"}, { status : 404 });
        }
        const call = streamVideo.video.call("default", meetindId);
        let realTimeClient;
      try {
           realTimeClient = await streamVideo.video.connectOpenAi({
              call,
              openAiApiKey : process.env.NEXT_OPEN_API_KEY!,
              agentUserId : existingAgent.id
          })
         await realTimeClient.updateSession({
            instructions: existingAgent.instructions
        });
      } catch (error) {
        return NextResponse.json({ error: "OpenAI connection failed", details: String(error) }, { status: 500 });
      }
    }else if( eventType === "call.session_participant_left"){
        const event = payload as CallSessionParticipantLeftEvent;
        const meetindId = event.call_cid.split(":")[1];
         if( !meetindId ){
                return NextResponse.json({error : "Missing meetindId from second event Type"}, { status : 404 });
        }
        const call = streamVideo.video.call("default",meetindId);
        await call.end();
    }else if( eventType === "call.session_ended" ){
        const event  = payload as CallEndedEvent;
        const meetingId = event.call.custom?.meetingId;
         if( !meetingId ){
                return NextResponse.json({error : "Missing meetindId from second event Type"}, { status : 404 });
        }
        await db
        .update(meetings)
        .set({
            status:"processing",
            endedAt: new Date(),
        })
        .where(and(eq(meetings.id,meetingId),eq(meetings.status,'active')))
    }else if( eventType === "call.transcription_ready"){
        const event = payload as CallTranscriptionReadyEvent;
        const meetingId = event.call_cid.split(":")[1];
        const [ updatedMeeting ] = await db
        .update(meetings)
        .set({
            transcriptUrl: event.call_transcription.url,
        })
        .where(eq(meetings.id,meetingId))
        .returning();

         if( !updatedMeeting ){
                return NextResponse.json({error : "Failed to Update Meetings"}, { status : 404 });
        }
        await inngest.send({
            name : "meetings/processing",
            data : {
                meetingId : updatedMeeting.id,
                transcriptUrl : updatedMeeting.transcriptUrl,
            },
        })
    }else if( eventType === "call.recording_ready" ){
        const event = payload as CallRecordingReadyEvent;
        const meetingId = event.call_cid.split(":")[1];
        await db
        .update(meetings)
        .set({
            recordingUrl: event.call_recording.url,
        })
        .where(eq(meetings.id,meetingId))
    }

    return NextResponse.json({status : "ok"})
}

