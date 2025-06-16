"use client"
import { Error_state } from '@/components/Error-state'
import { LoadingState } from '@/components/loading-state'
import { authClient } from '@/lib/auth-client'
import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query'
import React from 'react'
import { PricingCard } from '../Components/pricing-card'

const UpgradeView = () => {
    const trpc = useTRPC();
    const { data : products } = useSuspenseQuery(
        trpc.premium.getProducts.queryOptions()
    );
    const { data : currentSub } = useSuspenseQuery(
        trpc.premium.getCurrentSubscription.queryOptions()
    );

  return (
    <div className='flex py-4 px-4 gap-y-10 flex-col md:px-8'>
        <div className='mt-4 flex flex-1 flex-col gap-y-10 items-center'>
            <h5 className='font-medium text-2xl md:text-3xl'>
                you are on the {" "}
                <span className='font-semibold text-primary'>
                    { currentSub?.name ?? "Free"}
                </span> {" "}
                plan
            </h5>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                {products.map((mp) => {
                    const isCurrentProduct = currentSub?.id === mp.id;
                    const isPremium = !!currentSub;
                    let buttonText = "Upgrade";
                    let onClick = () => authClient.checkout({ products: [mp.id] });

                    if (isCurrentProduct && isPremium) {
                        buttonText = "Manage";
                        onClick = () => authClient.customer.portal();
                    } else if (!isCurrentProduct && isPremium) {
                        buttonText = "Change plan";
                        onClick = () => authClient.customer.portal();
                    }

                    return (
                        <PricingCard
                            key={mp.id}
                            title={mp.name}
                            buttonText={buttonText}
                            onClick={onClick}
                            variant={
                                mp.metadata.variant === "highlighted" ? "highlighted" : "default"
                            }
                            price={
                                mp.prices[0].amountType === "fixed" ? mp.prices[0].priceAmount / 100 : 0
                            }
                            description={mp.description}
                            priceSuffix={`${mp.prices[0].recurringInterval}`}
                            features={mp.benefits.map(
                                (it) => it.description
                            )}
                            badge={mp.metadata.badge as string | null}
                        />
                    );
                })}
            </div>
        </div>
    </div>
  )
}


export const UpgradeViewLoading = () => {
    return (
        <LoadingState
            title="Loading "
            description="this my take few seconds"
        />
    )
}
export const UpgradeViewError = () => {
    return (
        <Error_state
            title="Error"
            description="Something went Wrong"
        />
    )
}


export default UpgradeView