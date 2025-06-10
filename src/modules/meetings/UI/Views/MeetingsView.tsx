"use client"

import { Generic_Data_table } from '@/components/Generic_Data_table';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { columns } from '../Components/Columns';
import { Empty_state } from '@/components/Empty_state';

const MeetingsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));

  return (
    <div className='flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4'>
      <Generic_Data_table
        data={data?.items || []}
        columns={columns}
      />

      {data?.items?.length === 0 && (
        <Empty_state
          title="Create your First Meeting"
          description="Schedule a meeting to connect with others. Each meeting lets you collaborate, share ideas, and interact with participants in real time."
        />
      )}
    </div>
  );
}

export default MeetingsView;
