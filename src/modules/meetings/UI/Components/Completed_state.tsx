import { GenerateAvatar } from '@/components/generator'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { formatDuration } from '@/lib/utils'
import { Scrollbar } from '@radix-ui/react-scroll-area'
import { format } from 'date-fns'
import { BookOpenTextIcon, ClockFadingIcon, FileTextIcon, FileVideoIcon, SparkleIcon } from 'lucide-react'
import Link from 'next/link'
import { MeetingGetOne } from '../../types'
import  Markdown  from "react-markdown"

interface props{
    data : MeetingGetOne
}
export const Completed_state = ({ data } : props) => {
  return (
    <div className='flex flex-col gap-y-4'>
        <Tabs defaultValue='summary'>
            <div className="bg-white rounded-lg border px-3">
                <ScrollArea>
                    <TabsList className='p-0 bg-background justify-start rounded-none h-13'>
                        <TabsTrigger 
                        value='summary'
                        className='text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none
                        border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground'
                        >
                            <BookOpenTextIcon/>
                            summary
                        </TabsTrigger>
                        <TabsTrigger 
                        value='Transcript'
                        className='text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none
                        border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground'
                        >
                            <FileTextIcon/>
                            Transcript
                        </TabsTrigger>
                        <TabsTrigger 
                        value='Recording'
                        className='text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none
                        border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground'
                        >
                            <FileVideoIcon/>
                            Recording
                        </TabsTrigger>
                        <TabsTrigger 
                        value='chat'
                        className='text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none
                        border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground'
                        >
                            <SparkleIcon/>
                            Ask AI
                        </TabsTrigger>
                    </TabsList>
                    <Scrollbar orientation='horizontal'/>
                </ScrollArea>
            </div>
            <TabsContent value='Recording'>
                <div className='bg-white rounded-lg border px-4 py-5'>
                    <video
                    src={data.recordingUrl!}
                    className='w-full rounded-lg'
                    controls
                    />
                </div>
            </TabsContent>
            <TabsContent value='summary'>
                <div className='bg-white rounded-lg border'>
                    <div className='px-4 py-5 gap-y-5 flex flex-col col-span-5'>
                        <h2 className='text-2xl font-medium capitalize'>{ data.name }</h2>
                        <div className='flex gap-x-2 items-center'>
                            <Link
                            href={`/agents/${data.agentId}`}
                            className='flex items-center gap-x-2 underline underline-offset-4 capitalize'
                            >
                                <GenerateAvatar
                                variant="botttsNeutral"
                                seed={data.agent.name}
                                className='size-6'
                                />
                                { data.agent.name }
                            </Link> {" "}
                            <p>{ data.startedAt ? format(data.startedAt, "PPP") : " "}</p>
                        </div>
                        <div className='flex gap-x-2 items-center'>
                            <SparkleIcon className='size-4'/>
                            <p>General Summary</p>
                        </div>
                        <Badge
                        variant={"outline"}
                        className='flex items-center gap-x-2 [&svg]:size-4'
                        >
                            <ClockFadingIcon className='text-blue-700'/>
                            { data.duration ?  formatDuration(data.duration ) : "No Duration"}
                        </Badge>
                        <div>
                            <Markdown
                            components={{
                                h1 : ( props ) => (
                                    <h1 className='text-2xl font-medium mb-6' {...props}/>
                                ),
                                h2 : ( props ) => (
                                    <h2 className='text-xl font-medium mb-6' {...props}/>
                                ),
                                h3 : ( props ) => (
                                    <h3 className='text-lg font-medium mb-6' {...props}/>
                                ),
                                h4 : ( props ) => (
                                    <h4 className='text-base font-medium mb-6' {...props}/>
                                ),
                                p : ( props ) => (
                                    <p className='leading-relaxed mb-6' {...props}/>
                                ),
                                ul : ( props ) => (
                                    <ul className='list-disc list-inside mb-6' {...props}/>
                                ),
                                ol : ( props ) => (
                                    <ul className='list-decimal list-inside mb-6' {...props}/>
                                ),
                                li : ( props ) => (
                                    <li className='mb-1' {...props}/>
                                ),
                                strong : ( props ) => (
                                    <strong className='font-semibold' {...props}/>
                                ),
                                code : ( props ) => (
                                    <strong className='bg-gray-100 px-1 py-0.5 rounded' {...props}/>
                                ),
                                blockquote : ( props ) => (
                                    <blockquote className='border-l-4 pl-4 italic my-4' {...props}/>
                                ),
                            
                                
                            }}
                            >
                                { data.summary ? data.summary : "Unable to Generate Summary" }
                            </Markdown>
                        </div>
                    </div>
                </div>
            </TabsContent>
        </Tabs>
    </div>
  )
}

 