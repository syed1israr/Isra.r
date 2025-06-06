'use client';

import { Error_state } from "@/components/Error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const AgentsView = () => {
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  return (
    <div>
      <h1>Agents</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};
