import Image from "next/image";
import { ItemCard } from "@/components/ItemCard";

interface PopularRowProps {
    data: {
        img: string;
        name: string;
        items: { img: string; name: string; price: number; id: number }[];
    };
    idx: number;
}

export const PopularRow = ({ data, idx }: PopularRowProps) => {
    return (
        <div className="space-y-8">
            <div className="flex items-center gap-x-3">
                <div className="relative w-[60px] h-[60px]"><Image className="absolute rounded-tl-2xl rounded-br-2xl rounded-tr-lg rounded-bl-lg object-cover" src={data.img} alt="category" fill /></div>
                <h3 className="text-3xl font-medium">{data.name}</h3>
            </div>
            <div className="grid grid-cols-3 gap-x-10">{data.items.map((item) => <ItemCard key={item.name} item={item} />)}</div>
        </div>
    );
};
