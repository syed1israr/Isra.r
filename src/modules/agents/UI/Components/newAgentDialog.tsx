import { ResponsiveDialog } from "@/components/Responsive-dialoge";
import { AgentsForm } from "./Agents_Form";



interface Props{
    open: boolean;
    onOpenChange: (open: boolean) => void;
};


export const NewAgentDialog = ({ open, onOpenChange }: Props) => {
  return (
    <ResponsiveDialog
      title="New Agent"
      description="Create a new agent to automate your tasks."
      open={open}
      onOpenChange={onOpenChange}
    >
      <AgentsForm
      onSuccess={() => onOpenChange(false)}
      onCancel={() => onOpenChange(false)}
      />
    </ResponsiveDialog>
  )
}
