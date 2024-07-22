"use server"
import * as z from "zod";
import { ProductSchema } from "@/schemas";
//import { addProductService } from "@/services/product";
import { db } from "@/lib/db";

export const addProduct = async (product: z.infer<typeof ProductSchema>) => {
    const validatedFields = ProductSchema.safeParse(product);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }
    const {
        sku,
        name,
        description,
        category,
        color,
        price,
        image,
        stock,
        sizes } = validatedFields.data;

    const addProductResult = await db.product.create({
        data: {
            sku,
            name,
            description,
            category,
            color,
            price,
            image,
            stock,
        }
    });
    console.log(addProductResult);
    //product -> addproduct SERVICE
    return { success: "Product added!" };
}