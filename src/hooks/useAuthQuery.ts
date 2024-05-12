import instance from "@/requests"
import { useCurrentUser } from "./useCurrentUser"
import { DefaultError, QueryKey, UndefinedInitialDataOptions, UseQueryResult, useQuery } from "@tanstack/react-query"

export function useAuthQuery<TQueryFnData = unknown, TError = DefaultError, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(options: UndefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>): UseQueryResult<TData, TError> {
    const user = useCurrentUser()
    instance.defaults.headers.common.Authorization = `Bearer ${user?.accessToken}`

    return useQuery({...options, enabled: (!!user?.accessToken && options.enabled)})
}