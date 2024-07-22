"use client"
import React, { startTransition } from 'react'
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { useForm, useFieldArray, useWatch, Control, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import { useState, useTransition } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { ProductSchema } from '@/schemas';
/* import { DropdownMenu } from '@/components/ui/dropdown-menu'; */
import { addProduct } from '@/actions/add-product';
import { categories, categoryNames, colorNames } from '@/app/types';
import { Textarea } from "@/components/ui/textarea"
import { colors } from '@/app/types';
import { Button } from '@/components/ui/button';
import { FormSuccess } from '@/components/form-success';
import { Label } from '@radix-ui/react-label';

type Props = {}

const AddProduct = (props: Props) => {

  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      sku: "",
      name: "",
      description: "",
      category: categories[0].name,
      color: colorNames[0],
      price: 0,
      image: "https://cdn.dummyjson.com/products/images/furniture/Knoll%20Saarinen%20Executive%20Conference%20Chair/1.png",
      stock: 0,
      sizes: [{
        name: "XS", stock: 0,
      },
      {
        name: "S", stock: 0,
      },
      {
        name: "M", stock: 0,
      },
      {
        name: "L", stock: 0,
      },
      {
        name: "XL", stock: 0,
      },]
    },

  });

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: "sizes", // unique name for your Field Array
  });

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const [isImageActive, setIsImageActive] = useState<boolean>(false);
  const [categorySKU, setCategorySKU] = useState("")
  const [colorSKU, setColorSKU] = useState("")

  const Total = ({ control }: { control: Control<z.infer<typeof ProductSchema>> }) => {
    const formValues = useWatch({
      name: "sizes",
      control
    });
    const total = formValues.reduce(
      (acc, current) => acc + current.stock,
      0
    );
    return <p className='italic'>Total Amount: {total}</p>;
  };
  const onSubmit = (values: z.infer<typeof ProductSchema>) => {

    setError("");
    setSuccess("");
    console.log(values)
    startTransition(() => {
      console.log(values)
      addProduct(values)
        .then((data) => {
          if (data?.error) {
            //form.reset();
            reset();
            setError(data.error);
          }
          alert(data)
        })
        .catch(() => {
          setError("Something went wrong. Please try again later.");
        });
    });
  }
  return (
    <Card className='w-full md:w-fit p-6 max-w-lg'>
      <CardHeader>
        <p className="text-xl font-semibold text-center">Add Product</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid-cols-3 gap-4 items-center justify-between">

            <Input {...register("name")} disabled={isPending} placeholder='Product Name' />
            {errors.description && <p className='text-sm text-red-500'>{errors.name?.message}</p>}
            <br />

            <Textarea className='resize-none h-32' {...register("description")} disabled={isPending} placeholder="Description" />
            {errors.description && <p className='text-sm text-red-500'>{errors.description?.message}</p>}
            <br />

            <Input {...register("image")} disabled={isPending} placeholder="Image" />
            {errors.description && <p className='text-sm text-red-500'>{errors.image?.message}</p>}
            <br />
            <div className='w-full flex justify-between items-center'>

              <Select onValueChange={(value) => setCategorySKU(value)}>
                <SelectTrigger>
                  <SelectValue {...register("category")} placeholder="Select a Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    {categories.map(({ name, sku }) => (
                      <SelectItem disabled={isPending} key={sku} value={sku}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.category && <p className='text-sm'>{errors.category?.message}</p>}

              <Select onValueChange={(value) => setColorSKU(value)}>
                <SelectTrigger>
                  <SelectValue {...register("color")} placeholder="Select a Color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Color</SelectLabel>
                    {colors.map(({ name, sku }) => (
                      <SelectItem disabled={isPending} key={sku} value={sku}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.category && <p>{errors.category?.message}</p>}
            </div>
            <br />
            <div className='grid grid-cols-4 gap-4'>
              <div className='col-span-2'>
                <Input {...register("price")} disabled={isPending} type='number' placeholder='Price $' />
                {errors.price && <p className='text-sm text-red-500'>{errors.price?.message}</p>}
              </div>
              <div className='col-span-2'>
                <Input {...register("stock")} disabled={isPending} type='number' placeholder='Stock' />
                {errors.stock && <p className='text-sm text-red-500'>{errors.stock?.message}</p>}
              </div>
            </div>
          </div>
          <br />
          <div className='w-full grid grid-cols-12 italic'>
            <div className='col-span-2 flex items-center'>  SKU: </div>
            <div className='col-span-1 flex items-center'> {categorySKU ? categorySKU : 'XXX'}</div>
            <div className='col-span-1 text-2xl flex items-center justify-center'>-</div>
            <div className='col-span-1 flex items-center'>{colorSKU ? colorSKU : 'YYY'}</div>
            <div className='col-span-1 text-2xl flex items-center justify-center'>-</div>
            <div className='col-span-6'>
              <Input className='w-16' {...register("sku")} disabled={isPending} type='text' placeholder='SKU' />

            </div>

          </div>
          <div>{errors.sku && <p className='text-sm text-red-500'>{errors.sku?.message}</p>}</div>
          <br />
          <div>
            <Label>STOCKS:</Label>
            <Total control={control} />
          </div>

          <br />
          <br />

          <div className='flex justify-between'>
            {fields.map((field, index) => (
              <div>
                <p className='text-center'>{field.name}</p>
                <Input
                  key={field.name}
                  disabled={isPending}
                  type='number'
                  placeholder='0' // important to include key with field's id
                  {...register(`sizes.${index}.stock` as const, { valueAsNumber: true, required: true })}
                />
              </div>
            ))}
          </div>

          <p>{errors.sizes?.message}</p>
          <br />
          <div>
            <Button className='w-full' type='submit'>SUBMIT</Button>
          </div>
        </form>

      </CardContent>
    </Card>
  )
}

export default AddProduct