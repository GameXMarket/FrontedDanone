import { cn } from "@/lib/utils";
import Image from "next/image";

interface MainContentItemProps {
    url: string;
    idx: number
}

export const MainContentItem = ({ url, idx }: MainContentItemProps) => {
    return (
        <div 
            className={cn("relative",
            idx === 0 && "col-span-2 row-span-2",
            idx === 5 && "col-span-2",
            idx === 6 && "col-span-2",
            )}
        >
            <Image alt="game" fill className="object-cover rounded-md" src={url} />
        </div>
    );
};
