'use client'
import { Error_state } from "@/components/Error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import AgentIdViewHeader from "../Components/AgentIdViewHeader";
import { GenerateAvatar } from "@/components/generator";
import { Badge } from "@/components/ui/badge";
import { VideoIcon } from "lucide-react";

interface props {
    agentId: string
};

export const AgentIdView = ({ agentId }: props) => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.agents.getOne.queryOptions({ id: agentId }));

    return (
        <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
            <AgentIdViewHeader
                agentId={agentId}
                agentName={data.name}
                onEdit={() => { }}
                onRemove={() => { }}
            />
            <div className="bg-white rounded-lg border">
                <div className="px-4 py-5 flex flex-col gap-y-5"> {/* Removed col-span-5 and adjusted flex direction */}
                    <div className="flex items-center gap-x-3">
                        <GenerateAvatar
                            variant={"botttsNeutral"}
                            seed={data.name}
                            className="size-10"
                        />
                        <h2 className="text-2xl font-medium">{data.name}</h2>
                    </div>
                    {/* This div now contains the badge and instructions, placed below the avatar/name */}
                    <div className="flex flex-col gap-y-4">
                        <Badge variant={"outline"} className="flex items-center gap-x-2 w-fit [&svg]:size-4"> {/* Added w-fit to constrain badge width */}
                            <VideoIcon className="text-blue-700" />
                            {data.meetingCount} {data.meetingCount === 1 ? "Meeting" : "Meetings"}
                        </Badge>
                        <div> {/* This div wraps the instructions to create vertical spacing */}
                            <p className="text-lg font-medium">Instructions</p>
                            <p className="text-neutral-800">{data.instructions}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const AgentIdviewLoading = () => {
    return (
        <LoadingState
            title="Loading Agent"
            description="this my take few seconds"
        />
    )
}
export const AgentIdviewError = () => {
    return (
        <Error_state
            title="Error Loading Agent"
            description="Something went Wrong"
        />
    )
}