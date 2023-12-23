"use client";

import { Button } from "@/components/ui/button";
import { FormInput } from "../../_components/form-input";
import { useFormStatus } from "react-dom";
import { useSafeMutation } from "@/hooks/useSafeMutation";
import { safeLogin } from "@/requests/auth/auth-service";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


export const LoginForm = () => {
    const {push} = useRouter()
    const {pending} = useFormStatus()

    const {data: session} = useSession()

    const {mutation, fieldErrors: errors} = useSafeMutation(safeLogin, {
        onError: (error) => {
            toast.error("Something went wrong")
        },
    })

    const onSubmit = async (formData: FormData) => {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const res = await signIn("credentials", {redirect: false, email, password})
        if(res?.status === 200){
            push("home")
        }
    };

    return (
        <div className="w-full flex flex-col items-center">
            <h1 className="text-3xl mb-14">Вход</h1>
            {session ? <p className="text-sky-500">Logged in</p> : <p className="text-rose-500">Not Logged in</p>}
            <form
                action={onSubmit}
                className="space-y-3 w-full px-2 flex flex-col items-center"
            >
                <FormInput
                    disabled={mutation.isPending}
                    errors={errors}
                    id="email"
                    placeholder="Введите адрес электронной почты"
                />
                <FormInput
                    disabled={mutation.isPending}
                    errors={errors} 
                    id="password" 
                    placeholder="Пароль" 
                />
                <div className="pt-4">
                    <Button disabled={pending || mutation.isPending} type="submit" size="lg" variant="primary">
                        Далее
                    </Button>
                </div>
            </form>
        </div>
    );
};
