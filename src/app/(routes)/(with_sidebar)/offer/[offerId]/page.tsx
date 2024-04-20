'use client'

import { OfferApiService } from "@/requests/offer/offer-service";
import { Slider } from "./_components/slider";
import { OfferInfo } from "./_components/offer-info";
import { OfferReviews } from "./_components/offer-reviews";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Chat from "../../chats/_components/chat/Chat";
import { useAuthQuery } from "@/hooks/useAuthQuery";
import { messengerService } from "@/requests/messenger/messenger.service";
import { useQuery } from "@tanstack/react-query";

const OfferPage = ({ params }: { params: { offerId: string } }) => {
    const {
        data: offer,
        error,
        isSuccess,
    } = useAuthQuery({
        queryKey: ["get offer", params.offerId],
        queryFn: () => OfferApiService.getOfferById(params.offerId),
    });

    const { data: dialog, isError } = useAuthQuery({
        queryKey: ["get dialog", params.offerId],
        queryFn: () => {
            if (offer) {
                return messengerService.getDialogById(offer.user_id);
            }
            else{
                return null
            }
        },
        enabled: !!offer,
        retry: false
    });

    if (offer) {
        return (
            <main className="flex justify-between mobile:block">
                <div className="w-[720px] mobile:w-full shrink-0 space-y-6">
                    <h1 className="text-5xl mobile:text-4xl">{offer.name}</h1>
                    <Slider images={offer.offer_files} />
                    <OfferInfo
                        categoryId={offer.category_id}
                        description={offer.description}
                    />
                    <OfferReviews />
                    <div className="hidden mobile:flex justify-center items-center gap-x-4 absolute bottom-[100px] left-1/2 -translate-x-1/2 z-50">
                        <Button
                            variant="accent"
                            size="lg"
                            className="text-lg rounded-xl"
                        >
                            Чат с продавцом
                        </Button>
                        <div className="w-12 h-12 flex justify-center items-center p-2 bg-[#FF4141] bg-opacity-5 cursor-pointer rounded-xl hover:bg-opacity-10">
                            <Image
                                src="/ui-assets/dislike.svg"
                                alt="dislike"
                                width={30}
                                height={30}
                            />
                        </div>
                    </div>
                </div>
                <aside className="w-full flex justify-center mobile:hidden">
                    <Chat offerId={params.offerId} userIdFromOffer={offer.user_id} dialogError={isError} dialog={dialog} />
                </aside>
            </main>
        );
    }
};

export default OfferPage;
