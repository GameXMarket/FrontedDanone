import { FetchState, FieldErrors } from "@/lib/create-safe-fetch"
import { useCallback, useState } from "react"

type FetchType<TInput, TOutput> = (data: TInput) => Promise<FetchState<TInput, TOutput>>

type Options = {
    onFinal: () => void
}

export const useFetch = <TInput, TOutput>(fetch: FetchType<TInput, TOutput>, options?: Options) => {

    const [isLoading, setIsLoading] = useState(false)

    const [fieldErrors, setFieldErrors] = useState<FieldErrors<TInput> | undefined>()

    const execute = useCallback(async (data: TInput) => {
        setIsLoading(true)
        try {
            const result = await fetch(data)
            console.log(result)

            if (!result) {
                return;
            }
            setFieldErrors(result.fieldErrors);
        }
        finally {
            setIsLoading(false)
            options?.onFinal()
        }
    }, [fetch])

    return {execute, fieldErrors, isLoading}
}