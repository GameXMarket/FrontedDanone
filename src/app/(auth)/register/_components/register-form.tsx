"use client";

import { useState } from 'react'
import { Button } from "@/components/ui/button";
import { FormInput } from "../../_components/form-input";
import { useFormStatus } from "react-dom";
import { safeRegister } from "@/requests/auth/auth-service";
import { useSafeMutation } from "@/hooks/useSafeMutation";
import styles from './styles/register.module.css'
import toast from "react-hot-toast";
import Link from "next/link";


export const RegisterForm = () => {
    const [isAvailableNick, setIsAvailableNick] = useState<boolean>(true)

    const {pending} = useFormStatus()

    const {mutation, fieldErrors: errors} = useSafeMutation(safeRegister, {
        onError: (error) => {
            toast.error("Something went wrong")
        }
    })

    const onSubmit = (formData: FormData) => {
        const username = formData.get("username") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const repassword = formData.get("repassword") as string;

        mutation.mutate({username, email, password, repassword})
    };

    return (
        <div className="w-full h-full flex flex-col items-center ">
            <div className=" w-full flex">
                <Link href="/register"><h3 className={styles.register}>Регистрация</h3></Link>
                <Link href="/login"><h3 className={styles.login}>Войти</h3></Link>
            </div>

            <form
                action={onSubmit}
                className="space-y-3 w-full px-2 flex flex-col items-center"
            >
                <FormInput
                    disabled={mutation.isPending}
                    errors={errors}
                    id="username"
                    placeholder="Введите имя пользователя"
                />
                {isAvailableNick && (
                <div className='w-full pl-8'>
                    <span className='text-thin text-[16px] text-[#8E2222]'>*Такое имя уже занято</span>
                    <div className='w-full flex justify-between mt-4 items-center'>
                        <p className='text-normal text-[16px]'>Доступно:</p>
                        <span className='px-6 bg-[#24252F] rounded-2xl py-2 cursor-pointer'>Lestty123</span>
                        <span className='px-6 bg-[#24252F] rounded-2xl py-2 cursor-pointer'>Lestty2323</span>
                    </div>
                </div>
                )}
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
                    placeholder="Пароль" />
                <FormInput
                    type="password"
                    disabled={mutation.isPending}
                    errors={errors}
                    id="repassword"
                    placeholder="Повторите пароль"
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
