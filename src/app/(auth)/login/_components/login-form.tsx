"use client";

import { Button } from "@/components/ui/button";
import { FormInput } from "../../_components/form-input";
import { useFormStatus } from "react-dom";
import { useSafeMutation } from "@/hooks/useSafeMutation";
import { safeLogin } from "@/app/Api/auth/auth-service";
import styles from './styles/login.module.css'
import toast from "react-hot-toast";
import Link from "next/link";


export const LoginForm = () => {
    const {pending} = useFormStatus()

    const {mutation, fieldErrors: errors} = useSafeMutation(safeLogin, {
        onError: (error) => {
            toast.error("Something went wrong")
        }
    })

    const onSubmit = (formData: FormData) => {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        mutation.mutate({email, password})
    };

    return (
        <div className="w-full flex flex-col items-center">
            <div className=" w-full flex">
                <Link href="/register"><h3 className={styles.register}>Регистрация</h3></Link>
                <Link href="/login"><h3 className={styles.login}>Войти</h3></Link>
            </div>
            <form
                action={onSubmit}
                className="space-y-3 w-full px-4 flex flex-col items-center"
            >
                <FormInput
                    disabled={mutation.isPending}
                    errors={errors}
                    id="email"
                    placeholder="Имя пользователя"
                />
                <FormInput
                    disabled={mutation.isPending}
                    errors={errors} 
                    id="password" 
                    placeholder="Пароль" 
                />
                <div className="pt-[56px]">
                    <Button disabled={pending || mutation.isPending} className={styles.auth_btn} type="submit" variant="primary">
                        Далее
                    </Button>
                </div>
            </form>
        </div>
    );
};
