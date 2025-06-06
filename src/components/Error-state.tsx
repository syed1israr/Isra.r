import { AlertCircleIcon } from "lucide-react";

interface props{
    title?: string;
    description?: string;
}


export const Error_state = ({ title, description } : props) => {
    return (
        <div className="py-4 tx-8 flex flex-1 items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-y-6 bg-rounded-lg p-10 shadow-sm">
                <AlertCircleIcon className="size-6  text-red-500"/>
                <div className="flex flex-col gap-y-2 text-center">
                    <h6 className="text-lg font-medium">{title}</h6>
                    <p className="text-sm"> {description}</p>
                </div>
            </div>
        </div>
    )
}