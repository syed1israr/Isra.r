'use client'
import { CommandInput, CommandItem, CommandList, CommandResponsiveDialoge } from "@/components/ui/command";
import { Dispatch, SetStateAction } from "react";

interface props{
    open : boolean;
    setOpen : Dispatch<SetStateAction<boolean>>;
    
}
const DashboardCommand = ({open,setOpen}:props) => {
    console.log("dashBoardCommand",open,setOpen)
  return (
    <CommandResponsiveDialoge open={open} onOpenChange={setOpen}>
        <CommandInput
        placeholder="Find a meeting or Agent"
        />
        <CommandList>
            <CommandItem>Test1</CommandItem>
            <CommandItem>Test2</CommandItem>
            <CommandItem>Test3</CommandItem>
            <CommandItem>Test4</CommandItem>
            <CommandItem>Test5</CommandItem>
        </CommandList>
    </CommandResponsiveDialoge>
  )
}

export default DashboardCommand