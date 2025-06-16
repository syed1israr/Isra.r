
import { auth } from '@/lib/auth';
import { MeetingIdView, MeetingIdViewError, MeetingIdViewLoading } from '@/modules/meetings/UI/Views/Meeting_ID_View';

import { getQueryClient,trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary';



interface props{
  params:Promise<{meetingId : string; }>;
}
const page = async ({params} : props) => {

  const meetingId = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  }) 
  if( !session){
    redirect("/sign-in");
  }
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.meetings.getOne.queryOptions({ id: meetingId.meetingId }));
  
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<MeetingIdViewLoading/>}>
        <ErrorBoundary fallback={<MeetingIdViewError/>}>
        <MeetingIdView meetingId={meetingId.meetingId}/>
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  )
}

export default page

