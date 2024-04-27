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
import { useEffect, useRef, useState } from "react";
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
import { CircleUserRoundIcon, CrossIcon, PlusIcon, ScanFaceIcon, XCircleIcon } from "lucide-react";

export const NewOfferForm = () => {
    const fileRef = useRef<HTMLInputElement>(null)
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    const [preview, setPreview] = useState<Array<string>>([])

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
            img: [],
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
                form.reset();
                setPreview([])
                push(`offer/settings/${data.id}`);
            },
            onError: (error) => {
                toast.error("Что-то пошло не так!");
            },
        }
    );
    const handleUploadedFile = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const files = event.target.files;
        const prev = form.getValues("img") || []
        const joined = Array.from(prev).concat(Array.from(files!));
        console.log(joined)
        form.setValue("img", joined)
        const previews = []
        for(let i = 0; i <= joined?.length!-1; i++){
            const file = await convertToBase64(joined![i] as unknown as Blob)
            previews.push(file as string)
        }
        setPreview(previews)
    };

    const handleDeleteFile = async (idx: number) => {
        const files = form.getValues("img")
        const newFiles = files.filter((_, index) => index !== idx)
        const previews = []
        for(let i = 0; i <= newFiles?.length!-1; i++){
            const file = await convertToBase64(newFiles![i] as unknown as Blob)
            previews.push(file as string)
        }
        setPreview(previews)
        form.setValue("img", newFiles)
    }

    const handleFaceFile = async (idx: number) => {
        const files = form.getValues("img")
        const faceFile = files.splice(idx, 1);
        files.push(...faceFile)
        console.log(files)
        const previews = []
        for(let i = 0; i <= files?.length!-1; i++){
            const file = await convertToBase64(files![i] as unknown as Blob)
            previews.push(file as string)
        }
        setPreview(previews)
        form.setValue("img", files)
    }

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
        getNextPageParam: (pages) => {
            if(pages.is_last) return
            if (categories.length) {
                return categories[categories.length - 1].next;
            }
        },
        retry: 0,
        refetchOnWindowFocus: false,
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
                                //@ts-ignore
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
                            <div className="flex items-center justify-between">
                                <h2 className="text-3xl font-medium mobile:text-center">
                                    Загрузка фото
                                </h2>
                                {!!preview.length && <Button onClick={() => fileRef.current?.click()} type="button" size="sm" variant="accent"><PlusIcon /></Button>}
                            </div>
                            <div
                                className={cn(
                                    styles.dash_space,
                                    "mobile:h-auto flex mobile:justify-center items-center px-6 mobile:p-0 relative",
                                    !preview.length && "h-[130px]",
                                    preview.length && "px-0"
                                )}
                            >
                                <div className="w-full h-full flex flex-wrap mobile:block mobile:w-fit items-center justify-center gap-x-2 mobile:p-3 mobile:bg-bgel mobile:rounded-xl">
                                    {preview.map((previewElement, idx) => (
                                        <div key={idx} className="relative z-50 group">
                                            <Image
                                                // className="w-full"
                                                alt="add_photo"
                                                width={100}
                                                height={100}
                                                src={previewElement}
                                            />
                                            <XCircleIcon onClick={() => handleDeleteFile(idx)} className="fill-rose-500 w-5 h-5 absolute top-0 right-0 cursor-pointer" />
                                            <CircleUserRoundIcon onClick={() => handleFaceFile(idx)} className={cn("stroke-muted-foreground opacity-0 group-hover:opacity-100 transition w-5 h-5 absolute top-0 left-0 cursor-pointer", preview.length-1 === idx && "stroke-blue-400")} />
                                        </div>
                                    ))}
                                    {!preview.length && 
                                    <>
                                        <Image
                                                alt="add_photo"
                                                width={32}
                                                height={32}
                                                src={"/images/new-offer/gallery-add.svg"}
                                            />
                                        <p className="text-muted-foreground text-xl w-5/6 mobile:hidden">
                                            Перетащите изображения в эту область,
                                            или нажмите внутри неё
                                        </p>
                                    </>
                                    }
                                </div>
                                <FormField
                                    control={form.control}
                                    name="img"
                                    render={({ field: {onChange}, ...field }) => (
                                        //@ts-ignore
                                        <Input
                                            key={preview.length}
                                            ref={fileRef}
                                            disabled={mutation.isPending}
                                            {...field}
                                            onChange={(event) => {
                                                const dataTransfer = new DataTransfer();
                                                Array.from(event.target.files!).forEach((image) =>
                                                dataTransfer.items.add(image)
                                                );

                                                const newFiles = dataTransfer.files;
                                                if(newFiles.length > 0){
                                                    // onChange(newFiles);
                                                    handleUploadedFile(event)
                                                }
                                            }}
                                            type="file"
                                            multiple
                                            className={cn(
                                                "h-full opacity-0 cursor-pointer absolute top-0 left-0 mobile:top-1/2 mobile:left-1/2 mobile:-translate-x-1/2 mobile:-translate-y-1/2 mobile:p-0 mobile:w-[40px] mobile:h-[40px]"
                                            )}
                                            accept=".png, .jpg, .jpeg"
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
                            disabled={mutation.isPending}
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
    form,
    disabled,
}: {
    label: string;
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
                
                    <FormField
                        disabled={disabled}
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <>
                            <div className="flex w-[170px]">
                                <Input {...field} className="rounded-r-none" />
                                <div className="flex justify-center items-center rounded-xl rounded-l-none bg-[#272228] w-4/5 text-2xl">
                                    <p className="text-gradient">₽</p>
                                </div>
                            </div>
                            <div className="text-xl ml-6 mobile:ml-0 flex items-center gap-x-2">
                                <span>Цена для покупателя</span>
                                <span className="text-gradient">
                                    { +field.value + Math.ceil((+field.value / 100) * 12) || 0} ₽
                                </span>
                            </div>
                            </>
                        )}
                    />

                    
                
            </div>
        </div>
    );
};
