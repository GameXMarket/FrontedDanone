'use client'

const Header = dynamic(() => import("@/components/header/Header"))
const Sidebar = dynamic(() => import("@/components/sidebar/Sidebar").then(mod => mod.Sidebar), {loading: () => <div className="w-[567px]"></div>})
const MobileSidebar = dynamic(() => import("@/components/sidebar/Sidebar").then(mod => mod.MobileSidebar), {loading: () => <div className="w-[567px]"></div>})
import { useSession } from "next-auth/react";
import { GlobalLoader } from "@/components/GlobalLoader";
import dynamic from "next/dynamic";
import { useMediaQuery } from "react-responsive";


export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {  
    const session = useSession()

    const mobileRes = useMediaQuery({
        query: "(max-width: 440px)",
    });

    return (
        <div className="h-full flex flex-col pb-12">
            <GlobalLoader session={session} />
            <Header session={session} />
            <main className="w-full flex mt-16 mobile:mt-8">
                {session.data?.user && (
                    mobileRes ? <MobileSidebar session={session} /> : <Sidebar session={session} />
                )}
                <div className="w-full">{children}</div>
            </main>
        </div>
    );
}
