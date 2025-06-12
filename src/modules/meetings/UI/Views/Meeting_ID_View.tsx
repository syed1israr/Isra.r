"use client"
import { Error_state } from "@/components/Error-state";
import { LoadingState } from "@/components/loading-state";
import { useConfirm } from "@/hooks/use-confirm";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import MeetingIdViewHeader from "../Components/MeetingIdViewHeader";
import { UpdateMeetingDialog } from "../Components/UpdateMeetingDialog";
import { useState } from "react";
import { meetings } from "@/db/schema";
import { UpComingState } from "../Components/UpcomingState";
import { ActiveState } from "../Components/ActiveState";
import { CancelledState } from "../Components/CancelledState";
import { ProcessingState } from "../Components/ProcessingState";
import {Completed_state} from "../Components/Completed_state";

interface props {
    meetingId : string;
}


export const MeetingIdView = ( {meetingId} : props) =>{
    const router = useRouter();
    const trpc = useTRPC();
    const queryClient = useQueryClient();
    const [updateMeetingDialog,setupdateMeetingDialog] = useState(false);

    const[ RemoveConfirmation, confirmRemove] = useConfirm(
        "Are you sure ? ",
        "The following action will remove this meeting"
    )

    const { data } = useSuspenseQuery(
        trpc.meetings.getOne.queryOptions({ id : meetingId}),
    )
    
    const removeMeeting = useMutation(
        trpc.meetings.remove.mutationOptions({
            onSuccess:()=>{
                queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({})
            )
            router.push("/meetings");
            },
        })
    )


    const handlerRemoveMeeting = async() =>{
        const ok = await confirmRemove();
        if( !ok  ) return;
        await removeMeeting.mutateAsync({ id : meetingId});
    }

    const isActive = data.status === "active";
    const isUpcoming = data.status === "upcoming";
    const isCompleted = data.status === "completed";
    const isProcessing = data.status === "processing";
    const isCancelled = data.status === "cancelled";

    return (
        <>
        <RemoveConfirmation/>
        <UpdateMeetingDialog
            open={updateMeetingDialog}
            onOpenChange={setupdateMeetingDialog}
            initialValues={data}
        />
        <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
            <MeetingIdViewHeader
            meetingId={meetingId}
            meetingName={data.name}
            onEdit = {()=>setupdateMeetingDialog(true)}
            onRemove = {handlerRemoveMeeting}
            />
            { isCancelled && <CancelledState/>}
            { isActive && <ActiveState meetingId={meetingId}/> }
            { isUpcoming && <UpComingState 
            meetingId={meetingId}
            onCancelMeeting={()=>{}}
            isCancelling={false}
            /> }
            { isProcessing && <ProcessingState/> }
            { isCompleted && <Completed_state data={data} />}
        </div>
        </>
    )
}



export const MeetingIdViewLoading = () => {
    return (
        <LoadingState
            title="Loading Meeting"
            description="this my take few seconds"
        />
    )
}
export const MeetingIdViewError = () => {
    return (
        <Error_state
            title="Error Loading Meeting"
            description="Something went Wrong"
        />
    )
}


