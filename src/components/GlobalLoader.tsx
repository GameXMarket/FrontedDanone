import { cn } from "@/lib/utils"
import { SessionContextValue, useSession } from "next-auth/react"
import Image from "next/image"
import { memo, useEffect, useState } from "react"

interface GloabalLoaderProps {
    session?: SessionContextValue
    enabled?: boolean
}

export const GlobalLoader = memo(({session, enabled}: GloabalLoaderProps) => {
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        if(session?.status !== "loading" || enabled === false){
            setTimeout(() => setVisible(false), 250)
        }
    }, [session?.status])

    return(
        <section className={cn(
            "w-full h-full absolute z-50 bg-bgel -translate-x-[20px] mobile:-translate-x-[16px]",
            (session?.status !== "loading" || enabled === false) && "animate-disappear",
            !visible && "hidden"
        )}>
            <Image className="animate-pulse absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mobile:px-4" priority src='/logo.svg' alt="logo" width={420} height={64} />
        </section>
    )
})

GlobalLoader.displayName = "Global Loader"