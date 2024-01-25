"use client";

import Header from "@/components/header/Header";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export const NoSidebarHeader = () => {

    const router = useRouter()

    return (
        <nav className="flex items-center pt-12">
            <div
                className="flex gap-x-3 items-center cursor-pointer"
                onClick={() => router.back()}
            >
                <ChevronLeft color="#FB2A29" className="text-gradient" />
                <p className="text-lg text-muted-foreground">Назад</p>
            </div>
            <Header className="w-full flex justify-center" />
        </nav>
    );
};
