"use server"
import * as z from "zod";
import { ProductSchema, addProductSchema } from "@/schemas";
import { categories, colors } from "@/app/types";
//import { addProductService } from "@/services/product";
import { db } from "@/lib/db";

export const addProduct = async (product: z.infer<typeof addProductSchema>) => {
    //Generate a newProduct with sku and stock from given product<addProductSchema> parameter
    const _stock: number = product.sizes.reduce((acc, size) => acc + size.stock, 0);
    const _sku: string = `${categories.find(category => category.name === product.category)?.sku}-${colors.find(color => color.name === product.color)?.sku}-${product.collection_sku}`;
    const newProduct = {
        sku: _sku,
        name: product.name,
        description: product.description,
        category: product.category,
        color: product.color,
        price: product.price,
        image: product.image,
        stock: _stock,
        sizes: product.sizes,
        isActive: true
    };
    console.log('STOCK' + _stock)
    console.log('SKU' + _sku)
    console.log(newProduct)
    const validatedFields = ProductSchema.safeParse(newProduct);

    console.log('VALIDFIELD: ' + JSON.stringify(validatedFields))

    if (!validatedFields.success) {
        console.log('INVAAA')
        return { error: "Invalid fields!" };
    } else {
        const {
            sku,
            name,
            description,
            category,
            color,
            price,
            image,
            stock,
            sizes,
            isActive } = validatedFields.data;

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
                sizes,
                isActive,
            }
        });
        console.log(addProductResult);
        //product -> addproduct SERVICE
        return { success: "Product added!" };
    }

}