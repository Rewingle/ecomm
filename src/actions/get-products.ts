"use server"
import * as z from "zod";
import { ProductSchema } from "@/schemas";
//import { addProductService } from "@/services/product";
import { db } from "@/lib/db";

const getProduct = async (pagination: Number) => {

    const getProductResult = await db.product.findMany();
    console.log(getProductResult);
    console.log(typeof(getProductResult[0].sizes));
    //product -> addproduct SERVICE
    return getProductResult;
}

export default getProduct;