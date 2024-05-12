import Image from "next/image"
import { Dispatch, SetStateAction, memo } from "react"

interface PriceIconProps {
    setPriceFilter: Dispatch<SetStateAction<"descending" | "ascending" | "none">>
    priceFilter: "none" | "descending" | "ascending"
}

const PriceIcon = ({setPriceFilter, priceFilter}: PriceIconProps) => {
    switch(priceFilter){
        case "none":
            return(
                <div className="h-full flex flex-col justify-center">
                    <Image onClick={() => setPriceFilter("ascending")} src="/ui-assets/arrow-bottom.svg" alt="arrow-up" width={24} height={24} className="rotate-180 cursor-pointer" />
                    <Image onClick={() => setPriceFilter("descending")} src="/ui-assets/arrow-bottom.svg" alt="arrow-up" width={24} height={24} className="cursor-pointer" />
                </div>
            )
        case "ascending":
            return(
                <div className="h-full flex flex-col justify-center">
                    <Image onClick={() => setPriceFilter("ascending")} src="/ui-assets/arrow-up.svg" alt="arrow-up" width={24} height={24} className="cursor-pointer" />
                    <Image onClick={() => setPriceFilter("descending")} src="/ui-assets/arrow-bottom.svg" alt="arrow-up" width={24} height={24} className="cursor-pointer" />
                </div>
            )
        case "descending":
            return(
                <div className="h-full flex flex-col justify-center">
                    <Image onClick={() => setPriceFilter("ascending")} src="/ui-assets/arrow-bottom.svg" alt="arrow-up" width={24} height={24} className="rotate-180 cursor-pointer" />
                    <Image onClick={() => setPriceFilter("descending")} src="/ui-assets/arrow-up.svg" alt="arrow-up" width={24} height={24} className="rotate-180 cursor-pointer" />
                </div>
            )
    }
}

export default PriceIcon