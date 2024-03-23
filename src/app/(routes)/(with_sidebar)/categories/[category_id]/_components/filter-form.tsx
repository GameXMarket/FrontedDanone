'use client'

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

export const FilterForm = () => {

    const {data, isFetching, onCategoryChange, setPriceFilter, priceFilter} = useFilter("offers")

    if(isFetching){
        return <FilterForm.Skeleton />
    }
    return (
        <div className="flex items-center gap-x-3 mobile:gap-x-4 mobile:gap-y-4 mt-4 mobile:grid mobile:grid-cols-10 mobile:grid-rows-2">
            <SearchInput contClassName="mobile:col-span-10" placeholder="Поиск по названию" />
            {data?.pages.map((el) => (
                <Select key={el.id} onValueChange={onCategoryChange}>
                    <SelectTrigger className="h-[48px] mobile:col-span-7 mobile:text-base mobile:px-2 placeholder:text-muted-foreground">
                        <SelectValue className="text-muted-foreground text-sm" placeholder={el?.in_offer_name} />
                    </SelectTrigger>
                    <SelectContent>
                        {el?.values.map((val) => (
                            <SelectItem key={val.id} value={`${val.id}:${val.carcass_id}`}>{val.value}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            ))}
            <div className="mobile:col-start-8 mobile:col-end-11 bg-bgel rounded-lg h-[48px] px-4 flex justify-between min-w-[100px] items-center">
                <p onClick={() => setPriceFilter("none")} className="rounded-lg w-full mobile:px-2 cursor-pointer">Цена</p>
                <PriceIcon priceFilter={priceFilter} setPriceFilter={setPriceFilter} />
            </div>
        </div>
    );
};

FilterForm.Skeleton = function FilterFormSkeleton() {
    return(
        <div className="flex items-center gap-x-3 mobile:gap-x-4 mobile:gap-y-4 mt-4 mobile:grid mobile:grid-cols-10 mobile:grid-rows-2">
            <Skeleton className="w-full h-[48px] mobile:col-span-10" />
            <Skeleton className="w-full h-[48px] mobile:col-span-7" />
            <Skeleton className="w-full h-[48px] mobile:col-start-8 mobile:col-end-11" />
        </div>
    )
}