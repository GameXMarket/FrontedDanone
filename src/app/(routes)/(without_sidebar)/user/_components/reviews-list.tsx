import { Review } from "@/components/Review";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export const ReviewsList = () => {
    return (
        <div className="flex flex-col items-center gap-y-8 mt-8">
            <div>
                <Select>
                    <SelectTrigger className="h-[48px]">
                        <SelectValue placeholder="Рейтинг отзывов" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1">Ключ</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="w-[570px] overflow-y-auto h-[500px] space-y-4">
                {Array.from({length: 5}).map((_, idx) => <Review key={idx} />)}
            </div>
        </div>
    );
};
