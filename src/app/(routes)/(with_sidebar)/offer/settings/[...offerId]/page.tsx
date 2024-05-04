"use client";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { AutoGiveForm } from "./_components/autogive-form";
import { OfferApiService } from "@/requests/offer/offer-service";
import { useAuthQuery } from "@/hooks/useAuthQuery";
import { Skeleton } from "@/components/ui/skeleton";
import { useSafeMutation } from "@/hooks/useSafeMutation";
import { ChangeStatusDto, EnableAutoUpDto } from "@/requests/offer/schemas";
import toast from "react-hot-toast";

const OfferSettingsPage = ({ params }: { params: { offerId: string } }) => {
    const { data: offer, isLoading, refetch } = useAuthQuery({
        queryKey: ["offer_settings", params.offerId],
        queryFn: () => OfferApiService.getMyById(params.offerId),
    });
    const {mutation} = useSafeMutation<ChangeStatusDto, string>(OfferApiService.changeStatus, {
        onSuccess() {
            refetch()
        }
    })
    const changeStatus = (status: "active" | "hidden") => {
        if(!offer) return
        mutation.mutate({offer_id: offer.id.toString(), status: status})
    }
    const {mutation: autoUpMutation} = useSafeMutation<EnableAutoUpDto, string>(OfferApiService.enableAutoUp, {
        onSuccess() {
            toast.success("Автоподнятие включено")
        }
    })
    const enableAutoUp = () => {
        if(!offer) return
        autoUpMutation.mutate({offer_id: offer.id.toString()})
    }
    if (isLoading)
        return (
            <div className="w-[calc(100%-382px)] mobile:w-full h-full flex flex-col items-start justify-center gap-y-12">
                <Skeleton className="w-full h-14 bg-muted-foreground" />
                <Skeleton className="w-full h-14 bg-muted-foreground" />
                <Skeleton className="w-20 h-10 bg-muted-foreground self-center" />
            </div>
        );
    else if (offer)
        return (
            <div className="w-[calc(100%-382px)] mobile:w-full h-full flex flex-col items-start justify-center gap-y-12">
                {offer.is_autogive_enabled !== null && (
                    <AutoGiveForm refetchOffer={refetch} offer={offer} />
                )}
                <div className="flex mobile:flex-col mobile:gap-y-4 items-center gap-x-4 self-start ml-8 mobile:ml-0">
                    <h2 className="text-3xl mobile:text-center">
                        Подключить автоматическое поднятие?
                    </h2>
                    <Switch onCheckedChange={enableAutoUp} defaultChecked={offer.is_autoup_enabled} />
                </div>
                {offer.status === "active" ? (
                    <Button
                        disabled={mutation.isPending}
                        onClick={() => changeStatus("hidden")}
                        variant="accent"
                        size="lg"
                        className="rounded-xl text-lg self-center"
                    >
                        Снять с продажи
                    </Button>
                ) : (
                    <Button
                        disabled={mutation.isPending}
                        onClick={() => changeStatus("active")}
                        variant="accent"
                        size="lg"
                        className="rounded-xl text-lg self-center"
                    >
                        Выставить на продажу
                    </Button>
                )}
            </div>
        );
};

export default OfferSettingsPage;
