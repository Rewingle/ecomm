"use server"
import * as z from "zod";
import { ProductSchema } from "@/schemas";
//import { addProductService } from "@/services/product";
import { db } from "@/lib/db";

const getProduct = async (pagination: Number) => {

    const addProductResult = await db.product.findMany();
    console.log(addProductResult);
    console.log(typeof(addProductResult[0].sizes));
    //product -> addproduct SERVICE
    return addProductResult;
}

export default getProduct;

/* 

Type '
{ id: string; sku: string; name: string; description: string; category: string; color: string; price: number; image: string; stock: number; sizes: JsonValue[]; }[]' 
is not assignable to type 
'{ sku: string; name: string; description: string; category: string; color: string; price: number; image: string; stock: number; sizes: { name: string; stock: number; }[]; }[]'.
  Type '{ id: string; sku: string; name: string; description: string; category: string; color: string; price: number; image: string; stock: number; sizes: JsonValue[]; }' is not assignable to type '{ sku: string; name: string; description: string; category: string; color: string; price: number; image: string; stock: number; sizes: { name: string; stock: number; }[]; }'.
    Types of property 'sizes' are incompatible.
      Type 'JsonValue[]' is not assignable to type '{ name: string; stock: number; }[]'.
        Type 'JsonValue' is not assignable to type '{ name: string; stock: number; }'.
          Type 'null' is not assignable to type '{ name: string; stock: number; }'.
*/

/* 
Type '{ id: string; sku: string; name: string; description: string; category: string; color: string; price: number; image: string; stock: number; sizes: string[]; }[]' is not assignable to type '{ image: string; sku: string; name: string; description: string; category: string; color: string; price: number; stock: number; sizes: { name: string; stock: number; }[]; }[]'.
  Type '{ id: string; sku: string; name: string; description: string; category: string; color: string; price: number; image: string; stock: number; sizes: string[]; }' is not assignable to type '{ image: string; sku: string; name: string; description: string; category: string; color: string; price: number; stock: number; sizes: { name: string; stock: number; }[]; }'.
    Types of property 'sizes' are incompatible.
      Type 'string[]' is not assignable to type '{ name: string; stock: number; }[]'.
 */

/*
Type '{ id: string; sku: string; name: string; description: string; category: string; color: string; price: number; image: string; stock: number; sizes: JsonValue[]; }[]' is not assignable to type '{ name: string; description: string; category: string; color: string; price: number; image: string; sizes: { name: string; stock: string; }[]; stock: number; sku: string; }[]'.
  Type '{ id: string; sku: string; name: string; description: string; category: string; color: string; price: number; image: string; stock: number; sizes: JsonValue[]; }' is not assignable to type '{ name: string; description: string; category: string; color: string; price: number; image: string; sizes: { name: string; stock: string; }[]; stock: number; sku: string; }'.
    Types of property 'sizes' are incompatible.
      Type 'JsonValue[]' is not assignable to type '{ name: string; stock: string; }[]'.
        Type 'JsonValue' is not assignable to type '{ name: string; stock: string; }'.
          Type 'null' is not assignable to type '{ name: string; stock: string; }' 
*/