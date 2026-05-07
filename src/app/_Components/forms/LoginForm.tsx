"use client"

import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { RiLoginCircleFill } from "react-icons/ri";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react"


const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password is required"),
  keepSignedIn: z.boolean().optional(),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      keepSignedIn: false,
    }
  })

  const onSubmit = async (data: LoginFormData) => {
  setLoading(true)

  try {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    })

    if (res?.error) {
      toast.error("Invalid email or password")
      return
    }

    toast.success("Welcome back!")
    router.push("/")

  } catch {
    toast.error("Something went wrong")
  } finally {
    setLoading(false)
  }
}

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>

      {/* EMAIL */}
      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="py-3">
            <FieldLabel htmlFor={field.name}>Email</FieldLabel>
            <Input
              {...field}
              id={field.name}
              type="email"
              placeholder="ali@example.com"
              autoComplete="off"
              aria-invalid={fieldState.invalid}
              className="h-10 border-b-2 border-white bg-white/20 rounded-t-md px-3"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* PASSWORD */}
      <Controller
        name="password"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="py-3">
            <div className="flex items-center justify-between mb-2">
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <Link href={"forget-password"} className="text-sm text-stone-600 hover:text-stone-700 cursor-pointer font-medium">Forgot Password?</Link>
            </div>
            <Input
              {...field}
              id={field.name}
              type="password"
              placeholder="Enter your password"
              autoComplete="off"
              aria-invalid={fieldState.invalid}
              className="h-10 border-b-2 border-white bg-white/20 rounded-t-md px-3"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* KEEP SIGNED IN */}
      <Controller
        name="keepSignedIn"
        control={form.control}
        render={({ field }) => (
          <Field className="py-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                id="keepSignedIn"
                className="border-gray-400"
              />
              <FieldLabel htmlFor="keepSignedIn">
                Keep me signed in
              </FieldLabel>
            </div>
          </Field>
        )}
      />

      {/* SUBMIT */}
      <Button
        disabled={loading}
        type="submit"
        className="bg-stone-600 h-10 text-white hover:bg-stone-700 mt-3 w-full"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <Spinner className="size-5" /> Please Wait...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <RiLoginCircleFill /> Login
          </span>
        )}
      </Button>

    </form>
  )
}