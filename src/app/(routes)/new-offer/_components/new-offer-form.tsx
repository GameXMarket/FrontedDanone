"use client";

import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface NewOfferFormProps {
    onNextPage: () => void
}

export const NewOfferForm = ({onNextPage}: NewOfferFormProps) => {
    const [name, setName] = useState<string>("");
    const [service, setService] = useState<string>("");
    const [amount, setAmount] = useState<string>("");

    return (
        <div>
            <div className="flex flex-col items-center gap-y-4 min-w-[440px]">
                <SelectName label="Выберите игру" placeholder="Выберите название игры" setName={setName} />
                {name && <SelectService setService={setService} label="Выберите услугу" placeholder="Тип объявления" />}
                {name && service && <SelectAmount setAmount={setAmount} label="Выберите номинал" placeholder="Выберите количество"/>}
                {name && service && amount && <Button onClick={onNextPage} variant="accent" size="lg" className="rounded-xl">Далее</Button>}
            </div>
        </div>
    );
};

interface SelectNameProps {
    label?: string;
    placeholder?: string,
    setName: (name: string) => void;
}
const SelectName = ({ setName, label, placeholder }: SelectNameProps) => {
    return (
        <div className="w-full">
            <p className="text-xs text-muted-foreground ml-2 mb-1">
                {label}<span className="text-rose-500"> *</span>
            </p>
            <Select onValueChange={(value) => setName(value)}>
                <SelectTrigger className="min-w-[300px] px-6">
                    <SelectValue className="placeholder:font-" placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent className="text-xl">
                    <SelectItem value="1">Abvilion Online</SelectItem>
                    <SelectItem value="2">Apex Legends</SelectItem>
                    <SelectItem value="3">Arizona Rp</SelectItem>
                    <SelectItem value="4">Black Russia</SelectItem>
                    <SelectItem value="5">Brawl Stars</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};

interface SelectServiceProps {
    label?: string;
    placeholder?: string,
    setService: (name: string) => void;
}
const SelectService = ({setService, label, placeholder}: SelectServiceProps) => {
    return(
        <div className="w-full">
            <p className="text-xs text-muted-foreground ml-2 mb-1">
                {label}<span className="text-rose-500"> *</span>
            </p>
            <Select onValueChange={(value) => setService(value)}>
                <SelectTrigger className="px-6">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="1">Аккаунты</SelectItem>
                    <SelectItem value="2">Бустинг</SelectItem>
                    <SelectItem value="3">Боевой пропуск</SelectItem>
                    <SelectItem value="4">Донат</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}


interface SelectAmountProps {
    label?: string;
    placeholder?: string,
    setAmount: (name: string) => void;
}
const SelectAmount = ({setAmount, label, placeholder}: SelectAmountProps) => {
    return(
        <div  className="w-full">
            <p className="text-xs text-muted-foreground ml-2 mb-1">
                {label}<span className="text-rose-500"> *</span>
            </p>
            <Select onValueChange={(value) => setAmount(value)}>
                <SelectTrigger className="px-6">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="1">30 гемов</SelectItem>
                    <SelectItem value="2">170 гемов</SelectItem>
                    <SelectItem value="3">2000 гемов</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}