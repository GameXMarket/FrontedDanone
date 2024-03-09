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
import { cn, convertToBase64 } from "@/lib/utils";
import { useEffect, useState } from "react";
import styles from "../style.module.css";
import Image from "next/image";
import { FormField } from "@/components/ui/form";
import { UseFormReturn, useForm } from "react-hook-form";
import { safeCreateOffer } from "@/requests/offer/offer-service";
import { CreateOfferDto } from "@/requests/offer/schemas";
import toast from "react-hot-toast";
import { useSafeMutation } from "@/hooks/useSafeMutation";
import {
    FetchNextPageOptions,
    InfiniteData,
    InfiniteQueryObserverResult,
    useInfiniteQuery,
    useQueryClient,
} from "@tanstack/react-query";
import { categoryServices } from "@/requests/categories/categories-services";
import { useRouter } from "next/navigation";
import { CategoryType, ValueType } from "@/types/CategoryType";
import { OfferType } from "@/types/OfferType";

export const NewOfferForm = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    const [preview, setPreview] = useState("")

    const { push } = useRouter();

    const [nextPage, setNextPage] = useState(false);

    const form = useForm<CreateOfferDto>({
        defaultValues: {
            name: "",
            description: "",
            price: "" as unknown as number,
            attachment_id: null,
            count: 0,
            category_value_ids: [],
            img: null,
        },
    });

    const [categories, setCategories] = useState<
        { name: string; id: number; next: number }[]
    >([]);

    const price = form.watch("price");

    const { mutation, fieldErrors } = useSafeMutation<{}, OfferType>(
        safeCreateOffer,
        {
            onSuccess: (data) => {
                toast.success("Успешно создано!");
                form.reset({ description: "" });
                push(`offer/settings/${data.data.id}`);
            },
            onError: (error) => {
                toast.error("Что-то пошло не так!");
            },
        }
    );
    const handleUploadedFile = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files![0];
        const base64 = await convertToBase64(file);

        setPreview(base64 as string);
    };

    const onSubmit = (data: CreateOfferDto) => {
        const dto = {
            name: data.name,
            description: data.description,
            price: +data.price,
            count: 1,
            attachment_id: null,
            category_value_ids: categories.map((el) => el.id),
            img: data.img,
        };
        mutation.mutate(dto);
    };
    const {
        data: arr,
        fetchNextPage,
        isFetching,
    } = useInfiniteQuery({
        queryKey: ["choises"],
        queryFn: ({ pageParam }) => categoryServices.getCategoryById(pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (categories.length) {
                return categories[categories.length - 1].next;
            }
        },
        retry: 0,
    });

    const append = (
        val: { name: string; id: number; next: number },
        idx: number
    ) => {
        const newCategories = categories.slice(0, idx);
        newCategories.push(val);
        setCategories(newCategories);
    };

    if (!mounted) return null;

    return (
        <div
            className={cn(
                "w-full h-full flex mobile:justify-center px-8 mobile:px-0",
                styles.wrapper
            )}
        >
            <form
                className="mobile:w-full"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <div
                    className={cn(
                        nextPage && "hidden",
                        !nextPage && styles.second_frame
                    )}
                >
                    <div className="flex flex-col items-center gap-y-4 min-w-[440px] mobile:min-w-full">
                        {arr?.pages.map((el, idx) => (
                            <SelectCategory
                                key={el.id}
                                idx={idx}
                                fetchNextPage={fetchNextPage}
                                data={el.values}
                                label={el.select_name}
                                placeholder={el.select_name}
                                append={append}
                            />
                        ))}
                        {isFetching && <SelectCategory.Skeleton />}
                        {categories.length &&
                        Number.isNaN(categories[categories.length - 1].next) ? (
                            <Button
                                type="button"
                                onClick={() => setNextPage(true)}
                                variant="accent"
                                size="lg"
                                className="rounded-xl"
                            >
                                Далее
                            </Button>
                        ) : null}
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
                            <h2 className="text-3xl font-medium mobile:text-center">
                                Основное
                            </h2>
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
                                form={form as UseFormReturn<CreateOfferDto, any, CreateOfferDto>}
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
                                    name="img"
                                    render={({ field: {onChange}, ...field }) => (
                                        //@ts-ignore
                                        <Input
                                            disabled={mutation.isPending}
                                            {...field}
                                            onChange={(event) => {
                                                const dataTransfer = new DataTransfer();
                                                Array.from(event.target.files!).forEach((image) =>
                                                dataTransfer.items.add(image)
                                                );

                                                const newFiles = dataTransfer.files;
                                                onChange(newFiles);
                                            }}
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

interface SelectCategoryProps {
    idx: number;
    label: string;
    placeholder?: string;
    data: ValueType[] | undefined;
    append: (
        val: { name: string; id: number; next: number },
        idx: number
    ) => void;
    fetchNextPage: (
        options?: FetchNextPageOptions | undefined
    ) => Promise<
        InfiniteQueryObserverResult<InfiniteData<CategoryType, unknown>, Error>
    >;
}
const SelectCategory = ({
    idx,
    append,
    label,
    placeholder,
    data,
    fetchNextPage,
}: SelectCategoryProps) => {
    const queryClient = useQueryClient();

    const onChange = (value: string) => {
        append(
            {
                id: +value.split(",")[0],
                name: label,
                next: +value.split(",")[1],
            },
            idx
        );
        queryClient.setQueryData(
            ["choises"],
            (data: InfiniteData<CategoryType, unknown>) => ({
                pages: data.pages.slice(0, idx + 1),
                pageParams: data.pageParams,
            })
        );
        setTimeout(fetchNextPage, 0);
    };

    return (
        <div className="w-full">
            <p className="text-xs text-muted-foreground ml-2 mb-1">
                {label}
                <span className="text-rose-500"> *</span>
            </p>

            <Select onValueChange={(value) => onChange(value)}>
                <SelectTrigger className="min-w-[300px] px-6 mobile:px-3 mobile:text-lg">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent className="text-xl mobile:text-lg">
                    {data?.map((el) => (
                        <SelectItem
                            key={el.id}
                            value={`${el.id},${el.next_carcass_id}`}
                        >
                            {el.value}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

SelectCategory.Skeleton = function SelectCategorySkeleton() {
    return <div className="animate-pulse">Loading...</div>;
};

const PriceInput = ({
    label,
    price,
    form,
    disabled,
}: {
    label: string;
    price: string | number;
    form: UseFormReturn<CreateOfferDto, any, CreateOfferDto>;
    disabled?: boolean;
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
