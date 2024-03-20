"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderIcon } from "lucide-react";
import axios from "axios";
import { axiosInstance } from "@/utils";
import { User } from "@/types";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const formData = z.object({
  firstName: z.string().min(3, {
    message: "FirstName must be at least 3 characters.",
  }),
  lastName: z.string().min(3, {
    message: "LastName must be at least 3 characters.",
  }),
  email: z.string().email({
    message: "Email Field is required",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const UserRegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formData>>({
    resolver: zodResolver(formData),
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (userInput: z.infer<typeof formData>) => {
    try {
      setIsLoading(true);

      const { firstName, lastName, email, password } = userInput;
      const userData: User = {
        firstName,
        lastName,
        email,
        password,
      };
      const res = await axiosInstance.post("/auth/register", userData);
      const user = res.data as User;

      // show toast
      toast.success(`${user.firstName}'s account is created successfully`);

      // turn off loading
      setIsLoading(false);

      // redirect user to home page
      router.push("/notes");
    } catch (error: any) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("grid gap-6")}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="gap-1">
            <Label className="sr-only" htmlFor="firstName">
              FirstName
            </Label>
            <Input
              id="firstName"
              placeholder="FirstName"
              type="text"
              disabled={isLoading}
              className="rounded-sm"
              {...register("firstName")}
            />
            {errors?.firstName && (
              <p className="px-1 mt-1 text-xs text-red-600">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div className="gap-1">
            <Label className="sr-only" htmlFor="lastName">
              LastName
            </Label>
            <Input
              id="lastName"
              placeholder="LastName"
              type="text"
              disabled={isLoading}
              className="rounded-sm"
              {...register("lastName")}
            />
            {errors?.lastName && (
              <p className="px-1 mt-1 text-xs text-red-600">
                {errors.lastName.message}
              </p>
            )}
          </div>

          <div className="gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoComplete="email"
              disabled={isLoading}
              className="rounded-sm"
              {...register("email")}
            />
            {errors?.email && (
              <p className="px-1 mt-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              className="rounded-sm"
              disabled={isLoading}
              {...register("password")}
            />
            {errors?.password && (
              <p className="px-1 mt-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />}
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserRegisterForm;
