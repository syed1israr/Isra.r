import { Empty_state } from "@/components/Empty_state"
import { Button } from "@/components/ui/button"
import { BanIcon, VideoIcon } from "lucide-react"
import Link from "next/link"


interface props{
    meetingId : string,
    onCancelMeeting : () => void;
    isCancelling : boolean
}

export const UpComingState = ({meetingId,isCancelling,onCancelMeeting} : props) => {
    return(
        <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center">
            <Empty_state
            image="/upcoming.svg"
            title="Not Started yet"
            description="Once you Start this Meeting, a summary Will appear here"
            />
            <div className="flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-2 w-full">
                <Button
                variant={"secondary"}
                className="w-full lg:w-auto"
                onClick={onCancelMeeting}
                disabled={isCancelling}
                >
                    <BanIcon/>
                    Cancel Meeting
                </Button>
                   <Button asChild className="w-full lg:w-auto"
                   disabled={isCancelling}
                   >
                     <Link href={`/call/${meetingId}`}>
                    <VideoIcon/>
                    Start Meeting
                    </Link>
                </Button>
               
            </div>
        </div>
    )
}