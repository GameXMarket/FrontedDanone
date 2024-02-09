import { SearchInput } from "@/components/SearchInput";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

export const FilterForm = () => {
    return (
        <div className="flex items-center gap-x-3 mobile:gap-x-4 mobile:gap-y-4 mt-4 mobile:grid mobile:grid-cols-10 mobile:grid-rows-2">
            <SearchInput contClassName="mobile:col-span-10" placeholder="Поиск по названию" />
            <Select>
                <SelectTrigger className="h-[48px] mobile:col-span-7 mobile:text-base mobile:px-2 placeholder:text-muted-foreground">
                    <SelectValue className="text-muted-foreground text-sm" placeholder="Способ получения" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="1">Ключ</SelectItem>
                </SelectContent>
            </Select>
            <div className="relative mobile:col-start-8 mobile:col-end-11">
                <Input className="placeholder:text-white mobile:px-2" placeholder="Цена" />
                <Image className="absolute top-1/2 -translate-y-1/2 right-2" src="/ui-assets/candle.svg" alt="candle" width={20} height={20} />
            </div>
        </div>
    );
};
