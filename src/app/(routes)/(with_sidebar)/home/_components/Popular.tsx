import Image from "next/image";
import { PopularRow } from "./PopularRow";

const popular = [
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

export const Popular = () => {
    return (
        <div>
            <div className="flex items-center gap-x-2 mb-9">
                <h3 className="text-2xl">Популярные товары</h3>
                <Image
                    height={30}
                    width={30}
                    alt="flash"
                    src="/images/main/flash.svg"
                />
            </div>
            <div className="space-y-8">
                {popular.map((row, idx) => (
                    <PopularRow key={row.name} data={row} idx={idx} />
                ))}
            </div>
        </div>
    );
};
