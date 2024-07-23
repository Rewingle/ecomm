"use server"
import * as z from "zod";
import { ProductSchema } from "@/schemas";
//import { addProductService } from "@/services/product";
import { db } from "@/lib/db";

export const getProduct = async (pagination: Number) => {

    const addProductResult = await db.product.findMany();
    console.log(addProductResult);
    //product -> addproduct SERVICE
    return addProductResult;
}