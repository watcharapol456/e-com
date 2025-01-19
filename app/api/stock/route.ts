import db from "@/db";
import { stockInventory } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const { items } = await req.json();

    if (!Array.isArray(items) || items.length === 0) {
      return new Response(JSON.stringify({ error: "Invalid request body" }), {
        status: 400,
      });
    }

    // ตรวจสอบว่ามีสินค้าที่ไม่เพียงพอในคลัง
    for (const item of items) {
      const { productId, quantity } = item;

      const product = await db
        .select()
        .from(stockInventory)
        .where(eq(stockInventory.id, productId))
        .execute();

      if (!product || product.length === 0) {
        return new Response(
          JSON.stringify({ error: `Product with ID ${productId} not found` }),
          { status: 404 }
        );
      }

      const availableStock = product[0].stock;

      if (availableStock < quantity) {
        return new Response(
          JSON.stringify({
            error: `Not enough stock for product ID ${productId}`,
          }),
          { status: 400 }
        );
      }
    }

    // อัปเดตคลังสินค้า
    for (const item of items) {
      const { productId, quantity } = item;

      const product = await db
        .select()
        .from(stockInventory)
        .where(eq(stockInventory.id, productId))
        .execute();

      const availableStock = product[0].stock;

      await db
        .update(stockInventory)
        .set({ stock: availableStock - quantity })
        .where(eq(stockInventory.id, productId))
        .execute();
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Order placed successfully for all items",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing the order:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
