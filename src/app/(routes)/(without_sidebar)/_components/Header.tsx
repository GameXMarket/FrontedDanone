"use client";

import Header from "@/components/header/Header";
import { ChevronLeft } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export const NoSidebarHeader = () => {

    const session = useSession()

    return (
        <nav className="flex items-center pt-12 mobile:pt-6">
            <Link
                className="flex gap-x-3 items-center cursor-pointer mobile:hidden"
                href="/home"
            >
                <ChevronLeft color="#FB2A29" className="text-gradient" />
                <p className="text-lg text-muted-foreground">Назад</p>
            </Link>
            <Header session={session} className="w-full flex justify-center" />
        </nav>
    );
};
