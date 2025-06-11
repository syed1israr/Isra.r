'use client'
import { Button } from '@/components/ui/button'
import { PlusIcon, XCircleIcon } from 'lucide-react'
import { useState } from 'react'
import { useAgentsFilters } from '../../hooks/Use_Agents_Filters'
import { AGENT_Search_Filters } from './Agents_search_filter'
import { NewAgentDialog } from './newAgentDialog'
import { DEFAULT_PAGE } from '@/constants'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

const ListHeaders = () => {
  const [DialogeisOpen, setDialogeisOpen] = useState(false);
  const [filters, setfilters] = useAgentsFilters();
  const isAnyFilterModified = !!filters.search;

  const onClearFilter = () =>{
    setfilters({
      search:"",
      page:DEFAULT_PAGE 
    })
  }
  return (
    <>
      <NewAgentDialog open={DialogeisOpen} onOpenChange={setDialogeisOpen}/>
       <div className='py-4 px-4 md:px-8 flex flex-col gap-y-4'>
        <div className='flex items-center justify-between'>
            <h5 className='font-medium text-xl'>My Agents</h5>
            <Button onClick={()=>setDialogeisOpen(true)}><PlusIcon />New Agent</Button>
        </div>
        <ScrollArea>
           <div className='flex items-center gap-x-2 p-1'>
          <AGENT_Search_Filters/>
          { isAnyFilterModified && (
            <Button variant={"outline"} size={"sm"} onClick={onClearFilter}>
              <XCircleIcon/>
              clear
            </Button>
          )}
        </div>
        <ScrollBar orientation={"horizontal"}/>
        </ScrollArea>
      </div>

    </>
  )
}

export default ListHeaders