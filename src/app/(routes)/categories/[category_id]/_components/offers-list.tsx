import { ItemCard } from "@/components/ItemCard"
import { Button } from "@/components/ui/button"

interface OffersListPeops {
    items: any
}

export const OffersList = () => {
    return(
        <div className="mt-6 grid grid-cols-3 gap-10">
            {Array.from({length: 9}, (_, idx) => (
                <div className="w-full flex flex-col items-center gap-y-6">
                    <ItemCard item={{img: "/images/temp_main/brawlstars.png", name: "Brawl Stars", price: 1000}} />
                    <Button size="lg" className="rounded-xl w-3/4 text-xl" variant="accent">Чат с продавцом</Button>
                </div>
            ))}
        </div>
    )
}