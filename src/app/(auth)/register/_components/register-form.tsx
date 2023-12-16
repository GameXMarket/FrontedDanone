'use client'

import { Button } from "@/components/ui/button";
import { FormInput } from "../../_components/form-input";
import { FormEvent } from "react";

export const RegisterForm = () => {

    const onSubmit = (e: FormEvent) => {
        e.preventDefault()
        console.log("Submit")
    }

    return (
        <div className="w-full flex flex-col items-center">
            <h1 className="text-2xl mb-6">Регистрация</h1>
            <form onSubmit={onSubmit} className="space-y-2 w-full px-2 flex flex-col items-center">
                <FormInput placeholder="Введите имя пользователя" />
                <FormInput placeholder="Электронная почта" />
                <FormInput placeholder="Пароль" />
                <FormInput placeholder="Повторите пароль" />
                <div className="pt-4">
                    <Button type="submit" size="lg" variant="primary">Далее</Button>
                </div>
            </form>
        </div>
    );
};
