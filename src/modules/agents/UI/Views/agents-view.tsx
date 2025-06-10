'use client';

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DataTable } from "../Components/data-table";
import { columns } from "../Components/Columns";
import { Empty_state } from "@/components/Empty_state";


export const AgentsView = () => {
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());
  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
    {data.length === 0 ? (
      <Empty_state 
        title="Create your First Agent" 
        description="Create an Agent to Join your Meetings, Each Agent will follow your instructions and can interact with participants during the call."
      />
    ) : (
      <DataTable data={data} columns={columns} />
    )}
    </div>
  )
};
