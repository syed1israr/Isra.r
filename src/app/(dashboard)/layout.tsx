import { SidebarProvider } from '@/components/ui/sidebar'
import DashboardNavbarComponent from '@/modules/dashboard/ui/components/DashboardNavbarComponent'
import DashboardSidebar from '@/modules/dashboard/ui/components/DashboardSidebar'
import React from 'react'

interface props{
    children: React.ReactNode
}
const layout = ({children}:props) => {
  return (
    <div>
        <SidebarProvider>
            <DashboardSidebar/>
            <main className='flex flex-col h-screen w-screen bg-muted'>
             <DashboardNavbarComponent />
            {children}
            </main>
        </SidebarProvider>
    </div>
  )
}

export default layout