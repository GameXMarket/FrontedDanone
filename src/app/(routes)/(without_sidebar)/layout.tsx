import { cn } from "@/lib/utils";
import { NoSidebarHeader } from "./_components/Header";
import { UserInfo } from "./user/_components/user-info";
import { Navbar } from "./user/_components/navbar";

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="h-full flex flex-col pb-12 px-12">
            <NoSidebarHeader />
            <main className="w-full flex mt-16">
                {children}
            </main>
        </div>
    );
}
