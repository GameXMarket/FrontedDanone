"use client";

import styles from "./styles/login.module.css";

import { Button } from "@/components/ui/button";
import { FormInput } from "../../_components/form-input";
import { useFormStatus } from "react-dom";
import { useSafeMutation } from "@/hooks/useSafeMutation";
import { safeLogin } from "@/requests/auth/auth-service";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { loginShema } from "@/requests/auth/schemas";
import { FieldErrors } from "react-hook-form";

export const LoginForm = () => {
    const {push} = useRouter()
    const { pending } = useFormStatus();

    const [errors, setErrors] = useState<{ email?: string[] | undefined; password?: string[] | undefined; }>()
    const [loading, setIsLoading] = useState(false)

    const onSubmit = async (formData: FormData) => {
        setIsLoading(true)
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const validationResult = loginShema.safeParse({email, password})

        if(!validationResult.success){
            setErrors(validationResult.error.flatten().fieldErrors)
            setIsLoading(false)
            return
        }
        setErrors({email: undefined, password: undefined})
        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });
        if(res?.status === 200){
            push("/home")
        }
        else{
            toast.error("Неправильный логин или пароль")
        }
        setIsLoading(false)
    };

    return (
        <div className="w-full flex flex-col items-center">
            <div className=" w-full flex">
                <Link href="/register">
                    <h3 className={styles.register}>Регистрация</h3>
                </Link>
                <Link href="/login">
                    <h3 className={styles.login}>Войти</h3>
                </Link>
            </div>
            <form
                action={onSubmit}
                className="space-y-3 w-full px-4 flex flex-col items-center"
            >
                <FormInput
                    disabled={loading}
                    errors={errors}
                    id="email"
                    placeholder="Имя пользователя"
                />
                <FormInput
                    disabled={loading}
                    errors={errors}
                    id="password"
                    placeholder="Пароль"
                />
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
        </div>
    );
};
