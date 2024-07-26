"use server"
import * as z from "zod";
import { ProductSchema } from "@/schemas"
import mongoose, { isValidObjectId } from 'mongoose'
import { db } from "@/lib/db";
import { actionResponse } from "@/app/types";

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
export const getProduct = async (productId: string): Promise<actionResponse> => {

    if (!mongoose.isValidObjectId(productId)) {
        return { success: false, message: 'Invalid product id' };
    }

    const getProductResult = await db.product.findUnique({
        where: {
            id: productId
        }
    });
    return { success: true, message: 'Product found', data: JSON.parse(JSON.stringify(getProductResult)) };
}
