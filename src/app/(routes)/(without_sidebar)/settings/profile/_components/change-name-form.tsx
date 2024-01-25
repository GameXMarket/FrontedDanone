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
    console.log(user);

    const form = useForm<z.infer<typeof changeNameSchema>>({
        resolver: zodResolver(changeNameSchema),
        defaultValues: {
            name: user?.username || "",
            color: "",
        },
    });

    const onSubmit = (values: ChangeNameDto) => {
        startTransition(() => {
            console.log(values);
        });
    };

    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div>
                        <p className="text-sm text-muted-foreground">Никнейм</p>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            className="bg-transparent border-b border-muted-foreground rounded-none px-0"
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
                        <p className="text-sm text-muted-foreground">Цвет</p>
                        <FormField
                            control={form.control}
                            name="color"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex space-x-1"
                                        >
                                            <FormItem className="flex flex-col items-center space-y-1">
                                                <FormControl>
                                                    <RadioGroupItem
                                                        className="bg-lime-500 w-8 h-8"
                                                        value="1"
                                                    />
                                                </FormControl>
                                                <div
                                                    className={cn(
                                                        "h-[1px] w-[10px] bg-white opacity-0",
                                                        field.value ===
                                                            "1" &&
                                                            "opacity-100"
                                                    )}
                                                ></div>
                                            </FormItem>
                                            <FormItem className="flex flex-col items-center space-y-1">
                                                <FormControl>
                                                    <RadioGroupItem
                                                        className="bg-red-500 w-8 h-8"
                                                        value="2"
                                                    />
                                                </FormControl>
                                                <div
                                                    className={cn(
                                                        "h-[1px] w-[10px] bg-white opacity-0",
                                                        field.value ===
                                                            "2" &&
                                                            "opacity-100"
                                                    )}
                                                ></div>
                                            </FormItem>
                                            <FormItem className="flex flex-col items-center space-y-1">
                                                <FormControl>
                                                    <RadioGroupItem
                                                        className="bg-slate-500 w-8 h-8"
                                                        value="3"
                                                    />
                                                </FormControl>
                                                <div
                                                    className={cn(
                                                        "h-[1px] w-[10px] bg-white opacity-0",
                                                        field.value ===
                                                            "3" &&
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
                    <Button disabled={isPending} type="submit">
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    );
});