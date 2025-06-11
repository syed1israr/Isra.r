import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronRight, MoreVerticalIcon, PencilIcon, TrashIcon } from "lucide-react"
import Link from "next/link"

interface props{
    meetingId : string,
    meetingName :  string,
    onEdit : () => void
    onRemove : () => void
}



const MeetingIdViewHeader = ({ meetingId, meetingName, onEdit, onRemove} : props ) => {
  return (
    <div className="flex items-center justify-between">
        <Breadcrumb>
        <BreadcrumbList>
        <BreadcrumbItem>
        <BreadcrumbLink asChild className="font-medium text-xl">
        <Link href={"/meetings"}>
            My Meetings
        </Link>
        </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-foreground text-xl font-medium [&svg]:size-4">
        <ChevronRight/>
        </BreadcrumbSeparator>
        <BreadcrumbItem>
        <BreadcrumbLink asChild className="font-medium text-xl text-foreground">
        <Link href={`/meetings/${meetingId}`}>
            {meetingName}
        </Link>
        </BreadcrumbLink>
        </BreadcrumbItem>
        </BreadcrumbList>
        </Breadcrumb>

        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button variant={"ghost"}>
                 <MoreVerticalIcon/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onEdit}>
                <PencilIcon className="size-4 text-black"/>
                Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onRemove}>
                <TrashIcon className="size-4 text-black"/>
                Delete
            </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}

export default MeetingIdViewHeader