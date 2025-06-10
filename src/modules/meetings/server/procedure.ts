import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, MIN_PAGE_SIZE } from "@/constants";
import { db } from "@/db";
import {  agents, meetings } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { and, count, desc, eq, getTableColumns, ilike, sql } from "drizzle-orm";
import { z } from "zod";
import { meetingInsertSchema, meetingUpdateSchema } from "../schemas";

export const meetingsRouter = createTRPCRouter({

  getMany: protectedProcedure
  .input(z.object({
    page: z.number().default(DEFAULT_PAGE),
    pageSize: z.number().min(MIN_PAGE_SIZE).max(MAX_PAGE_SIZE).default(DEFAULT_PAGE_SIZE),
    search: z.string().nullish()
  }))
  .query(async ({ input, ctx }) => {
    const { search, page, pageSize } = input;
    
    const data = await db
      .select({...getTableColumns(meetings),
        agent : agents,
        duration: sql<number>`EXTRACT(EPOCH FROM (${meetings.endedAt} - ${meetings.startedAt}))`.as("duration")
       })
      .from(meetings)
      .innerJoin(agents, eq(meetings.agentId,agents.id))
      .where(
        and(
          eq(meetings.userId , ctx.auth.user.id),
          search ? ilike(meetings.name,`%${search}%`) : undefined,
        )
      )
      .orderBy(desc(meetings.createdAt),desc(meetings.id))
      .limit(pageSize)
      .offset( (page - 1) * pageSize)

      const [total] = await db.select({count : count()}).from(meetings).innerJoin(agents, eq(meetings.agentId,agents.id)).where(and(
          eq(meetings.userId , ctx.auth.user.id),
          search ? ilike(meetings.name,`%${search}%`) : undefined,
        ))

    
      const total_pages = Math.ceil(Number(total.count) / pageSize);

        return {
        items: data,
        total: Number(total.count),
        total_pages,
      };
  }),


  

    getOne: protectedProcedure.
    input(z.object({ id : z.string()}))
    .query(async ({input,ctx}) => {

    const [existingMeeting] = await db.
    select({...getTableColumns(meetings)}).
    from(meetings)
    .where(and(
      eq(meetings.id, input.id),
      eq(meetings.userId, ctx.auth.user.id)
      
    ));
    if( !existingMeeting ) throw new TRPCError({ code : "NOT_FOUND", message:"Meeting Not Found"})

    return existingMeeting;
  }),


    create: protectedProcedure
      .input(meetingInsertSchema)
      .mutation(async ({ input, ctx }) => {
        const [createdMeeting] = await db.insert(meetings).values({
          ...input,
          userId: ctx.auth.user.id,
        }).returning();
        
        return createdMeeting;
      }),


        update : protectedProcedure
        .input(meetingUpdateSchema)
        .mutation(async ({ ctx, input }) => {
          const { id, ...updateData } = input;
          const [UpdatedMeeting] = await db
            .update(meetings)
            .set(updateData)
            .where(
              and(
                eq(meetings.id, id),
                eq(meetings.userId, ctx.auth.user.id)
              )
            )
            .returning();
          if (!UpdatedMeeting) {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "Meeting Not found",
            });
          }
          return UpdatedMeeting;
        })






});
