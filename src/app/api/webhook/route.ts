import { db } from "@/db";
import { agents, meetings } from "@/db/schema";
import { streamVideo } from "@/lib/stream_video";
import {
    CallSessionParticipantLeftEvent,
    CallSessionStartedEvent
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
                eq(meetindId,meetings.id),
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
        const call = streamVideo.video.call("default", meetingId);
        const realTimeClient = await streamVideo.video.connectOpenAi({
            call,
            openAiApiKey : process.env.NEXT_OPEN_API_KEy!.trim(),
            agentUserId : existingAgent.id
        })
        realTimeClient.updateSession({
            instructions: existingAgent.instructions
        })
    }else if( eventType === "call.session_participant_left"){
        const event = payload as CallSessionParticipantLeftEvent;
        const meetindId = event.call_cid.split(":")[1];
         if( !meetindId ){
                return NextResponse.json({error : "Missing meetindId from second event Type"}, { status : 404 });
        }
        const call = streamVideo.video.call("default",meetindId);
        await call.end();
    }

    return NextResponse.json({status : "ok"})
}

