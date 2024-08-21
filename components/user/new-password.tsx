"use client";

import { changePassword } from "@/actions/user/change-password";
import {
    Card,
    CardContent,
    CardHeader
} from "@/components/ui/card";
import { ChangePasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Form, FormField } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RiLockPasswordLine } from "react-icons/ri";
import { CustomInput } from "@/components/custom-input";

export const NewPasswordForm = () => {
    const [isPending, startTransition] = useTransition();
    const [newPassword, setNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState<{ [key: string]: boolean }>({
        "oldPassword": false,
        "newPassword": false,
        "confirmPassword": false,
    });
    const [open, setOpen] = useState(false);

    const form = useForm<z.infer<typeof ChangePasswordSchema>>({
        resolver: zodResolver(ChangePasswordSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        }
    });

    const onSubmit = (values: z.infer<typeof ChangePasswordSchema>) => {
        startTransition(() => {
            changePassword(values)
                .then((data) => {
                    if (data?.error) {
                        toast.error(data?.error);
                    }
                    if (data?.success) {
                        toast.success(data?.success);
                        form.reset();
                        setNewPassword("");
                        setOpen(false);
                        setShowPassword({ "oldPassword": false, "newPassword": false, "confirmPassword": false });
                    }
                })
                .catch(() => { toast.error("Unknown error While Upadting Profile") })
        })
    }

    const handleShowPassword = (key: string) => {
        setShowPassword((prev) => ({ ...prev, [key]: !prev[key] }))
    }

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setOpen(true);
        setNewPassword(event.target.value);
        form.setValue('newPassword', event.target.value);
    };

    const passwordRequirements = {
        hasUppercase: /[A-Z]/.test(newPassword),
        hasLowercase: /[a-z]/.test(newPassword),
        hasNumber: /[0-9]/.test(newPassword),
        hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
        length: newPassword.length >= 8,
    };

    const requirementsMet = Object.values(passwordRequirements).filter(Boolean).length;
    const totalRequirements = Object.keys(passwordRequirements).length;
    const progress = (requirementsMet / totalRequirements) * 100;

    return (
        <Card className="w-full mx-4 500px:w-[450px]">
            <CardHeader>
                <h2 className="text-2xl font-semibold text-center">Profile</h2>
            </CardHeader>
            <CardContent className="space-y-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="oldPassword"
                                render={({ field }) => (
                                    <CustomInput
                                        label="Old Password"
                                        name="oldPassword"
                                        isPending={isPending}
                                        placeholder="********"
                                        field={field}
                                        value={field.value}
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                        showPassword={showPassword}
                                        handleShowPassword={handleShowPassword}
                                        type="password"
                                        Icon={RiLockPasswordLine}
                                    />
                                )}
                            />
                        </div>
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="newPassword"
                                render={({ field }) => (
                                    <CustomInput
                                        label="New Password"
                                        type="password"
                                        name="newPassword"
                                        placeholder="********"
                                        value={newPassword}
                                        handleChange={handlePasswordChange}
                                        onBlur={field.onBlur}
                                        field={field}
                                        Icon={RiLockPasswordLine}
                                        showPassword={showPassword}
                                        handleShowPassword={handleShowPassword}
                                        isPending={isPending}
                                    />
                                )}
                            />
                        </div>
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <CustomInput
                                        label="Confirm Password"
                                        name="confirmPassword"
                                        placeholder="********"
                                        isPending={isPending}
                                        field={field}
                                        value={field.value}
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                        showPassword={showPassword}
                                        handleShowPassword={handleShowPassword}
                                        type="password"
                                        Icon={RiLockPasswordLine}
                                    />
                                )}
                            />
                        </div>
                        {open && <div className="mt-2">
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
                        </div>}
                        <Button
                            type="submit"
                            disabled={isPending}
                            className={cn(`w-full`, isPending && "cursor-not-allowed")}
                        >
                            Update
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}