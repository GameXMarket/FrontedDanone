import { PopularRow } from "@/app/(routes)/(with_sidebar)/home/_components/PopularRow";
import { SearchInput } from "@/components/SearchInput";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const items = [
    {
        name: "Brawl Stars",
        img: "/images/temp_main/bslogo.png",
        items: [
            {
                img: "/images/temp_main/brawlstars.png",
                name: "ДЕШЁВЫЕ ГЕМЫ!!!",
                price: 100,
            },
            {
                img: "/images/temp_main/brawlstars.png",
                name: "ДЕШЁВЫЕ ГЕМЫ!!!",
                price: 100,
            },
            {
                img: "/images/temp_main/brawlstars.png",
                name: "ДЕШЁВЫЕ ГЕМЫ!!!",
                price: 100,
            },
        ],
    },
    {
        name: "Fortnite",
        img: "/images/temp_main/fortnite.png",
        items: [
            {
                img: "/images/temp_main/fortnite.png",
                name: "ДЕШЁВЫЕ ГЕМЫ!!!",
                price: 100,
            },
            {
                img: "/images/temp_main/fortnite.png",
                name: "ДЕШЁВЫЕ ГЕМЫ!!!",
                price: 100,
            },
            {
                img: "/images/temp_main/fortnite.png",
                name: "ДЕШЁВЫЕ ГЕМЫ!!!",
                price: 100,
            },
        ],
    },
];

export const OffersList = () => {
    return (
        <div className="flex flex-col items-center gap-y-8 mt-8">
            <div className="flex gap-x-5 items-center w-[60%]">
                <SearchInput className="w-full" placeholder="Поиск по названию" />
                <Select>
                    <SelectTrigger className="h-[48px] w-1/5">
                        <SelectValue placeholder="Цена" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1">Ключ</SelectItem>
                    </SelectContent>
                </Select>
                <Select>
                    <SelectTrigger className="h-[48px] w-1/5">
                        <SelectValue placeholder="Рейтинг" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1">Ключ</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-8 w-[80%]">
                {items.map((row, idx) => (
                    <PopularRow key={row.name} data={row} idx={idx} />
                ))}
            </div>
        </div>
    );
};
