'use client';

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

import { columns } from "../Components/Columns";
import { Empty_state } from "@/components/Empty_state";
import { useAgentsFilters } from "../../hooks/Use_Agents_Filters";
import DataPagination from "../Components/DataPagination";
import { useRouter } from "next/navigation";
import { Generic_Data_table } from "@/components/Generic_Data_table";

export const AgentsView = () => {
  const trpc = useTRPC();
  const [filters, setfilters] = useAgentsFilters();
  const router = useRouter();

  const { data } = useSuspenseQuery({
    ...trpc.agents.getMany.queryOptions({ ...filters })
  });

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      {data.items.length === 0 ? (
        <Empty_state
          title="Create your First Agent"
          description="Create an Agent to Join your Meetings, Each Agent will follow your instructions and can interact with participants during the call."
        />
      ) : (
        <>
          <Generic_Data_table
           data={data.items} 
           columns={columns}
           onRowClick={(r)=>router.push(`/agents/${r.id}`)}
           />
          <DataPagination
              page={filters.page}
              total_pages={data.total_pages}
              onPageChange={(page) => setfilters((prev) => ({ ...prev, page }))}
            />

        </>
      )}
    </div>
  );
};
