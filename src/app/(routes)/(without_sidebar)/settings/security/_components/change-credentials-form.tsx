"use client";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { ChangeEmailDto, ChangePasswordDto, changeEmailSchema, changePasswordSchema } from "@/requests/settings/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SettingsInput } from "../../_components/input";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";

export const ChangeEmailForm = () => {
    const user = useCurrentUser();

    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof changeEmailSchema>>({
        resolver: zodResolver(changeEmailSchema),
        defaultValues: {
            email: user?.email || "asasas@gmail.com",
        },
    });

    const onSubmit = (values: ChangeEmailDto) => {
        startTransition(() => {
            console.log(values);
        });
    };

    return (
        <div className="w-full">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center gap-y-8">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="mobile:w-full">
                                <FormControl>
                                    <SettingsInput
                                        className="min-w-[400px] mobile:min-w-[300px]"
                                        label="Электронная почта"
                                        {...field}
                                        disabled={isPending}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button variant="accent" type="submit" size="lg" className="rounded-xl">Сменить почту</Button>
                </form>
            </Form>
        </div>
    );
};

export const ChangePasswordForm = () => {

    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof changePasswordSchema>>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            password: "",
        },
    });

    const onSubmit = (values: ChangePasswordDto) => {
        startTransition(() => {
            console.log(values);
        });
    };

    return (
        <div className="w-full">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center gap-y-8">
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className="mobile:w-full">
                                <FormControl>
                                    <SettingsInput
                                        className="min-w-[400px] mobile:min-w-[300px]"
                                        label="Пароль"
                                        placeholder="Введите новый пароль"
                                        {...field}
                                        disabled={isPending}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" variant="accent" size="lg" className="rounded-xl">Сменить пароль</Button>
                </form>
            </Form>
        </div>
    );
};
