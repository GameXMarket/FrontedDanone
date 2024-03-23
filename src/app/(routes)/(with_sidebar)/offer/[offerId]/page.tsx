import { OfferApiService } from "@/requests/offer/offer-service";
import { Slider } from "./_components/slider";
import { OfferInfo } from "./_components/offer-info";
import { OfferReviews } from "./_components/offer-reviews";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Chat from "../../chats/_components/chat/Chat";

const OfferPage = async ({params}: {params: {offerId: string}}) => {

    const offer = await OfferApiService.getOfferById(params.offerId)

    return(
        <main className="flex justify-between mobile:block">
            <div className="w-[720px] mobile:w-full shrink-0 space-y-6">
                <h1 className="text-5xl mobile:text-4xl">{offer.name}</h1>
                <Slider images={offer.offer_files} />
                <OfferInfo categoryId={offer.category_id} description={offer.description} />
                <OfferReviews />
                <div className="hidden mobile:flex justify-center items-center gap-x-4 absolute bottom-[100px] left-1/2 -translate-x-1/2 z-50">
                    <Button variant="accent" size="lg" className="text-lg rounded-xl">Чат с продавцом</Button>
                    <div className="w-12 h-12 flex justify-center items-center p-2 bg-[#FF4141] bg-opacity-5 cursor-pointer rounded-xl hover:bg-opacity-10"><Image src="/ui-assets/dislike.svg" alt="dislike" width={30} height={30} /></div>
                </div>
            </div>
            <aside className="w-full flex justify-center mobile:hidden">
                <Chat chat={offer.user_id} />
            </aside>
        </main>
    )
}

export default OfferPage;