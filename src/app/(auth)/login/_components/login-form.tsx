"use client";

import { Button } from "@/components/ui/button";
import { FormInput } from "../../_components/form-input";
import { useFormStatus } from "react-dom";


export const LoginForm = () => {
    const {pending} = useFormStatus()

    const onSubmit = (formData: FormData) => {
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;

        console.log({username, password})
    };

    return (
        <div className="w-full flex flex-col items-center">
            <h1 className="text-3xl mb-14">Вход</h1>
            <form
                action={onSubmit}
                className="space-y-3 w-full px-2 flex flex-col items-center"
            >
                <FormInput
                    // errors={errors}
                    id="username"
                    placeholder="Введите имя пользователя"
                />
                <FormInput 
                    // errors={errors} 
                    id="password" 
                    placeholder="Пароль" 
                />
                <div className="pt-4">
                    <Button disabled={pending} type="submit" size="lg" variant="primary">
                        Далее
                    </Button>
                </div>
            </form>
        </div>
    );
};
