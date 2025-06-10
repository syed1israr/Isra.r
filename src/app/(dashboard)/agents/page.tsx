import { LoadingState } from '@/components/loading-state';
import { auth } from '@/lib/auth';
import { LoadSearchParams } from '@/modules/agents/params';
import ListHeaders from '@/modules/agents/UI/Components/ListHeaders';
import { AgentsView } from '@/modules/agents/UI/Views/agents-view';
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { SearchParams } from 'nuqs';
import { Suspense } from 'react';


interface props{
  searchParams : Promise<SearchParams>;

}
const page = async({searchParams}:props) => {

  const filters  = await LoadSearchParams(searchParams);
   const session = await auth.api.getSession({
      headers: await headers(),
    }) 
    if( !session){
      redirect("/sign-in");
    }


    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(
      trpc.agents.getMany.queryOptions({...filters}),
    );
    
  return (
    <>
      <ListHeaders/>
      <HydrationBoundary state = {dehydrate(queryClient)}>
      <Suspense fallback={<LoadingState title='Loading Agents' description='This may take some time'/>}>
      <AgentsView/>
      </Suspense>
    </HydrationBoundary>
  
    </>
    
  )
}

export default page