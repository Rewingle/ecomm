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
    //2-5
}
export const getAllProducts = async (pagination: [start: number, end: number]):Promise<actionResponse> => {
    //RETURN ONLY PRODUCTS BETWEEN START(INCLUSIVE) AND END(EXCLUSIVE)
    if (pagination[0] < 0 || pagination[1] < -1 || pagination[1] - pagination[0] < -1) {
        return { success: false, message: 'Invalid pagination' };
    }
    //RETURN ALL PRODUCTS
    if (pagination[0] == 0 && pagination[1] == -1) {
        const getAllProductsResult = await db.product.findMany({
            where: {
                isActive: true
            }
        });
        return { success: true, message: 'Products found', data: getAllProductsResult };
    } else { 
    //RETURN PRODUCTS BETWEEN START AND END
        const getProductResult = await db.product.findMany({
            where: {
                isActive: true
            },
            skip: pagination[0],
            take: pagination[1] - pagination[0]
        });
        return { success: true, message: 'Products found', data: getProductResult };
    }
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
