import { FieldErrors } from "@/lib/create-safe-fetch";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useCurrentUser } from "./useCurrentUser";
import instance from "@/requests";

type Output<TOutput> = {
    data: TOutput
}

type Error<TInput> = {
    fieldErrors?: FieldErrors<TInput>,
} | AxiosError

export const useSafeMutation = <TInput, TOutput> (fn: any, options?: UseMutationOptions<Output<TOutput>, Error<TInput>, TInput, unknown>, token?: string) => {
    const user = useCurrentUser()
    instance.defaults.headers.common.Authorization = `Bearer ${user?.accessToken}`

    const [fieldErrors, setFieldsErrors] = useState<FieldErrors<TInput>>()
    
    const mutation = useMutation<Output<TOutput>, Error<TInput>, TInput>({
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

