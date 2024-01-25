"use client";

import styles from "./styles/login.module.css";

import { Button } from "@/components/ui/button";
import { FormInput } from "../../_components/form-input";
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { loginSchema } from "@/requests/auth/schemas";
import { login } from "@/actions/login";
import { logout } from "@/actions/logout";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";

export const LoginForm = () => {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");

    const { pending } = useFormStatus();

    const [errors, setErrors] = useState<{
        email?: string[] | undefined;
        password?: string[] | undefined;
    }>();
    const [loading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof loginSchema>) => {
        setIsLoading(true);
        const { email, password } = values;
        console.log(values);

        const validationResult = loginSchema.safeParse({ email, password });

        if (!validationResult.success) {
            setErrors(validationResult.error.flatten().fieldErrors);
            setIsLoading(false);
            return;
        }
        setErrors({ email: undefined, password: undefined });
        login(values, callbackUrl).finally(() => setIsLoading(false));
    };

    return (
        <div className="w-full flex flex-col items-center">
            <div className={styles.title_container}>
                <Button
                    onClick={() => {
                        logout();
                    }}
                >
                    Sign Out
                </Button>
                <div className=" w-full flex">
                    <Link href="/register">
                        <h3 className={styles.register}>Регистрация</h3>
                    </Link>
                    <Link href="/login">
                        <h3 className={styles.login}>Войти</h3>
                    </Link>
                </div>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-3 w-full px-4 flex flex-col items-center"
                    >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormInput
                                    {...field}
                                    disabled={loading}
                                    errors={errors}
                                    id="email"
                                    placeholder="Имя пользователя"
                                />
                            )}
                        ></FormField>
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormInput
                                    {...field}
                                    disabled={loading}
                                    errors={errors}
                                    id="password"
                                    placeholder="Пароль"
                                />
                            )}
                        ></FormField>
                        <div className="pt-[56px]">
                            <Button
                                disabled={pending || loading}
                                className={styles.auth_btn}
                                type="submit"
                                variant="primary"
                            >
                                Далее
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};
