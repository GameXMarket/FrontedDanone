"use client";

import { useState } from "react";
import { NewOfferForm } from "./_components/new-offer-form";
import styles from "./style.module.css";
import { cn } from "@/lib/utils";
import { NewOfferSecondFrame } from "./_components/new-offer-details-form";

const NewOfferPage = () => {
    const [nextPage, setNextPage] = useState(false);

    return (
        <div 
            className={cn("w-full h-full flex px-8",
            !nextPage && "ml-[20px] lg:ml-[210px] xl:ml-[340px]",
            nextPage && "ml-[20px] lg:ml-[210px] xl:ml-[300px]")}>
            <div className={cn(nextPage && "hidden", !nextPage && styles.second_frame)}>
                <NewOfferForm onNextPage={() => setNextPage(true)} />
            </div>
            <div className={cn(!nextPage && "hidden", nextPage && styles.second_frame)}>
                <NewOfferSecondFrame onPrevPage={() => setNextPage(false)} />
            </div>
        </div>
    );
};

export default NewOfferPage;
