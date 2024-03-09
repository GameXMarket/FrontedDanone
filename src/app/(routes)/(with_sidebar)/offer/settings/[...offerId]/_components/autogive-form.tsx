"use client";

import { SearchInput } from "@/components/SearchInput";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import { useState } from "react";
import { AutoGiveItem } from "./autogive-item";

export const AutoGiveForm = () => {
    const [visible, setVisible] = useState(false);

    return (
        <div className="w-full max-w-[590px] ml-8 mobile:ml-0">
            <div className="flex mobile:flex-col mobile:gap-y-4 items-center gap-x-4 self-start">
                <h2 className="text-3xl mobile:text-center">Подключить автовыдачу?</h2>
                <Switch onCheckedChange={setVisible} />
            </div>
            {visible && (
                <form className="bg-[#1F2028] p-4 rounded-xl space-y-3 max-h-[308px] overflow-y-auto mt-4">
                    <div className="flex justify-between">
                        <SearchInput placeholder="Поиск по содержанию" className="max-w-[400px] mobile:max-w-[260px] mobile:text-base" />
                        <Image
                            src="/ui-assets/add-circle.svg"
                            alt="add"
                            width={26}
                            height={26}
                            className="cursor-pointer hover:opacity-80"
                        />
                    </div>
                    <div className="space-y-3">{Array.from({length: 3}).map((_, idx) => <AutoGiveItem key={idx} text="Log, pass" idx={idx} />)}</div>
                </form>
            )}
        </div>
    );
};
