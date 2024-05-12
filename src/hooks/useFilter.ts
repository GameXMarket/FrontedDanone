import { categoryServices } from "@/requests/categories/categories-services";
import { useInfiniteQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffectAfterMount } from "./useEffectAfterMount";
import { useEffect, useState } from "react";

type initialPageParam = string | number

export const useFilter = (key: string | string[], initialPageParam?: initialPageParam) => {
    const [priceFilter, setPriceFilter] = useState<"descending" | "ascending" | "none">("none")

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

    const onCategoryChange = (category_id: string, carcass_id?: string) => {
        const params = new URLSearchParams(searchParams);

        if(carcass_id){
            //Check if it is the same category
            const sameCategoryIndex = searchParams.getAll("val").map(el => el.split(":")[1]).indexOf(carcass_id)
            if(sameCategoryIndex !== -1){
                params.delete("val", searchParams.getAll("val")[sameCategoryIndex])
                push(`${pathname}?${params}`);
                return
            }
            return
        }

        // Check if category in the same group
        const sameGroupIndex = searchParams.getAll("val").map(el => el.split(":")[1]).indexOf(category_id.split(":")[1])
        if(sameGroupIndex !== -1){
            params.delete("val", searchParams.getAll("val")[sameGroupIndex])
        }

        params.append('val', category_id);
        push(`${pathname}?${params}`);
    }

    useEffectAfterMount(() => {
        const params = new URLSearchParams(searchParams);
        params.delete('price');
        params.append('price', priceFilter);
        push(`${pathname}?${params}`);
    }, [priceFilter])
    
    useEffectAfterMount(() => {
        const params = new URLSearchParams(searchParams);
        params.delete('val');
        push(`${pathname}?${params}`);
    }, [root_category])

    useEffectAfterMount(() => {
        if(!searchParams.get("price")){
            setPriceFilter("none")
        }
    }, [searchParams.get("price")])

    useEffect(() => {
        if(arr?.pageParams){
            fetchNextPage()
        }
    }, [isSuccess])

    return {data: arr, isFetching, onCategoryChange, setPriceFilter, priceFilter}
}