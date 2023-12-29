"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import styles from "../style.module.css";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface NewOfferSecondFrameProps {
    onPrevPage: () => void;
}

export const NewOfferSecondFrame = ({
    onPrevPage,
}: NewOfferSecondFrameProps) => {
    const [price, setPrice] = useState<string>("");

    return (
        <div className="w-[500px] space-y-8 flex flex-col items-center">
            <div className="space-y-6">
                <div className="space-y-4">
                    <h2 className="text-3xl font-medium">Основное</h2>
                    <Input
                        placeholder="Введите заголовок объявления"
                        label="Заголовок объявления"
                    />
                    <PriceInput onChange={setPrice} price={+price} label="Цена" />
                </div>
                <div className="space-y-4">
                    <h2 className="text-3xl font-medium">Основное</h2>
                    <Input placeholder="Введите описание товара" />
                </div>
                <div className="space-y-4">
                    <h2 className="text-3xl font-medium">Загрузка фото</h2>
                    <div
                        className={cn(styles.dash_space, "h-[130px] flex items-center px-6 relative")}
                    >
                        <div className="flex items-center justify-between">
                            <Image
                                alt="add_photo"
                                width={32}
                                height={32}
                                src="/images/new-offer/gallery-add.svg"
                            />
                            <p className="text-muted-foreground text-xl w-5/6">
                                Перетащите изображения в эту область, или
                                нажмите внутри неё
                            </p>
                        </div>
                        <Input
                            id="img"
                            type="file"
                            className={cn(
                                "h-full opacity-0 cursor-pointer absolute top-0 left-0"
                            )}
                        />
                    </div>
                </div>
            </div>
            <div className="flex gap-x-4">
                <Button
                    variant="accent"
                    size="lg"
                    className="rounded-xl"
                    onClick={onPrevPage}
                >
                    Назад
                </Button>
                <Button
                    variant="accent"
                    size="lg"
                    className="rounded-xl"
                    onClick={onPrevPage}
                >
                    Далее
                </Button>
            </div>
        </div>
    );
};

const PriceInput = ({ label, onChange, price }: { label: string, onChange: (val: string) => void, price: number }) => {
    return (
        <div>
            <p className="text-xs text-muted-foreground ml-2 mb-1 w-10">
                {label}
                <span className="text-rose-500"> *</span>
            </p>
            <div className="flex items-center">
                <div className="flex w-[170px]">
                    <Input onChange={(val) => onChange(val.currentTarget.value)} className="rounded-r-none" />
                    <div className="flex justify-center items-center rounded-xl rounded-l-none bg-[#272228] w-4/5 text-2xl">
                        <p className="text-gradient">₽</p>
                    </div>
                </div>
                <div className="text-xl ml-6">
                    Цена для покупателя{" "}
                    <span className="text-gradient">{price+Math.ceil((price/100)*12)}</span>
                </div>
            </div>
        </div>
    );
};
