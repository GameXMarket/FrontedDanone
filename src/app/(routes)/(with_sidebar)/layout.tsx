'use client'

import Header from "@/components/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {  
    const session = useCurrentUser()
    console.log(session)

    return (
        <div className="h-full flex flex-col pb-12">
            <Header />
            <main className="w-full flex mt-16 mobile:mt-8">
                {!session ? <></> : <Sidebar/>}
                <div className="w-full">{children}</div>
            </main>
        </div>
    );
}
