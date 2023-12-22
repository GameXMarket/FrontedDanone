"use client";

import { Button } from "@/components/ui/button";
import { FormInput } from "../../_components/form-input";
import { useFormStatus } from "react-dom";
import { useSafeMutation } from "@/hooks/useSafeMutation";
import { safeLogin } from "@/app/Api/auth/auth-service";
import toast from "react-hot-toast";


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
            <h1 className="text-3xl mb-14">Вход</h1>
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
