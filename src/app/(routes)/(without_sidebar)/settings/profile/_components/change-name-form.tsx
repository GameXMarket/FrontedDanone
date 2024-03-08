"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuthQuery } from "@/hooks/useAuthQuery";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useSafeMutation } from "@/hooks/useSafeMutation";
import { currentUser } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { ChangeNameDto, changeNameSchema } from "@/requests/settings/schemas";
import { userService } from "@/requests/user/user.service";
import { AuthType } from "@/types/AuthType";
import { zodResolver } from "@hookform/resolvers/zod";
import { memo, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

type UsernameType = {
    username: string
}


export const ChangeNameForm = memo(({ user }: { user?: AuthType }) => {
    const {data, error, isLoading} = useAuthQuery({
        queryKey: ['Get main user data'],
        queryFn: () => userService.getUser()
    })


    const [isPending, startTransition] = useTransition();

    const {mutation, fieldErrors: errors} = useSafeMutation(userService.updateUserName, {
        onError: (err: any) => {
            toast.error(err.message)
        }
    })

    const form = useForm<z.infer<typeof changeNameSchema>>({
        resolver: zodResolver(changeNameSchema),
        defaultValues: {
            name: data?.username || "asasas",
        },
    });

    //            color: "1", пока цвета в АПИ НЕТ поэтому без него

    const onSubmit = (values: ChangeNameDto) => {

        const username = values.name
        mutation.mutate({username})

    };  

   // const watchColor = form.watch("color")

    return (
        <div className="w-full">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 flex flex-col items-center"
                >
                    <div className="space-y-6 mobile:w-full mobile:px-4">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Никнейм
                            </p>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                className={cn(`bg-transparent border-b border-muted-foreground rounded-none px-0`)}
                                                {...field}
                                                disabled={isPending}
                                                placeholder="Username"
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground mb-5">
                                Цвет
                            </p>
                            <FormField
                                name="name"
                                control={form.control}
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex space-x-1 w-fit py-2 px-4 bg-bgel rounded-xl"
                                            >
                                                <FormItem className="flex flex-col items-center space-y-1">
                                                    <FormControl className="mt-[5px]">
                                                        <RadioGroupItem
                                                            className="bg-lime-500 w-8 h-8"
                                                            value="text-lime-500"
                                                        />
                                                    </FormControl>
                                                    <div
                                                        className={cn(
                                                            "h-[1px] w-[10px] bg-white opacity-0",
                                                            field.value ===
                                                                "text-lime-500" &&
                                                                "opacity-100"
                                                        )}
                                                    ></div>
                                                </FormItem>
                                                <FormItem className="flex flex-col items-center space-y-1">
                                                    <FormControl className="mt-[5px]">
                                                        <RadioGroupItem
                                                            className="bg-red-500 w-8 h-8"
                                                            value="text-red-500"
                                                        />
                                                    </FormControl>
                                                    <div
                                                        className={cn(
                                                            "h-[1px] w-[10px] bg-white opacity-0",
                                                            field.value ===
                                                                "text-red-500" &&
                                                                "opacity-100"
                                                        )}
                                                    ></div>
                                                </FormItem>
                                                <FormItem className="flex flex-col items-center space-y-1">
                                                    <FormControl className="mt-[5px]">
                                                        <RadioGroupItem
                                                            className="bg-slate-500 w-8 h-8"
                                                            value="text-slate-500"
                                                        />
                                                    </FormControl>
                                                    <div
                                                        className={cn(
                                                            "h-[1px] w-[10px] bg-white opacity-0",
                                                            field.value ===
                                                                "text-slate-500" &&
                                                                "opacity-100"
                                                        )}
                                                    ></div>
                                                </FormItem>
                                                <FormItem className="flex flex-col items-center space-y-1">
                                                    <FormControl className="mt-[5px]">
                                                        <RadioGroupItem
                                                            className="bg-cyan-500 w-8 h-8"
                                                            value="text-cyan-500"
                                                        />
                                                    </FormControl>
                                                    <div
                                                        className={cn(
                                                            "h-[1px] w-[10px] bg-white opacity-0",
                                                            field.value ===
                                                                "text-cyan-500" &&
                                                                "opacity-100"
                                                        )}
                                                    ></div>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <Button
                        variant="accent"
                        size="lg"
                        className="rounded-xl"
                        disabled={isPending}
                        type="submit"
                    >
                        Сохранить
                    </Button>
                </form>
            </Form>
        </div>
    );
});


{/* name="color" */ }
