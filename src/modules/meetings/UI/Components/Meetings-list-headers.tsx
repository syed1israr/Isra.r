"use client"

import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import { NewMeetingDialog } from './NewMeetingDialog'
import { useState } from 'react'

const Meeting_List_Headers = () => {
  const [isDialog, setisDialog] = useState(false);

  return (
    <>
      <NewMeetingDialog open={isDialog} onOpenChange={setisDialog}/>
       <div className='py-4 px-4 md:px-8 flex flex-col gap-y-4'>
        <div className='flex items-center justify-between'>
            <h5 className='font-medium text-xl'>My Meetings</h5>
            <Button onClick={()=>setisDialog(true)}><PlusIcon />New Meeting</Button>
        </div>
        <div className='flex items-center gap-x-2 p-1'>
            TODO : Filters
        </div>
      </div>

    </>
  )
}

export default Meeting_List_Headers