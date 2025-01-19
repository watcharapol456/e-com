import db from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";



export async function getUserbyId(id: string) {
    try {
        const user = await db
            .select()
            .from(users)
            .where(eq(users.id, id))
            .execute();


        return user[0];

    } catch (error: any) {
        console.error("Error get by ID:", error);
       
    }
}
