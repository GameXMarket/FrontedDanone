"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FormInput } from "../../_components/form-input";
import { useFormStatus } from "react-dom";
import { AuthApiService, safeRegister } from "@/requests/auth/auth-service";
import { useSafeMutation } from "@/hooks/useSafeMutation";
import styles from "./styles/register.module.css";
import toast from "react-hot-toast";
import Link from "next/link";
import { AuthType } from "@/types/AuthType";

export const RegisterForm = () => {
    const [email, setEmail] = useState("")
    const { pending } = useFormStatus();

    const [success, setSuccess] = useState(false);

    const { mutation, fieldErrors: errors } = useSafeMutation(safeRegister, {
        onError: (error) => {
            //@ts-ignore
            const isArray = Array.isArray(error.response?.data.detail);
            //@ts-ignore
            toast.error(isArray ? error.response?.data.detail[0].msg : error.response?.data.detail || "Something went wrong"
            );
            setSuccess(false);
        },
        onSuccess: (data: AuthType) => {
            setSuccess(true);
            setEmail(data.email)
        },
    });

    const onSubmit = (formData: FormData) => {
        const username = formData.get("username") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const repassword = formData.get("repassword") as string;

        mutation.mutate({ username, email, password, repassword });
    };

    const sendMailAgain = async () => {
        try{
            const response = await AuthApiService.sendMailAgain(email)
            if(response.status === 200){
                toast.success("Письмо отправлено повторно")
            }
            else{
                toast.error("Не получилось отправить письмо повторно")
            }
        }
        catch(err){
            toast.error("Не получилось отправить письмо повторно")
        }
    }

    return (
        <div className="w-full h-full flex flex-col items-center ">
            <div className={styles.title_container}>
                <Link href="/register">
                    <h3 className={styles.register}>Регистрация</h3>
                </Link>
                <Link href="/login">
                    <h3 className={styles.login}>Войти</h3>
                </Link>
            </div>

            <form
                action={onSubmit}
                className="space-y-3 w-full mt-[30px] px-2 flex flex-col items-center"
            >
                <FormInput
                    disabled={mutation.isPending}
                    errors={errors}
                    id="username"
                    placeholder="Введите имя пользователя"
                />
                <FormInput
                    disabled={mutation.isPending}
                    errors={errors}
                    id="email"
                    placeholder="Электронная почта"
                />
                <FormInput
                    type="password"
                    disabled={mutation.isPending}
                    errors={errors}
                    id="password"
                    placeholder="Пароль"
                />
                <FormInput
                    type="password"
                    disabled={mutation.isPending}
                    errors={errors}
                    id="repassword"
                    placeholder="Повторите пароль"
                />
                {success && (
                    <>
                    <div className="mt-6 bg-bgel p-4 rounded-xl">
                        <p className="text-xl text-green-400 text-center">
                            Письмо с подтверждением отправлено на вашу почту
                        </p>
                    </div>
                    <Button type="button" onClick={() => sendMailAgain()} className="w-full text-lg" size="lg" variant="secondary">Отправить письмо еще раз</Button>
                    </>
                )}
                <div className="pt-[56px]">
                    <Button
                        disabled={pending || mutation.isPending}
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
