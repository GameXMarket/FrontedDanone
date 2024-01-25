import { ReviewsList } from "../../_components/reviews-list"

const ReviewsListPage = ({params}: {params: {userId: string}}) => {
    return(
        <div className="w-full">
            <ReviewsList />
        </div>
    )
}

export default ReviewsListPage