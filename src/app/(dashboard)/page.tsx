// ✅ correct way
import { auth } from '@/lib/auth'
import { HomeView } from '@/modules/home/ui/view/home-view'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  }) 
  if (!session) {
    redirect("/sign-in")
  }

  return <HomeView/>
}
