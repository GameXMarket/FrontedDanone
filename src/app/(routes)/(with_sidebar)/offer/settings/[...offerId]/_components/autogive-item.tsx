import { Separator } from "@/components/ui/separator"

interface AutoGiveItemProps {
    text: string,
    idx: number
}

export const AutoGiveItem = ({text, idx}: AutoGiveItemProps) => {
    return(
        <div className="flex p-4 gap-x-4 items-center bg-bgel text-lg font-medium rounded-xl">
            <div className="text-xl min-w-[12px]">{idx}</div>
            <Separator orientation="vertical" className="h-full min-h-[32px]" />
            <div>{text}</div>
        </div>
    )
}