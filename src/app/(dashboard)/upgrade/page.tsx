

import UpgradeView, { UpgradeViewError, UpgradeViewLoading } from '@/modules/premium/UI/Views/UpgradeView'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
const page = async () => {
  //  const session = await auth.api.getSession({
  //        headers: await headers(),
  //      }) 
  //      if( !!session){
  //        redirect("/");
  //      }
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.premium.getCurrentSubscription.queryOptions())
    void queryClient.prefetchQuery(trpc.premium.getProducts.queryOptions())
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<UpgradeViewLoading/>}>
            <ErrorBoundary fallback={<UpgradeViewError/>}>
                <UpgradeView/>
            </ErrorBoundary>
        </Suspense>
    </HydrationBoundary>
  )
}

export default page