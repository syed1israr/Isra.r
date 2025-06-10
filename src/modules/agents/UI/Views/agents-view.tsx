'use client';

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DataTable } from "../Components/data-table";
import { columns } from "../Components/Columns";
import { Empty_state } from "@/components/Empty_state";
import { useAgentsFilters } from "../../hooks/Use_Agents_Filters";
import DataPagination from "../Components/DataPagination";
import { useRouter } from "next/navigation";

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
          <DataTable
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
