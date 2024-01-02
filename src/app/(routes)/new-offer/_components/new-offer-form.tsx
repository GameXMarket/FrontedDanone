"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import styles from "../style.module.css";
import Image from "next/image";
import { FormField } from "@/components/ui/form";
import {
    ControllerRenderProps,
    UseFormReturn,
    useForm,
} from "react-hook-form";
import { safeCreateOffer } from "@/requests/offer/offer-service";
import { CreateOfferDto } from "@/requests/offer/schemas";
import toast from "react-hot-toast";
import { useSafeMutation } from "@/hooks/useSafeMutation";

export const NewOfferForm = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    const [nextPage, setNextPage] = useState(false);

    const form = useForm<CreateOfferDto>({
        defaultValues: {
            name: "",
            description: "",
            price: "" as unknown as number,
            count: "" as unknown as number,
            attachment_id: null,
            category_id: null
        }
    });

    const [name, setName] = useState<string>("");
    const [service, setService] = useState<string>("");
    const [amount, setAmount] = useState<string>("");

    const price = form.watch("price");

    const {mutation, fieldErrors} = useSafeMutation(safeCreateOffer, {
        onSuccess: (data) => {
            if(data.fieldErrors){
                toast.error("Проверьте правильность ввода")
                return
            }
            toast.success("Успешно создано!")
            form.reset({description: ""})
        },
        onError: () => {
            toast.error("Что-то пошло не так!")
        }
    }
    )

    const onSubmit = (data: CreateOfferDto) => {
        const dto = {
            name: data.name,
            description: data.description,
            price: +data.price,
            count: +data.count,
            attachment_id: null,
            category_id: null
        }
        mutation.mutate(dto)
    }

    if (!mounted) return null;

    return (
        <div
            className={cn(
                "w-full h-full flex px-8",
                !nextPage && "ml-[20px] lg:ml-[210px] xl:ml-[340px]",
                nextPage && "ml-[20px] lg:ml-[210px] xl:ml-[300px]"
            )}
        >
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div
                    className={cn(
                        nextPage && "hidden",
                        !nextPage && styles.second_frame
                    )}
                >
                    <div className="flex flex-col items-center gap-y-4 min-w-[440px]">
                        <SelectName
                            form={form}
                            label="Выберите игру"
                            placeholder="Выберите название игры"
                            setName={setName}
                        />
                        {name && (
                            <SelectService
                                form={form}
                                setService={setService}
                                label="Выберите услугу"
                                placeholder="Тип объявления"
                            />
                        )}
                        {name && service && (
                            <SelectAmount
                                form={form}
                                setAmount={setAmount}
                                label="Выберите номинал"
                                placeholder="Выберите количество"
                            />
                        )}
                        {name && service && amount && (
                            <Button
                                type="button"
                                onClick={() => setNextPage(true)}
                                variant="accent"
                                size="lg"
                                className="rounded-xl"
                            >
                                Далее
                            </Button>
                        )}
                    </div>
                </div>
                <div
                    className={cn(
                        "w-[500px] space-y-8",
                        !nextPage && "hidden",
                        nextPage && styles.second_frame
                    )}
                >
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <h2 className="text-3xl font-medium">Основное</h2>
                            <FormField
                                disabled={mutation.isPending}
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        placeholder="Введите заголовок объявления"
                                        label="Заголовок объявления"
                                    />
                                )}
                            />
                            <PriceInput
                                disabled={mutation.isPending}
                                price={price}
                                form={form}
                                label="Цена"
                            />
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-3xl font-medium">Основное</h2>
                            <FormField
                                disabled={mutation.isPending}
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        placeholder="Введите описание товара"
                                    />
                                )}
                            />
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-3xl font-medium">
                                Загрузка фото
                            </h2>
                            <div
                                className={cn(
                                    styles.dash_space,
                                    "h-[130px] flex items-center px-6 relative"
                                )}
                            >
                                <div className="flex items-center justify-between">
                                    <Image
                                        alt="add_photo"
                                        width={32}
                                        height={32}
                                        src="/images/new-offer/gallery-add.svg"
                                    />
                                    <p className="text-muted-foreground text-xl w-5/6">
                                        Перетащите изображения в эту область,
                                        или нажмите внутри неё
                                    </p>
                                </div>
                                <FormField
                                    control={form.control}
                                    name="attachment_id"
                                    render={({ field }) => (
                                        //@ts-ignore
                                        <Input
                                            disabled={mutation.isPending}
                                            {...field}
                                            type="file"
                                            className={cn(
                                                "h-full opacity-0 cursor-pointer absolute top-0 left-0"
                                            )}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center gap-x-4">
                        <Button
                            type="button"
                            variant="accent"
                            size="lg"
                            className="rounded-xl"
                            onClick={() => setNextPage(false)}
                        >
                            Назад
                        </Button>
                        <Button
                            type="submit"
                            variant="accent"
                            size="lg"
                            className="rounded-xl"
                        >
                            Готово
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

interface SelectNameProps {
    label?: string;
    placeholder?: string;
    setName: (name: string) => void;
    form: UseFormReturn<CreateOfferDto, any, undefined>;
}
const SelectName = ({ setName, label, placeholder, form }: SelectNameProps) => {
    const onChange = (
        field: ControllerRenderProps<CreateOfferDto, "category_id">,
        value: string
    ) => {
        setName(value);
        field.onChange(value);
    };

    return (
        <div className="w-full">
            <p className="text-xs text-muted-foreground ml-2 mb-1">
                {label}
                <span className="text-rose-500"> *</span>
            </p>
            <FormField
                control={form.control}
                name="category_id"
                render={({ field }) => (
                    <Select onValueChange={(value) => onChange(field, value)}>
                        <SelectTrigger className="min-w-[300px] px-6">
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent className="text-xl">
                            <SelectItem value="1">Abvilion Online</SelectItem>
                            <SelectItem value="2">Apex Legends</SelectItem>
                            <SelectItem value="3">Arizona Rp</SelectItem>
                            <SelectItem value="4">Black Russia</SelectItem>
                            <SelectItem value="5">Brawl Stars</SelectItem>
                        </SelectContent>
                    </Select>
                )}
            />
        </div>
    );
};

interface SelectServiceProps {
    label?: string;
    placeholder?: string;
    setService: (name: string) => void;
    form: UseFormReturn<CreateOfferDto, any, undefined>;
}
const SelectService = ({
    setService,
    label,
    placeholder,
    form,
}: SelectServiceProps) => {
    const onChange = (
        field: ControllerRenderProps<CreateOfferDto, "category_id">,
        value: string
    ) => {
        setService(value);
        field.onChange(value);
    };

    return (
        <div className="w-full">
            <p className="text-xs text-muted-foreground ml-2 mb-1">
                {label}
                <span className="text-rose-500"> *</span>
            </p>
            <FormField
                control={form.control}
                name="category_id"
                render={({ field }) => (
                    <Select onValueChange={(value) => onChange(field, value)}>
                        <SelectTrigger className="px-6">
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1">Аккаунты</SelectItem>
                            <SelectItem value="2">Бустинг</SelectItem>
                            <SelectItem value="3">Боевой пропуск</SelectItem>
                            <SelectItem value="4">Донат</SelectItem>
                        </SelectContent>
                    </Select>
                )}
            />
        </div>
    );
};

interface SelectAmountProps {
    label?: string;
    placeholder?: string;
    setAmount: (name: string) => void;
    form: UseFormReturn<CreateOfferDto, any, undefined>;
}
const SelectAmount = ({
    setAmount,
    label,
    placeholder,
    form,
}: SelectAmountProps) => {
    const onChange = (
        field: ControllerRenderProps<CreateOfferDto, "count">,
        value: string
    ) => {
        setAmount(value);
        field.onChange(value);
    };
    return (
        <div className="w-full">
            <p className="text-xs text-muted-foreground ml-2 mb-1">
                {label}
                <span className="text-rose-500"> *</span>
            </p>
            <FormField
                control={form.control}
                name="count"
                render={({ field }) => (
                    <Select onValueChange={(value) => onChange(field, value)}>
                        <SelectTrigger className="px-6">
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1">30 гемов</SelectItem>
                            <SelectItem value="2">170 гемов</SelectItem>
                            <SelectItem value="3">2000 гемов</SelectItem>
                        </SelectContent>
                    </Select>
                )}
            />
        </div>
    );
};

const PriceInput = ({
    label,
    price,
    form,
    disabled
}: {
    label: string;
    price: string | number;
    form: UseFormReturn<CreateOfferDto, any, undefined>;
    disabled?: boolean
}) => {
    return (
        <div>
            <p className="text-xs text-muted-foreground ml-2 mb-1 w-10">
                {label}
                <span className="text-rose-500"> *</span>
            </p>
            <div className="flex items-center">
                <div className="flex w-[170px]">
                    <FormField
                        disabled={disabled}
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <Input {...field} className="rounded-r-none" />
                        )}
                    />

                    <div className="flex justify-center items-center rounded-xl rounded-l-none bg-[#272228] w-4/5 text-2xl">
                        <p className="text-gradient">₽</p>
                    </div>
                </div>
                <div className="text-xl ml-6">
                    Цена для покупателя
                    <span className="text-gradient">
                        {+price + Math.ceil((+price / 100) * 12) || 0}
                    </span>
                </div>
            </div>
        </div>
    );
};
