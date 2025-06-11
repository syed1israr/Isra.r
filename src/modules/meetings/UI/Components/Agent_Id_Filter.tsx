import { useTRPC } from '@/trpc/client'
import React, { useState } from 'react'
import { useMeetingsFilter } from '../../Hooks/Use-Meetings-Filter.';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Command_select from '@/components/Command-select';
import { GenerateAvatar } from '@/components/generator';

const Agent_Id_Filter = () => {
    const trpc = useTRPC();
    const [filters,setfilters] = useMeetingsFilter();
    const [agentSearch,setagentSearch] = useState("")
    const { data } = useQuery(trpc.agents.getMany.queryOptions({
        pageSize:100,
        search : agentSearch
    }))
  return (
   <Command_select
   className='h-9'
   placeholder='agent'
   options={(data?.items ?? []).map((agent)=>(
        {
            id : agent.id,
            value : agent.id,
            children : (
                <div className='flex items-center gap-x-2'>
                    <GenerateAvatar
                    seed={agent.name}
                    variant="botttsNeutral"
                    className='size-4'
                    />
                    {agent.name}
                </div>
            )
        }
   ))}
   value={filters.agentId ?? ""}
   onSelect={(value: string) => setfilters({ ...filters, agentId: value })}
   onSearch={setagentSearch}
   />
  )
}

export default Agent_Id_Filter