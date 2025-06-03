import { auth } from '@/lib/auth'
import { HomeView } from '@/modules/home/ui/view/home-view'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import React from 'react'

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  }) 
  if( !session){
    redirect("/sign-in");
  }
  return <HomeView/>
}

export default page