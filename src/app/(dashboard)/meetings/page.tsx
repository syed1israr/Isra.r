import { Error_state } from '@/components/Error-state';
import { LoadingState } from '@/components/loading-state';
import { auth } from '@/lib/auth';
import Meeting_List_Headers from '@/modules/meetings/UI/Components/Meetings-list-headers';
import MeetingsView from '@/modules/meetings/UI/Views/MeetingsView';
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import type { SearchParams } from 'nuqs/server';
import { LoadSearchParams } from '@/modules/meetings/params';


interface props {
  SearchParams : Promise<SearchParams>;

}
const page = async ({SearchParams} : props) => {
  const queryClient = getQueryClient();
  const params = await LoadSearchParams(SearchParams);
  void queryClient.prefetchQuery(trpc.meetings.getMany.queryOptions({...params}));

  

    const session = await auth.api.getSession({
        headers: await headers(),
      }) 
      if( !session){
        redirect("/sign-in");
      }

  return (  
    <>
      <Meeting_List_Headers/>
      <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<MeetingsViewLoading/>}>
      <ErrorBoundary fallback={<MeetingsViewError/>} >
     <MeetingsView/>
     </ErrorBoundary>
      </Suspense>
      
    </HydrationBoundary>

    </>
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