'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { AgentSchema } from "../../schemas";
import { AgentGetOne } from "../../types";

import { GenerateAvatar } from "@/components/generator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface props {
  onSuccess?: () => void;
  onCancel?: () => void;
  initalValues?: AgentGetOne;
}

export const AgentsForm = ({ onSuccess, onCancel, initalValues }: props) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof AgentSchema>>({
    resolver: zodResolver(AgentSchema),
    defaultValues: {
      name: initalValues?.name || "",
      instructions: initalValues?.instructions || "",
    },
  });

  const isEdit = !!initalValues?.id;

  const createAgent = useMutation(trpc.agents.create.mutationOptions({
    onSuccess: async () => {
      await queryClient.invalidateQueries(trpc.agents.getMany.queryOptions({}));

      if( initalValues?.id){
        await queryClient.invalidateQueries(trpc.agents.getOne.queryOptions({ id: initalValues.id }));
      }
      onSuccess?.();
    },
    
    onError: (error) => {
      toast.error(error.message || "Failed to create agent");
    },
  }));


   const UpdateAgent = useMutation(trpc.agents.update.mutationOptions({
       onSuccess: async () => {
         await queryClient.invalidateQueries(trpc.agents.getMany.queryOptions({}));
   
         if( initalValues?.id){
           await queryClient.invalidateQueries(trpc.agents.getOne.queryOptions({ id: initalValues.id }));
         }
         onSuccess?.();
       },
       
       onError: (error) => {
         toast.error(error.message || "Failed to update agent");
       },
     }));



  const onSubmit = (values: z.infer<typeof AgentSchema>) => {
    if (isEdit) {
      UpdateAgent.mutate({...values,id : initalValues.id})
    } else {
      createAgent.mutate(values);
    }
  };

  const isPending = createAgent.isPending || UpdateAgent.isPending;

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <GenerateAvatar
          seed={form.watch("name") || "New Agent"}
          variant="botttsNeutral"
          className="border size-16"
        />

        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g. Math tutor" />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />

        <FormField
          name="instructions"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instructions</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="you are a Helpful math assistant that can answer Questions and help with Assignments" />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <div className="flex justify-between gap-x-2">
          { onCancel && (
            <Button 
            variant={"ghost"}
            disabled={isPending}
            type="button"
            onClick={()=>onCancel()}
            > Cancel </Button>
          )}
          <Button disabled={isPending} type="submit">
            { isEdit ? "Update Agent" : "Create Agent" }
          </Button>
        </div>
        {/* <div className="flex gap-2 pt-2">
          <button
            type="submit"
            disabled={isPending}
            className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {isEdit ? "Update Agent" : "Create Agent"}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-200 px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div> */}
      </form>
    </Form>
  );
};
