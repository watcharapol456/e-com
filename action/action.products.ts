"use server";
import { auth } from "@/auth";
import db from "@/db";
import { stockInventory } from "@/db/schema";
import { eq } from "drizzle-orm";

interface DataProduct {
    id: string;
    imgURL?: string;
    labelName: string;
    labelPrice: number;
    properties: string;
    stock:number;
  }
  

export async function addProduct(productInfo:DataProduct) {
    const session = await auth();
    if (!session || !session.user || !session.user.name) {
        throw new Error('User not authenticated');
      }
    try{
        const newProduct = await db.insert(stockInventory).values({
            labelName:productInfo.labelName,
            imgURL:productInfo.imgURL,
            labelPrice:productInfo.labelPrice,
            properties:productInfo.properties,
            stock:productInfo.stock,
            
        }).returning();
        return newProduct[0];
    }catch (error){
        return null;
    }
}


export async function deleteProduct(productId: number) {

    try {
      const deletedPost = await db
        .delete(stockInventory)
        .where(eq(stockInventory.id, productId))
        .returning();
        
      return deletedPost[0];
    } catch (error) {
      throw new Error('Error deleting blog post');
    }
  }