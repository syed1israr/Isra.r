'use client'
import { CommandInput ,CommandDialog, CommandList, CommandItem} from "@/components/ui/command"
import { Dispatch, SetStateAction } from "react";

interface props{
    open : boolean;
    setOpen : Dispatch<SetStateAction<boolean>>;
    
}
const DashboardCommand = ({open,setOpen}:props) => {
    console.log("dashBoardCommand",open,setOpen)
  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
        placeholder="Find a meeting or Agent"
        />
        <CommandList>
            <CommandItem>Test</CommandItem>
        </CommandList>
    </CommandDialog>
  )
}

export default DashboardCommand