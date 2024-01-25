import { OfferApiService } from "@/requests/offer/offer-service";
import { Slider } from "./_components/slider";
import { OfferInfo } from "./_components/offer-info";
import { OfferReviews } from "./_components/offer-reviews";

const OfferPage = async ({params}: {params: {offerId: string}}) => {

    const offer = await OfferApiService.getOfferById(params.offerId)

    return(
        <main className="flex justify-between">
            <div className="w-[720px] shrink-0 space-y-6">
                <h1 className="text-5xl">{offer.name}</h1>
                <Slider />
                <OfferInfo categoryId={offer.category_id} description={offer.description} />
                <OfferReviews />
            </div>
            <aside className="w-full flex justify-center">
                Chat
            </aside>
        </main>
    )
}

export default OfferPage;