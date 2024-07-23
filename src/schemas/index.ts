import { UserRole } from "@prisma/client";
import * as z from "zod";
import { categories, colors } from "@/app/types";
export const LoginSchema = z.object({
  email: z.string().email({
    message: "⚠️Email is required",
  }),
  password: z.string().min(1, {
    message: "⚠️Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "⚠️Email is required",
  }),
  password: z.string().min(6, {
    message: "⚠️Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "⚠️Name is required",
  }),
});
const colorNames: [string, ...string[]] = ["", ...colors.map(color => color.name)];
const categoryNames: [string, ...string[]] = ["", ...categories.map(category => category.name)];

export const addProductSchema = z.object({
  collection_sku: z.string().length(3, { message: '⚠️ collection_sku must contain 3 characters' }).toUpperCase(), //XXX-YYY-ZZZ
  name: z.string().min(1, {
    message: "⚠️Name is required",
  }).max(40, { message: "Name can't be longer than 40 characters" })
  ,
  description: z.string().min(1, {
    message: "⚠️Description is required",
  }).max(200, { message: "Description can't be longer than 200 characters" }),


  category: z.enum(categoryNames, {
    errorMap: (issue, ctx) => ({ message: '⚠️Invalid' })
  }),

  color: z.enum(colorNames, {
    errorMap: (issue, ctx) => ({ message: '⚠️Invalid' })
  }),
  price: z.coerce.number().min(1, {
    message: "⚠️Price can't be less than 1",
  }),
  image: z.string().min(1, {
    message: "⚠️Image is required",
  }),
   /* stock: z.coerce.number().min(1, {
    message: "⚠️Stock mus't be at least 1",
  }),  */
  sizes: z.array(z.object({
    name: z.string().or(z.literal("XS")).or(z.literal("S")).or(z.literal("M")).or(z.literal("L")).or(z.literal("XL")).or(z.literal("XXL")),
    stock: z.number().min(0, {
      message: "⚠️Stock is required",
    }),
  }))
});
/* 
VALIDFIELD: 
{"success":false,"error":{"issues":[{"code":"invalid_type","expected":"string","received":"number","path":["sizes",0,"stock"],"message":"Expected string, 
received number"},{"code":"invalid_type","expected":"string","received":"number","path":["sizes",1,"stock"],"message":"Expected string, received number"},
{"code":"invalid_type","expected":"string","received":"number","path":["sizes",2,"stock"],"message":"Expected string, received number"},{"code":"invalid_type",
"expected":"string","received":"number","path":["sizes",3,"stock"],"message":"Expected string, received number"},{"code":"invalid_type","expected":"string",
"received":"number","path":["sizes",4,"stock"],"message":"Expected string, received number"}],"name":"ZodError"}}
INVAAA
*/

export const ProductSchema = z.object({

  sku: z.string().length(11).toUpperCase(), //XXX-YYY-ZZZ
  name: z.string().min(1).max(40),
  description: z.string().min(1).max(200),
  category: z.enum(categoryNames, {
    errorMap: (issue, ctx) => ({ message: '⚠️Invalid' })
  }),
  color: z.enum(colorNames, {
    errorMap: (issue, ctx) => ({ message: '⚠️Invalid' })
  }),
  price: z.coerce.number().min(1),
  image: z.string().min(1),
  stock: z.coerce.number().min(1),
  sizes: z.array(z.object({
    name: z.string().or(z.literal("XS")).or(z.literal("S")).or(z.literal("M")).or(z.literal("L")).or(z.literal("XL")).or(z.literal("XXL")),
    stock: z.number().min(0, {
      message: "⚠️Stock is required",
    }),
  }))
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "⚠️Email is required",
  }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "⚠️Minimum of 6 characters required",
  }),
});

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "⚠️New password is required!",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "⚠️Password is required!",
      path: ["password"],
    }
  );
