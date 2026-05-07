"use client"

import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { RiUserAddFill } from "react-icons/ri";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { FaCircleExclamation } from "react-icons/fa6";
import axios from "axios";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const registerSchema = z.object({
    name: z.string().min(3 , "Name is too short"),
    email: z.string().email("Invalid email address"),
    password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
    rePassword: z.string(),
    phone: z.string().min(10 , "Invalid phone number"),
    agreeToTerms: z.boolean().refine((val) => val === true , {
        message: "You must accept terms"
    })
}).refine((data) => data.password === data.rePassword, {
    message: "Password do not match",
    path: ["rePassword"],
})

type RegisterFormData = z.infer<typeof registerSchema>

export default function RegisterForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const form = useForm<RegisterFormData>({resolver: zodResolver(registerSchema),
    defaultValues: {
        name:"",
        email:"",
        password:"",
        rePassword:"",
        phone:"",
        agreeToTerms:false,
    }
  })

  const passwordValue = form.watch("password")
  const getPasswordStrength = (password: string) => {
      if (!password) return "empty";
      let score = 0;

        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[#?!@$%^&*-]/.test(password)) score++;

        if (score <= 1) return "weak";
        if (score === 2 || score === 3) return "medium";
        return "strong";
    }
  const passwordStrength = getPasswordStrength(passwordValue || "")

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true)
    try {
        const res = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", data)        
        console.log("success" , res.data);
        toast.success("Account Created Successfully")
        form.reset()
        setTimeout(() => router.push("/login") , 1500)
    } catch (error: any) {
        console.log("Error:" , error.res?.data || error.message);
        toast.error("Error registering user")
        
    } finally {
        setLoading(false)
    }

  }

  return (
    <>
    <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* NAME */}
        <Controller
        name="name"
        control={form.control}
        render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="py-3">
            <FieldLabel htmlFor={field.name}>Name</FieldLabel>
            <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Ali"
                autoComplete="off"
                className="h-10 border-b-2 border-white bg-white/20 rounded-t-md px-3 py-2 text-base transition-colors outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:bg-white/40 focus-visible:border-ring focus-visible:ring-0 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-0 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-0 dark:aria-invalid:ring-0"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
        )}
        />
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
                aria-invalid={fieldState.invalid}
                placeholder="ali@examble.com"
                autoComplete="off"
                type="email"
                className="h-10 border-b-2 border-white bg-white/20 rounded-t-md px-3 py-2 text-base transition-colors outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:bg-white/40 focus-visible:border-ring focus-visible:ring-0 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-0 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-0 dark:aria-invalid:ring-0"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
        )}
        />
        {/* password */}
        <Controller
        name="password"
        control={form.control}
        render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="relative py-3">
            <FieldLabel htmlFor={field.name}>Password</FieldLabel>
            <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Enter your password"
                autoComplete="off"
                type="password"
                className="h-10 border-b-2 border-white bg-white/20 rounded-t-md px-3 py-2 text-base transition-colors outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:bg-white/40 focus-visible:border-ring focus-visible:ring-0 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-0 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-0 dark:aria-invalid:ring-0"
            />
            <HoverCard>
            <HoverCardTrigger className="absolute left-18">
                <FaCircleExclamation />
            </HoverCardTrigger>
            <HoverCardContent>
                Password must be at least 8 characters <br />
                Must include numbers <br />
                Must include special characters <br />
                Must include uppercase letters <br />
            </HoverCardContent>
            </HoverCard>
            <div className="mt-2 h-1 w-full bg-gray-400 rounded">
                <div
                    className={`h-1 rounded transition-all duration-300 ${
                        passwordStrength === "weak"
                        ? "w-1/3 bg-red-500"
                        : passwordStrength === "medium"
                        ? "w-2/3 bg-orange-500"
                        : passwordStrength === "strong"
                        ? "w-full bg-blue-500"
                        : "w-0"
                    }`}
                />
            </div>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
        )}
        />
        {/* rePassword */}
        <Controller
        name="rePassword"
        control={form.control}
        render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="py-3">
            <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
            <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Confirm your password"
                autoComplete="off"
                type="password"
                className="h-10 border-b-2 border-white bg-white/20 rounded-t-md px-3 py-2 text-base transition-colors outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:bg-white/40 focus-visible:border-ring focus-visible:ring-0 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-0 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-0 dark:aria-invalid:ring-0"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
        )}
        />
        {/* phone number */}
        <Controller
        name="phone"
        control={form.control}
        render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="py-3">
            <FieldLabel htmlFor={field.name}>Phone Number</FieldLabel>
            <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="01112223344"
                autoComplete="off"
                className="h-10 border-b-2 border-white bg-white/20 rounded-t-md px-3 py-2 text-base transition-colors outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:bg-white/40 focus-visible:border-ring focus-visible:ring-0 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-0 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-0 dark:aria-invalid:ring-0"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
        )}
        />
        {/* terms */}
        <Controller
        name="agreeToTerms"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="py-2">
            <div className="flex items-center space-x-2">
            <Checkbox checked={field.value} onCheckedChange={field.onChange} id="agreeToTerms" className="border-gray-400"/>
            <FieldLabel htmlFor="agreeToTerms">I agree to terms</FieldLabel>
            </div>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

        {/* submit */}
        <Button disabled={loading} type="submit" className="btn bg-stone-600 h-10 text-white hover:bg-stone-700 cursor-pointer mt-3 disabled:opacity-50 disabled:cursor-not-allowed w-full transition-colors">
            {loading ?
            <span className="flex items-center gap-2"><Spinner className="size-5" /> Please Wait...</span>
            : <span className="flex items-center gap-2"><RiUserAddFill /> Create My Account</span>
            }
        </Button>
    </form>
    </>
  )
}
