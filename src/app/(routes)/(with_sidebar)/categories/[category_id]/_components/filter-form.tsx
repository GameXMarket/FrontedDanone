"use client";

import { SearchInput } from "@/components/SearchInput";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useFilter } from "@/hooks/useFilter";
import PriceIcon from "./price-icon";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { CategoryType } from "@/types/CategoryType";

export const FilterForm = () => {
    const { data, isFetching, onCategoryChange, setPriceFilter, priceFilter } =
        useFilter("offers");

    if (isFetching) {
        return <FilterForm.Skeleton />;
    }
    return (
        <div className="flex items-center gap-x-3 mobile:gap-x-4 mobile:gap-y-4 mt-4 mobile:grid mobile:grid-cols-10 mobile:grid-rows-2">
            <SearchInput
                contClassName="mobile:col-span-10"
                placeholder="Поиск по названию"
            />
            {data?.pages.map((el) => (
                <FilterSelect onCategoryChange={onCategoryChange} el={el} />
            ))}
            <div className="mobile:col-start-8 mobile:col-end-11 bg-bgel rounded-lg h-[48px] px-4 flex justify-between min-w-[100px] items-center">
                <p
                    onClick={() => setPriceFilter("none")}
                    className="rounded-lg w-full mobile:px-2 cursor-pointer"
                >
                    Цена
                </p>
                <PriceIcon
                    priceFilter={priceFilter}
                    setPriceFilter={setPriceFilter}
                />
            </div>
        </div>
    );
};

const FilterSelect = ({
    onCategoryChange,
    el,
}: {
    onCategoryChange: (
        category_id: string,
        carcass_id?: string | undefined
    ) => void;
    el: CategoryType;
}) => {
    const [value, setValue] = useState("");

    const changeValue = (value: string, carcass_id?: string) => {
        setValue(value);
        onCategoryChange(value, carcass_id);
    };
    return (
        <>
            <Select value={value} key={el.id} onValueChange={changeValue}>
                <SelectTrigger className="h-[48px] mobile:col-span-7 mobile:text-base mobile:px-2 placeholder:text-muted-foreground">
                    <SelectValue
                        className="text-muted-foreground text-sm"
                        placeholder={el?.in_offer_name}
                    />
                </SelectTrigger>
                <SelectContent>
                    {el?.values.map((val) => (
                        <SelectItem
                            key={val.id}
                            value={`${val.id}:${val.carcass_id}`}
                        >
                            {val.value}
                        </SelectItem>
                    ))}
                    <div className="w-full flex justify-end">
                        <TooltipProvider>
                            <Tooltip
                                disableHoverableContent
                                delayDuration={200}
                            >
                                <TooltipTrigger>
                                    <Button
                                        onClick={() =>
                                            changeValue("", el.id.toString())
                                        }
                                        className="text-center rounded-full bg-rose-500 w-7 h-7 p-0"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent
                                    side="left"
                                    className="back-gradient border-none"
                                >
                                    <p className="text-white">
                                        Очистить фильтр
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </SelectContent>
            </Select>
        </>
    );
};

FilterForm.Skeleton = function FilterFormSkeleton() {
    return (
        <div className="flex items-center gap-x-3 mobile:gap-x-4 mobile:gap-y-4 mt-4 mobile:grid mobile:grid-cols-10 mobile:grid-rows-2">
            <Skeleton className="w-full h-[48px] mobile:col-span-10" />
            <Skeleton className="w-full h-[48px] mobile:col-span-7" />
            <Skeleton className="w-full h-[48px] mobile:col-start-8 mobile:col-end-11" />
        </div>
    );
};
