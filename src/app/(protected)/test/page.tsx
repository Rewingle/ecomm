"use client"
import { Select } from '@/components/ui/select'
import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { toast } from "sonner";
import { admin } from "@/actions/admin";
import { CardContent } from '@/components/ui/card';
import { RoleGate } from '@/components/auth/role-gate';
import { FormSuccess } from '@/components/form-success';
import { Button } from '@/components/ui/button';
import { UserRole } from "@prisma/client";

type Inputs = {
  example: string
  exampleRequired: string
}
const onServerActionClick = () => {
  admin().then((data) => {
    if (data.error) {
      toast.error(data.error);
    }

    if (data.success) {
      toast.success(data.success);
    }
  });
};

const onApiRouteClick = () => {
  fetch("/api/admin").then((response) => {
    if (response.ok) {
      toast.success("Allowed API Route!");
    } else {
      toast.error("Forbidden API Route!");
    }
  });
};
type Props = {}

const Test = (props: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  console.log(watch("example")) // watch input value by passing the name of it
  return (
    <>
      <div>Test</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <input defaultValue="test" {...register("example")} />
        {watch("example")}
        {/* include validation with required or other standard HTML validation rules */}
        <input {...register("exampleRequired", { required: true })} />
        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}

        <input type="submit" />
      </form>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="You are allowed to see this content!" />
        </RoleGate>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin-only API Route</p>
          <Button onClick={onApiRouteClick}>Click to test</Button>
        </div>

        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin-only Server Action</p>
          <Button onClick={onServerActionClick}>Click to test</Button>
        </div>
      </CardContent>
    </>
  )
}

export default Test