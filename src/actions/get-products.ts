"use server"
import * as z from "zod";
import { ProductSchema } from "@/schemas";
//import { addProductService } from "@/services/product";
import { db } from "@/lib/db";

export const getFeaturedProducts = async () => {

    const getProductResult = await db.product.findMany({
        where: {
            AND: [
                { featured: true },
                { isActive: true }
            ]
        }
    });
    return getProductResult;

}
export const getAllProducts = async () => {
    
        const getProductResult = await db.product.findMany({
            where: {
                isActive: true
            }
        });
        return getProductResult;
}