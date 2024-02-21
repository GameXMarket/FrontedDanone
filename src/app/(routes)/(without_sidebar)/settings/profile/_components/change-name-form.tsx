"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { ChangeNameDto, changeNameSchema } from "@/requests/settings/schemas";
import { AuthType } from "@/types/AuthType";
import { zodResolver } from "@hookform/resolvers/zod";
import { memo, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const ChangeNameForm = memo(({ user }: { user?: AuthType }) => {
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof changeNameSchema>>({
        resolver: zodResolver(changeNameSchema),
        defaultValues: {
            name: user?.username || "asasas",
            color: "1",
        },
    });

    const onSubmit = (values: ChangeNameDto) => {
        startTransition(() => {
            console.log(values);
        });
    };

    const watchColor = form.watch("color")

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
                                                className={cn(`bg-transparent border-b border-muted-foreground rounded-none px-0 ${watchColor}`)}
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
                                control={form.control}
                                name="color"
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

ChangeNameForm.displayName = "change_name_form"