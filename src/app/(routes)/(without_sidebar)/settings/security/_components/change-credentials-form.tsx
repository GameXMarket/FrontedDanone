"use client";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { ChangeEmailDto, ChangePasswordDto, changeEmailSchema, changePasswordSchema } from "@/requests/settings/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SettingsInput } from "../../_components/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useTransition } from "react";
import { useSafeMutation } from "@/hooks/useSafeMutation";
import { userService } from "@/requests/user/user.service";
import toast from "react-hot-toast";
import { passwordDto } from "@/requests/user/schemas";
import { ConfirmModalForNewEmail, ConfirmModalForOldEmail, ConfirmModalForPassword } from "./confirm-modal";

export const ChangeEmailForm = () => {
    const user = useCurrentUser();

    const [newEmail, setNewEmail] = useState('')
    const [oldEmailmodalOpen, setOldEmailModalOpen] = useState(false)
    const [newEmailmodalOpen, setNewEmailModalOpen] = useState(false)
    const {mutation} = useSafeMutation(userService.sendCodeToOldEmail, {
        onSuccess: () => {
            setOldEmailModalOpen(true)
        },
        onError: () => {
            toast("Ошибка")
        }
    })

    const form = useForm<z.infer<typeof changeEmailSchema>>({
        defaultValues: {
            email: "",
        },
    });

    useEffect(() => {
        if(user?.email){
            form.setValue("email", user?.email)
        }
    }, [user])

    const onSubmit = (values: ChangeEmailDto) => {
        setNewEmail(form.getValues("email"))
        mutation.mutate(values);
    };

    return (
        <div className="w-full">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center gap-y-8">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="mobile:w-full">
                                <FormControl>
                                    <SettingsInput
                                        className="min-w-[400px] mobile:min-w-[300px]"
                                        label="Электронная почта"
                                        {...field}
                                        disabled={mutation.isPending}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button disabled={mutation.isPending} variant="accent" type="submit" size="lg" className="rounded-xl">Сменить почту</Button>
                </form>
            </Form>
            <ConfirmModalForOldEmail newEmail={newEmail} setOpen={setOldEmailModalOpen} setOpenNewEmail={setNewEmailModalOpen} open={oldEmailmodalOpen} />
            <ConfirmModalForNewEmail setOpen={setNewEmailModalOpen} open={newEmailmodalOpen} />
        </div>
    );
};

export const ChangePasswordForm = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const {mutation, fieldErrors: errors} = useSafeMutation(userService.sendCodeForPassword, {
        onError: (err: any) => {
            toast.error(err.message)
        },
        onSuccess: () => {
            setModalOpen(true)
        }
    })

    const form = useForm<passwordDto>({
        defaultValues: {
            password: "",
        },
    });

    const onSubmit = (values:passwordDto) => {
        mutation.mutate(values)
    };

    return (
        <div className="w-full">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center gap-y-8">         
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className="mobile:w-full">
                                <FormControl>
                                    <SettingsInput
                                        className="min-w-[400px] mobile:min-w-[300px]"
                                        label="Пароль"
                                        placeholder="Введите новый пароль"
                                        {...field}
                                        disabled={mutation.isPending}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />     
                    <Button type="submit" variant="accent" size="lg" className="rounded-xl">Сменить пароль</Button>
                </form>
            </Form>
            <ConfirmModalForPassword setOpen={setModalOpen} form={form} open={modalOpen} />
        </div>
    );
};