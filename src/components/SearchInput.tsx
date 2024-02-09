import Image from "next/image"
import { Input } from "./ui/input"
import { cn } from "@/lib/utils"

interface SearchInputProps {
    placeholder?: string,
    className?: string,
    contClassName?: string
}

export const SearchInput = ({placeholder, className, contClassName}: SearchInputProps) => {
    return(
        <div className={cn("relative w-full", contClassName)}>
            <Image className="absolute top-1/2 left-3 -translate-y-1/2" src='/ui-assets/search-normal.svg' alt="search" width={20} height={20} />
            <Input className={cn("pl-12", className)} placeholder={placeholder} />
        </div>
    )
}