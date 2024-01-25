import { SearchInput } from "@/components/SearchInput";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export const FilterForm = () => {
    return (
        <div className="flex items-center gap-x-3 mt-4">
            <SearchInput placeholder="Поиск по названию" />
            <Select>
                <SelectTrigger className="h-[48px]">
                    <SelectValue placeholder="Способ получения" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="1">Ключ</SelectItem>
                </SelectContent>
            </Select>
            <Input placeholder="Цена" />
        </div>
    );
};
