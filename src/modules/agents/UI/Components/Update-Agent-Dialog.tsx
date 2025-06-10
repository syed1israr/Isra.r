import { ResponsiveDialog } from "@/components/Responsive-dialoge";
import { AgentGetOne } from "../../types";
import { AgentsForm } from "./Agents_Form";



interface Props{
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initalValues : AgentGetOne;
};




export const UpdateAgentDialog = ({ open, onOpenChange, initalValues }: Props) => {
    return (
    <ResponsiveDialog
      title="Edit Agent"
      description="Edit Agent Details"
      open={open}
      onOpenChange={onOpenChange}
    >
      <AgentsForm
      onSuccess={() => onOpenChange(false)}
      onCancel={() => onOpenChange(false)}
      initalValues = {initalValues}
      />
    </ResponsiveDialog>
  )
}
