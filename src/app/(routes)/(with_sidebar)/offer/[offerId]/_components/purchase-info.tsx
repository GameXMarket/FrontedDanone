"use client";

import { Button } from "@/components/ui/button";
import { useSafeMutation } from "@/hooks/useSafeMutation";
import { safeCreatePurchase } from "@/requests/purchase/purchase-service";
import { CreatePurchaseDto } from "@/requests/purchase/schemas";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError, isAxiosError } from "axios";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";

interface PurchaseInfoProps {
    username: string;
    user_files?: string[];
    setVisibleChat: Dispatch<SetStateAction<boolean>>;
    offer_id: number;
}

export const PurchaseInfo = ({
    username,
    user_files,
    setVisibleChat,
    offer_id,
}: PurchaseInfoProps) => {
    const queryClient = useQueryClient()
    const { mutation } = useSafeMutation<CreatePurchaseDto, AxiosError>(
        safeCreatePurchase,
        {
            onSuccess(data: any) {
                queryClient.invalidateQueries({queryKey: ["offer_status", data.offer_id]})
                setVisibleChat(true)
            },
            onError(err) {
                if(isAxiosError(err)){
                    //@ts-ignore
                    toast.error(err.response?.data.detail)
                }
            }
        }
    );
    const createPurchase = () => {
        mutation.mutate({
            offer_id: offer_id.toString(),
            count: 1
        });
    };

    return (
        <div className="space-y-5 max-w-[552px]">
            <p className="text-[22px]">Продавец:</p>
            <div className="flex items-center gap-x-3 px-1">
                <div className="h-[50px] w-[50px] min-w-[50px] relative">
                    <Image
                        src={user_files?.[0] || "/ui-assets/default_avatar.jpg"}
                        alt="seller"
                        fill
                        className="rounded-full object-cover absolute"
                    />
                </div>
                <div>
                    <p>{username}</p>
                    <div className="flex items-center gap-x-1">
                        {Array.from({ length: 5 }, (_, idx) => (
                            <Image
                                key={idx}
                                src="/images/main/star.svg"
                                alt="star"
                                width={16}
                                height={16}
                            />
                        ))}
                        <span>5.0</span>
                    </div>
                </div>
            </div>
            <div className="bg-bgel p-[32px] rounded-[24px] text-center space-y-6">
                <p className="text-3xl">Порядок проведения сделки</p>
                <div className="flex items-center gap-x-10">
                    <div className="flex flex-col gap-y-4 items-center">
                        <Image
                            src="/offer/customer_icon.svg"
                            alt="customer"
                            width={44}
                            height={64}
                        />
                        <span className="text-xl">Покупатель</span>
                    </div>
                    <Image
                        className="-mt-11"
                        src="/offer/arrow-2.svg"
                        alt="arrow 2"
                        width={32}
                        height={32}
                    />
                    <div className="flex flex-col gap-y-4 items-center">
                        <Image
                            src="/offer/gamex_icon.svg"
                            alt="gamex"
                            width={64}
                            height={64}
                        />
                        <span className="text-xl">GameX</span>
                    </div>
                    <Image
                        className="-mt-11"
                        src="/offer/arrow-right.svg"
                        alt="arrow right"
                        width={44}
                        height={64}
                    />
                    <div className="flex flex-col gap-y-4 items-center">
                        <Image
                            src="/offer/seller_icon.svg"
                            alt="seller"
                            width={64}
                            height={64}
                        />
                        <span className="text-xl">Продавец</span>
                    </div>
                </div>
                <p className="text-xl font-light opacity-20">
                    Продавец получит оплату только после того, как выполнит свои
                    обязательства.
                </p>
            </div>
            <div className="w-full flex flex-col items-center gap-y-4">
                <Button
                    onClick={() => createPurchase()}
                    className="bg-[#5ACF30] bg-opacity-20 rounded-[24px] p-6 h-auto w-fit flex items-center gap-x-6 hover:bg-[#5ACF30] hover:bg-opacity-80"
                >
                    <span className="text-[32px] font-medium">Оплатить</span>
                    <Image
                        src="/offer/wallet.svg"
                        alt="wallet"
                        width={35}
                        height={35}
                    />
                </Button>
                <Button
                    onClick={() => setVisibleChat(true)}
                    className="bg-bgel rounded-[24px] p-4 h-auto w-fit flex items-center gap-x-10"
                >
                    <span className="text-[22px]">Задать вопрос</span>
                    <Image
                        src="/offer/message-question.svg"
                        alt="question"
                        width={35}
                        height={35}
                    />
                </Button>
            </div>
        </div>
    );
};
