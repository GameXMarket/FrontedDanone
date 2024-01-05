import { FieldErrors } from "@/lib/create-safe-fetch";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { useState } from "react";

type Output<TInput> = {
    fieldErrors?: FieldErrors<TInput>,
    data: TInput
}

export const useSafeMutation = <TInput> (fn: any, options?: UseMutationOptions<Output<TInput>, {}, TInput, unknown>) => {

    const [fieldErrors, setFieldsErrors] = useState<FieldErrors<TInput>>()

    const mutation = useMutation<Output<TInput>, {}, TInput>({
        mutationFn: fn,
        onSettled: (data) => {
            setFieldsErrors(data?.fieldErrors)
        },
        ...options
    })

    return {mutation, fieldErrors}
}

