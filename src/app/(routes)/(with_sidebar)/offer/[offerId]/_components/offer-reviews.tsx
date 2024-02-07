import { Review } from "@/components/Review"

export const OfferReviews = () => {
    return(
        <div>
            <h2 className="text-2xl">Отзывы о товаре:</h2>
            <p className="my-3 space-y-4">
                <Review color="white" />
                <Review color="white" />
                <Review color="white" />
                <Review color="white" />
            </p>
        </div>
    )
}