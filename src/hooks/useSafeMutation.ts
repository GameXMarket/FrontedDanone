import { FieldErrors } from "@/lib/create-safe-fetch";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useState } from "react";

type Output<TInput> = {
    data: TInput
}

type Error<TInput> = {
    fieldErrors?: FieldErrors<TInput>,
} | AxiosError

export const useSafeMutation = <TInput> (fn: any, options?: UseMutationOptions<Output<TInput>, Error<TInput>, TInput, unknown>) => {

    const [fieldErrors, setFieldsErrors] = useState<FieldErrors<TInput>>()

    const mutation = useMutation<Output<TInput>, Error<TInput>, TInput>({
        mutationFn: fn,
        onSettled: (data, error, variables, ctx) => {
            options?.onSettled?.(data, error, variables, ctx)
        },
        onError: (error, variables, ctx) => {
            setFieldsErrors({})
            if(!axios.isAxiosError(error)){
                setFieldsErrors(error?.fieldErrors)
            }
            options?.onError?.(error, variables, ctx)
        },
        onSuccess: (data, variables, ctx) => {
            setFieldsErrors({})
            options?.onSuccess?.(data, variables, ctx)
        }
    })

    return {mutation, fieldErrors}
}

