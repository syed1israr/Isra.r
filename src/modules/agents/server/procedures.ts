import { db } from "@/db";
import { agents } from "@/db/schema";
import { baseProcedure, createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { AgentSchema } from "../schemas";

export const agentsRouter = createTRPCRouter({

  getMany: protectedProcedure.query(async () => {
    const data = await db.select().from(agents);
    return data;
  }),

  create: protectedProcedure
    .input(AgentSchema)
    .mutation(async ({ input, ctx }) => {
      const { name, instructions } = input;

      const [createdAgent] = await db.insert(agents).values({
        ...input,
        userId: ctx.auth.user.id,
      }).returning();

      return createdAgent;
    }),


    getOne: protectedProcedure.input(z.object({ id : z.string()})).query(async ({input}) => {
    const [ExistingAgent] = await db.select().from(agents).where(eq(agents.id, input.id));
    return ExistingAgent;
  }),

});
