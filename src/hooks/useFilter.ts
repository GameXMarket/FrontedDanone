import { categoryServices } from "@/requests/categories/categories-services";
import { useInfiniteQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffectAfterMount } from "./useEffectAfterMount";
import { useEffect } from "react";

type initialPageParam = string | number

export const useFilter = (key: string | string[], initialPageParam?: initialPageParam) => {
    const pathname = usePathname();
    const { push } = useRouter();
    
    const searchParams = useSearchParams()
    const next = searchParams.get("next")

    const root_category = searchParams.get("c")

    const { data: arr, fetchNextPage, isFetching, isSuccess } = useInfiniteQuery({
        queryKey: ["filters", key, next],
        queryFn: ({ pageParam }) => categoryServices.getCategoryById(pageParam),
        initialPageParam: initialPageParam || +next!,
        getNextPageParam: (lastPage) => lastPage.values[0].next_carcass_id,
        enabled: !!next || !!initialPageParam,
        refetchOnWindowFocus: false
    })

    const onCategoryChange = (category_id: string) => {
        const params = new URLSearchParams(searchParams);
        const index = searchParams.getAll("val").map(el => el.split(":")[1]).indexOf(category_id.split(":")[1])
        if(index !== -1){
            params.delete("val", searchParams.getAll("val")[index])
        }
        params.append('val', category_id);
        push(`${pathname}?${params}`);
    }
    
    useEffectAfterMount(() => {
        const params = new URLSearchParams(searchParams);
        params.delete('val');
        push(`${pathname}?${params}`);
    }, [root_category])

    useEffect(() => {
        if(arr?.pageParams){
            fetchNextPage()
        }
    }, [isSuccess])

    return {data: arr, isFetching, onCategoryChange}
}