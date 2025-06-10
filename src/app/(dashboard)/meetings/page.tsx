import { Error_state } from '@/components/Error-state';
import { LoadingState } from '@/components/loading-state';
import MeetingsView from '@/modules/meetings/UI/Views/MeetingsView';
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const page = () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.meetings.getMany.queryOptions({}));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<MeetingsViewLoading/>}>
    <ErrorBoundary fallback={<MeetingsViewError/>} >
     <MeetingsView/>
     </ErrorBoundary>
      </Suspense>
      
    </HydrationBoundary>
  )
}

export default page


export const MeetingsViewLoading = () => {
    return (
        <LoadingState
            title="Loading Meetings"
            description="this my take few seconds"
        />
    )
}
export const MeetingsViewError = () => {
    return (
        <Error_state
            title="Error Loading Meetings"
            description="Something went Wrong"
        />
    )
}