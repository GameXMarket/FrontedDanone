import { useEffect, useState } from "react";
import useDebounce from "./useDebounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useSearch = (queryKey: string) => {
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const searchParams = useSearchParams()
    const pathname = usePathname();
    const { push } = useRouter();

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        params.delete(queryKey);
        if (debouncedSearchTerm) {
            params.append(queryKey, debouncedSearchTerm);
        }
        push(`${pathname}?${params}`);
    }, [debouncedSearchTerm])

    return { setSearchTerm }
}