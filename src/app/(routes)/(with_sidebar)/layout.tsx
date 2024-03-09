import Header from "@/components/header/Header";
import dynamic from "next/dynamic";
const Sidebar = dynamic(() => import("@/components/sidebar/Sidebar"), {ssr: false});

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="h-full flex flex-col pb-12">
            <Header />
            <main className="w-full flex mt-16 mobile:mt-8">
                <Sidebar />
                <div className="w-full">{children}</div>
            </main>
        </div>
    );
}
