import { OffersList } from "../../_components/offers-list"

const OffersListPage = ({params}: {params: {userId: string}}) => {
    return(
        <div className="w-full">
            <OffersList />
        </div>
    )
}

export default OffersListPage