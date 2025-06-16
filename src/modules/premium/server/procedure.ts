import { db } from "@/db";
import { agents, meetings } from "@/db/schema";
import { PolarClient } from "@/lib/polar"
import { 
    baseProcedure,
    createTRPCRouter,
    protectedProcedure,
} from "@/trpc/init"
import { count, eq } from "drizzle-orm";


export const premiumRouter = createTRPCRouter({
    getCurrentSubscription : protectedProcedure.query(async({ctx})=>{
        const customer =  await PolarClient.customers.getStateExternal({
            externalId : ctx.auth.user.id,
        })
         const subs = customer.activeSubscriptions[0];

        if( !subs ){
            return null;
        }
        const product = await PolarClient.products.get({
            id : subs.productId,
        });

        return product
    }),

    getProducts : protectedProcedure.query(async()=>{
        
        const products = await PolarClient.products.list({
            isArchived : false,
            isRecurring : true,
            sorting : ["price_amount"]
        })

        return products.result.items;
    }),
    getFreeUsage : protectedProcedure
    .query(async({ctx})=>{
        const customer =  await PolarClient.customers.getStateExternal({
            externalId : ctx.auth.user.id,
        })
        const subs = customer.activeSubscriptions[0];

        if( subs ){
            return null;
        }
        const [ userMeeting ] = await db
        .select({
            count : count(meetings.id),
        })
        .from( meetings )
        .where( eq(meetings.userId, ctx.auth.user.id) );

        const [ userAgents ] = await db
        .select({
            count : count(agents.id),
        })
        .from( agents )
        .where( eq(agents.userId, ctx.auth.user.id) );
        
        return {
            meetingCount : userMeeting.count,
            agentCount : userAgents.count,
        }

    })



})