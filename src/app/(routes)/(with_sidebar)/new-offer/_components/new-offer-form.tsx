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
import { QueryObserverResult, RefetchOptions, useQuery } from "@tanstack/react-query";
import { categoryServices } from "@/requests/categories/categories-services";
import { IGetCat } from "@/requests/categories/categories.interfaces";

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
            amount_id: "" as unknown as number,
            attachment_id: null,
            game_id: "" as unknown as number,
            service_id: "" as unknown as number
        }
    });

    const [name, setName] = useState<string>("a");
    const [service, setService] = useState<string>("a");
    const [amount, setAmount] = useState<string>("a");

    const price = form.watch("price");

    const {mutation} = useSafeMutation(safeCreateOffer, {
        onSuccess: (data) => {
            if(data.fieldErrors){
                console.log(data.fieldErrors)
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
            count: +data.amount_id!,
            attachment_id: null,
            category_id: data.amount_id
        }
        console.log(dto)
        mutation.mutate(dto)
    }

    const {data: games} = useQuery({
        queryKey: ["Games"],
        queryFn: () => categoryServices.getAllCategories()
    })
    const {data: services, refetch: refetchServices} = useQuery({
        queryKey: ["Service"],
        queryFn: async () => {
            const game = form.getValues("game_id")
            if(game){
                return await categoryServices.getCategoryById(game)
            }
            return []
        }
    })
    const {data: offerAmount, refetch: refetchAmount} = useQuery({
        queryKey: ["Amount"],
        queryFn: async () => {
            const service = form.getValues("service_id")
            if(service){
                return await categoryServices.getCategoryById(service)
            }
            return []
        }
    })

    if (!mounted) return null;

    return (
        <div
            className={cn(
                "w-full h-full flex mobile:justify-center px-8 mobile:px-0",
                styles.wrapper
                // !nextPage && "ml-[20px] lg:ml-[210px] xl:ml-[340px]",
                // nextPage && "ml-[20px] lg:ml-[210px] xl:ml-[300px]"
            )}
        >
            <form className="mobile:w-full" onSubmit={form.handleSubmit(onSubmit)}>
                <div
                    className={cn(
                        nextPage && "hidden",
                        !nextPage && styles.second_frame
                    )}
                >
                    <div className="flex flex-col items-center gap-y-4 min-w-[440px] mobile:min-w-full">
                        <SelectName 
                            refetch={refetchServices}
                            data={games}
                            form={form}
                            label="Выберите игру"
                            placeholder="Выберите название игры"
                            setName={setName}
                        />
                        {name && (
                            <SelectService
                                refetch={refetchAmount}
                                data={services}
                                form={form}
                                setService={setService}
                                label="Выберите услугу"
                                placeholder="Тип объявления"
                            />
                        )}
                        {name && service && (
                            <SelectAmount
                                data={offerAmount}
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
                        "w-[500px] mobile:w-full space-y-8",
                        !nextPage && "hidden",
                        nextPage && styles.second_frame
                    )}
                >
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <h2 className="text-3xl font-medium mobile:text-center">Основное</h2>
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
                            <h2 className="text-3xl font-medium">Описание</h2>
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
                            <h2 className="text-3xl font-medium mobile:text-center">
                                Загрузка фото
                            </h2>
                            <div
                                className={cn(
                                    styles.dash_space,
                                    "h-[130px] mobile:h-auto flex mobile:justify-center items-center px-6 mobile:p-0 relative"
                                )}
                            >
                                <div className="flex mobile:block mobile:w-fit items-center justify-between mobile:p-3 mobile:bg-bgel mobile:rounded-xl">
                                    <Image
                                        alt="add_photo"
                                        width={32}
                                        height={32}
                                        src="/images/new-offer/gallery-add.svg"
                                    />
                                    <p className="text-muted-foreground text-xl w-5/6 mobile:hidden">
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
                                                "h-full opacity-0 cursor-pointer absolute top-0 left-0 mobile:top-1/2 mobile:left-1/2 mobile:-translate-x-1/2 mobile:-translate-y-1/2 mobile:p-0 mobile:w-[40px] mobile:h-[40px]"
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
                            Далее
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
    data: IGetCat[] | undefined;
    refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<any, Error>>
}
const SelectName = ({ setName, label, placeholder, form, data, refetch }: SelectNameProps) => {
    const onChange = (
        field: ControllerRenderProps<CreateOfferDto, "game_id">,
        value: string
    ) => {
        setName(value);
        field.onChange(value);
        refetch()
    };

    return (
        <div className="w-full">
            <p className="text-xs text-muted-foreground ml-2 mb-1">
                {label}
                <span className="text-rose-500"> *</span>
            </p>
            <FormField
                control={form.control}
                name="game_id"
                render={({ field }) => (
                    <Select onValueChange={(value) => onChange(field, value)}>
                        <SelectTrigger className="min-w-[300px] px-6 mobile:px-3 mobile:text-lg">
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent className="text-xl mobile:text-lg">
                            {data?.map((el) => <SelectItem key={el.id} value={el.id.toString()}>{el.name}</SelectItem>)}
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
    data: IGetCat;
    refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<any, Error>>
}
const SelectService = ({
    setService,
    label,
    placeholder,
    form,
    data,
    refetch
}: SelectServiceProps) => {
    const onChange = (
        field: ControllerRenderProps<CreateOfferDto, "service_id">,
        value: string
    ) => {
        setService(value);
        field.onChange(value);
        refetch()
    };

    return (
        <div className="w-full">
            <p className="text-xs text-muted-foreground ml-2 mb-1">
                {label}
                <span className="text-rose-500"> *</span>
            </p>
            <FormField
                control={form.control}
                name="service_id"
                render={({ field }) => (
                    <Select onValueChange={(value) => onChange(field, value)}>
                        <SelectTrigger className="px-6 mobile:px-3 mobile:text-lg">
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent className="mobile:text-lg">
                            {data?.childrens?.map((el) => <SelectItem key={el.id} value={el.id.toString()}>{el.name}</SelectItem>)}
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
    data: IGetCat
}
const SelectAmount = ({
    setAmount,
    label,
    placeholder,
    form,
    data
}: SelectAmountProps) => {
    const onChange = (
        field: ControllerRenderProps<CreateOfferDto, "amount_id">,
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
                name="amount_id"
                render={({ field }) => (
                    <Select onValueChange={(value) => onChange(field, value)}>
                        <SelectTrigger className="px-6 mobile:px-3 mobile:text-lg">
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent className="mobile:text-lg">
                            {data?.childrens?.map((el) => <SelectItem key={el.id} value={el.id.toString()}>{el.name}</SelectItem>)}
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
            <div className="flex items-center mobile:flex-col mobile:items-start mobile:gap-y-4">
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
                <div className="text-xl ml-6 mobile:ml-0 flex items-center gap-x-2">
                    <span>Цена для покупателя</span>
                    <span className="text-gradient">
                        {+price + Math.ceil((+price / 100) * 12) || 0} ₽
                    </span>
                </div>
            </div>
        </div>
    );
};
