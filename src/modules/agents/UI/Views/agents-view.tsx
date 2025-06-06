'use client';

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const AgentsView = () => {
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  return (
    <div>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Agents</h1>
        <div className="grid gap-4">
          {data?.map((agent) => (
            <div key={agent.id} className="p-4 border rounded-lg">
              <h3 className="font-semibold">{agent.name}</h3>
              <p className="text-gray-600">{agent.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
