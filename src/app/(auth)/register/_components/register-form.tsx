"use client";

import { Button } from "@/components/ui/button";
import { FormInput } from "../../_components/form-input";
import { useFormStatus } from "react-dom";
import { safeRegister } from "@/requests/auth/auth-service";
import { useSafeMutation } from "@/hooks/useSafeMutation";
import toast from "react-hot-toast";


export const RegisterForm = () => {
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
        <div className="w-full flex flex-col items-center">
            <h1 className="text-3xl mb-14">Регистрация</h1>
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
                <div className="pt-4">
                    <Button disabled={pending || mutation.isPending} type="submit" size="lg" variant="primary">
                        Далее
                    </Button>
                </div>
            </form>
        </div>
    );
};
