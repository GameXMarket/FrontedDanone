import { cn } from "@/lib/utils";
import Image from "next/image";
import styles from "./styles/style.module.css"

interface MainContentItemProps {
    url: string;
    idx: number;
    name: string
}

export const MainContentItem = ({ url, idx, name }: MainContentItemProps) => {
    return (
        <div 
            className={cn("relative cursor-pointer hover:scale-105 transition",
            idx === 0 && "row-span-2",
            idx === 4 && "col-span-2",
            styles.game_item
            )}
        >
            <Image alt="game" fill className="object-cover rounded-3xl" src={url} />
            <label className="absolute bottom-3 left-3 text-2xl z-10 font-medium cursor-pointer">{name}</label>
        </div>
    );
};