"use client";

import * as z from "zod";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { ChangeEvent, useState, useTransition } from "react";
import { RegisterSchema } from "@/schemas";
import { register } from "@/actions/auth/register";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    form.setValue('password', event.target.value);
  };

  const passwordRequirements = {
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    length: password.length >= 8,
  };

  const requirementsMet = Object.values(passwordRequirements).filter(Boolean).length;
  const totalRequirements = Object.keys(passwordRequirements).length;
  const progress = (requirementsMet / totalRequirements) * 100;

  return (
    <CardWrapper
      headerLabel="Create an Account"
      backButtonLabel="Already have an Account? signin"
      backButtonHref="/auth/login"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="John Doe"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="johnDoe123@gmail.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        disabled={isPending}
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="********"
                        type={showPassword ? "text" : "password"}
                      />
                      <div
                        className="absolute cursor-pointer !right-2 !bottom-2"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
                        <span className="sr-only">Show Password</span>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-2">
              <div className="relative bg-gray-200 h-2 rounded-full">
                <div
                  className="absolute top-0 left-0 h-2 rounded-full"
                  style={{ width: `${progress}%`, backgroundColor: progress === 100 ? 'green' : progress > 50 ? 'yellow' : 'red' }}
                ></div>
              </div>
              <div className="text-sm text-gray-600 mt-1">
                <ul className="list-disc list-inside">
                  <li className={passwordRequirements.hasUppercase ? 'text-green-500' : 'text-red-500'}>
                    {passwordRequirements.hasUppercase ? '✓' : '✗'} Contains uppercase letter
                  </li>
                  <li className={passwordRequirements.hasLowercase ? 'text-green-500' : 'text-red-500'}>
                    {passwordRequirements.hasLowercase ? '✓' : '✗'} Contains lowercase letter
                  </li>
                  <li className={passwordRequirements.hasNumber ? 'text-green-500' : 'text-red-500'}>
                    {passwordRequirements.hasNumber ? '✓' : '✗'} Contains number
                  </li>
                  <li className={passwordRequirements.hasSpecial ? 'text-green-500' : 'text-red-500'}>
                    {passwordRequirements.hasSpecial ? '✓' : '✗'} Contains special character
                  </li>
                  <li className={passwordRequirements.length ? 'text-green-500' : 'text-red-500'}>
                    {passwordRequirements.length ? '✓' : '✗'} At least 8 characters long
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" disabled={isPending} className="w-full">
            Register
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
