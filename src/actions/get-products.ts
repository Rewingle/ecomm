"use server"
import * as z from "zod";
import { ProductSchema } from "@/schemas";
//import { addProductService } from "@/services/product";
import { db } from "@/lib/db";

export const getFeaturedProducts = async () => {

    const getFeaturedProductsResult = await db.product.findMany({
        where: {
            AND: [
                { featured: true },
                { isActive: true }
            ]
        }
    });
    return getFeaturedProductsResult;

}
export const getAllProducts = async () => {

    const getProductResult = await db.product.findMany({
        where: {
            isActive: true
        }
    });
    return getProductResult;
}
export const getProduct = async (productId: string) => {
    const getProductResult = await db.product.findUnique({
        where: {
            id: productId
        }
    });
    return getProductResult;
}
