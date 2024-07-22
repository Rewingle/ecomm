/* import { db } from "@/lib/db";
import { addProductSchema } from "@/schemas";
import * as z from "zod";
export const getProducts = async () => {
  try {
    const products = await db.product.findMany();

    return products;
  } catch {
    return null;
  }
};

export const addProductService = async (product: z.infer<typeof addProductSchema>) => {
    try{
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

            const createProduct = await db.product.create({
                data: {
                    sku,
                    name,
                    description,
                    category,
                    color,
                    price,
                    image,
                    stock,
                    sizes
                }
            })
            console.log(createProduct)
            //product -> addproduct SERVICE
        return { success: "Product added!" };
    }catch{
        return { error: "Something went wrong. Please try again later." };
    }
} */