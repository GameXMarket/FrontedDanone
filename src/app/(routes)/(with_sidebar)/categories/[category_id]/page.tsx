"use client";

import { FC, useMemo } from "react";
import styles from "./styles/page.module.css";
import { ArrowBackIcon } from "./icons/game-page-icons";
import Image from "next/image";
import {
    useParams,
    usePathname,
    useRouter,
    useSearchParams,
} from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { categoryServices } from "@/requests/categories/categories-services";
import { FilterForm } from "./_components/filter-form";
import { OffersList } from "./_components/offers-list";
import { CategoryType, ValueType } from "@/types/CategoryType";
import { cn } from "@/lib/utils";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

const GamePage: FC = () => {
    const user = useCurrentUser();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace, back, push } = useRouter();

    const params = useParams();
    const category_id: string = params.category_id as string;

    const currentId = useMemo(() => {
        return searchParams.get("c") || category_id;
    }, [category_id, searchParams]);

    const {
        data: rootData,
        isLoading: rootIsLoading,
        error: rootError,
    } = useQuery<ValueType[]>({
        queryKey: ["get_root_category_by_id", { category_id }],
        queryFn: () => categoryServices.getValueById(category_id),
    });

    const {
        data: currentData,
        isLoading: currentIsLoading,
        error: currentError,
        refetch: currentRefetch,
    } = useQuery<CategoryType>({
        queryKey: ["get_current_category_by_id", { category_id }],
        queryFn: async () =>
            categoryServices.getCategoryById(rootData?.[0].next_carcass_id!),
        enabled: !!rootData,
    });

    const changeCategory = (id: number, next: number) => {
        const params = new URLSearchParams(searchParams);
        params.set("c", id.toString());
        params.set("next", next.toString());
        replace(`${pathname}?${params}`);
    };

    return (
        <div className={cn("pr-20 mobile:pr-0 h-full", !user && "pr-0")}>
            <section className={styles.back}>
                <Link
                    href="/catalog"
                    className="w-full flex items-center"
                >
                    <ArrowBackIcon />
                    <p className={styles.back_text}>Назад</p>
                </Link>
            </section>
            <div className="overflow-y-auto mobile:overflow-y-visible h-full pr-4 mobile:pr-0">
                <section className={styles.game_details}>
                    <div className="flex items-center gap-x-10 mobile:gap-x-4">
                        <Image
                            className="min-w-[80px] min-h-[80px] mobile:w-20 mobile:h-20"
                            src="/game-assets/game.svg"
                            alt="game"
                            width={120}
                            height={115}
                        />
                        <div>
                            <h1 className={styles.game_title}>
                                {rootData?.[0].value}
                            </h1>
                            <h3 className={styles.game_orders_qty}>30 000 лотов</h3>
                        </div>
                    </div>
                    <div className="hidden mobile:block">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button feature="noFocus" variant="outline">
                                    <Image
                                        src="/ui-assets/filter-search.svg"
                                        width={24}
                                        height={24}
                                        alt="filter"
                                    />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-bgel border-none max-h-[152px] overflow-y-auto">
                                <DropdownMenuRadioGroup>
                                    {currentData?.values.map((el) => (
                                        <DropdownMenuRadioItem
                                            value="1"
                                            onClick={() =>
                                                changeCategory(
                                                    el.id,
                                                    el.next_carcass_id
                                                )
                                            }
                                            className={cn(
                                                "flex items-center justify-center px-1 py-2 text-white ",
                                                +currentId === el.id &&
                                                    "back-gradient"
                                            )}
                                            key={el.id}
                                        >
                                            <p>
                                                {el.value}
                                            </p>
                                        </DropdownMenuRadioItem>
                                    ))}
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button
                            onClick={() =>
                                replace(pathname)
                            }
                            className="text-center rounded-full bg-rose-500 w-5 h-5 p-0 ml-2"
                        >
                            <Trash2 className="w-3 h-3" />
                        </Button>
                    </div>
                    <div className="ml-10 mobile:hidden">
                        {currentIsLoading ? (
                            <p>Loading...</p>
                        ) : currentData ? (
                            <div className="w-[600px] flex flex-wrap justify-center">
                                {currentData?.values.map((el) => (
                                    <div
                                        onClick={() =>
                                            changeCategory(
                                                el.id,
                                                el.next_carcass_id
                                            )
                                        }
                                        className={cn(
                                            styles.option,
                                            "opacity-40",
                                            +currentId === el.id &&
                                                "back-gradient bg-opacity-15 opacity-100"
                                        )}
                                        key={el.id}
                                    >
                                        <p className={styles.option_text}>
                                            {el.value}
                                        </p>
                                    </div>
                                ))}
                                <TooltipProvider>
                                    <Tooltip
                                        disableHoverableContent
                                        delayDuration={200}
                                    >
                                        <TooltipTrigger>
                                            <Button
                                                onClick={() =>
                                                    replace(pathname)
                                                }
                                                className="text-center rounded-full bg-rose-500 w-7 h-7 p-0"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent
                                            side="right"
                                            className="back-gradient border-none"
                                        >
                                            <p className="text-white">
                                                Очистить фильтр
                                            </p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        ) : (
                            <>No data found</>
                        )}
                    </div>
                </section>
                <div>
                    <FilterForm />
                    <OffersList category_id={currentId} />
                </div>
            </div>
        </div>
    );
};

export default GamePage;
