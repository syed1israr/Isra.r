"use client"
import { Error_state } from "@/components/Error-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CallProvider } from "../Components/Call_provider";
interface props{
    meetingId : string;
}


export const CallView = ({meetingId} : props) => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.meetings.getOne.queryOptions({id : meetingId}))
    if( data.status === "completed"){
        return(
            <div className="flex h-screen items-center justify-center">
                <Error_state
                title="This meeting has Ended"
                description="You can no Longer Join this meeting"
                />
            </div>
        )
    }
    return(
        <CallProvider meetingId={meetingId} meetingName={data.name} />
    )
}