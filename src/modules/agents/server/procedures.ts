import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, MIN_PAGE_SIZE } from "@/constants";
import { db } from "@/db";
import { agents } from "@/db/schema";
import { createTRPCRouter, premiumProcedure, protectedProcedure } from "@/trpc/init";
import { and, count, desc, eq, getTableColumns, ilike, sql } from "drizzle-orm";
import { z } from "zod";
import { AgentSchema, AgentUpdateSchema } from "../schemas";
import { TRPCError } from "@trpc/server";

export const agentsRouter = createTRPCRouter({

getMany: protectedProcedure
  .input(z.object({
    page: z.number().default(DEFAULT_PAGE),
    pageSize: z.number().min(MIN_PAGE_SIZE).max(MAX_PAGE_SIZE).default(DEFAULT_PAGE_SIZE),
    search: z.string().nullish()
  }))
  .query(async ({ input, ctx }) => {
    const { search, page, pageSize } = input;
    
    const data = await db
      .select({ meetingCount: sql<number>`8`, ...getTableColumns(agents) })
      .from(agents)
      .where(
        and(
          eq(agents.userId , ctx.auth.user.id),
          search ? ilike(agents.name,`%${search}%`) : undefined,
        )
      )
      .orderBy(desc(agents.createdAt),desc(agents.id))
      .limit(pageSize)
      .offset( (page - 1) * pageSize)

      const [total] = await db.select({count : count()}).from(agents).where(and(
          eq(agents.userId , ctx.auth.user.id),
          search ? ilike(agents.name,`%${search}%`) : undefined,
        ))

    
      const total_pages = Math.ceil(Number(total.count) / pageSize);

        return {
        items: data,
        total: Number(total.count),
        total_pages,
      };
  }),


  create: premiumProcedure("agents")
    .input(AgentSchema)
    .mutation(async ({ input, ctx }) => {
      const { name, instructions } = input;

      const [createdAgent] = await db.insert(agents).values({
        ...input,
        userId: ctx.auth.user.id,
      }).returning();

      return createdAgent;
    }),


    getOne: protectedProcedure.
    input(z.object({ id : z.string()}))
    .query(async ({input,ctx}) => {

    const [ExistingAgent] = await db.
    select({meetingCount : sql<number>`8`,...getTableColumns(agents)}).
    from(agents)
    .where(and(
      eq(agents.id, input.id),
      eq(agents.userId, ctx.auth.user.id)
      
    ));
    if( !ExistingAgent ) throw new TRPCError({ code : "NOT_FOUND", message:"Agent Not Found"})

    return ExistingAgent;
  }),


  remove : protectedProcedure
  .input(z.object({id : z.string()}))
  .mutation( async({ctx,input})=>{
    const [ removedAgent ] = await db.delete(agents).where(
      and(
        eq(agents.id,input.id),
        eq(agents.userId,ctx.auth.user.id)
      ),
    ).returning();
    if( !removedAgent ) throw new TRPCError({code :"NOT_FOUND",message:"Agent Not found"});
    return removedAgent;
  }),


  update : protectedProcedure
  .input(AgentUpdateSchema)
  .mutation(async ({ ctx, input }) => {
    const { id, ...updateData } = input;
    const [UpdatedAgent] = await db
      .update(agents)
      .set(updateData)
      .where(
        and(
          eq(agents.id, id),
          eq(agents.userId, ctx.auth.user.id)
        )
      )
      .returning();
    if (!UpdatedAgent) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Agent Not found",
      });
    }
    return UpdatedAgent;
  })


});
