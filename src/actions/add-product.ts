"use server"
import * as z from "zod";
import { addProductSchema } from "@/schemas";
//import { addProductService } from "@/services/product";
import { db } from "@/lib/db";

export const addProduct = async (product: z.infer<typeof addProductSchema>) => {
    const validatedFields = addProductSchema.safeParse(product);

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

    console.log(sku,
        name,
        description,
        category,
        color,
        price,
        image,
        stock,
        sizes);

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