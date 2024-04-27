"use client";

import { SearchInput } from "@/components/SearchInput";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { useParams } from "next/navigation";
import { AutogiveList } from "./autogive-list";
import { useSafeMutation } from "@/hooks/useSafeMutation";
import { AutogiveAddForm } from "./autogive-add-form";
import { safeEnableAutogive } from "@/requests/offer/offer-service";
import { OfferType } from "@/types/OfferType";

interface AutoGiveFormProps {
    offer: OfferType
}

export const AutoGiveForm = ({offer}: AutoGiveFormProps) => {
    const params = useParams()

    const {mutation} = useSafeMutation(safeEnableAutogive)

    const [visible, setVisible] = useState(offer.is_autogive_enabled);

    const enableAutogive = async (enabled: boolean) => {
        mutation.mutate({
            offer_id: params.offerId[0],
            enabled
        })
        setVisible(enabled)
    }

    return (
        <div className="w-full max-w-[590px] ml-8 mobile:ml-0">
            <div className="flex mobile:flex-col mobile:gap-y-4 items-center gap-x-4 self-start">
                <h2 className="text-3xl mobile:text-center">Подключить автовыдачу?</h2>
                <Switch defaultChecked={offer.is_autogive_enabled} onCheckedChange={enableAutogive} />
            </div>
            {visible && (
                <form className="bg-[#1F2028] p-4 rounded-xl space-y-3 max-h-[308px] overflow-y-auto mt-4">
                    <div className="flex justify-between">
                        <SearchInput placeholder="Поиск по содержанию" className="max-w-[400px] mobile:max-w-[260px] mobile:text-base" />
                        <AutogiveAddForm offerId={params.offerId[0]} />
                    </div>
                    <AutogiveList offerId={params.offerId[0]} />
                </form>
            )}
        </div>
    );
};
