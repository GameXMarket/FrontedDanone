'use client'

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { usePathname, useRouter } from "next/navigation"

export const Navbar = () => {

    const pathname = usePathname()

    const {push} = useRouter()

    return(
        <div className="flex justify-center gap-x-4">
            <Button onClick={() => push("/me/reviews")} className={cn("px-6 py-6 bg-bgel text-muted-foreground text-xl rounded-full",
                pathname.includes("reviews") && "outline outline-2 outline-[#FB2A29] text-white bg-[#FB2A29] bg-opacity-5")}>Мои отзывы</Button>
            <Button onClick={() => push("/me/purchases")} className={cn("px-6 py-6 bg-bgel text-muted-foreground text-xl rounded-full",
                pathname.includes("purchases") && "outline outline-2 outline-[#FB2A29] text-white bg-[#FB2A29] bg-opacity-5")}>Покупки</Button>
        </div>
    )
}