import Header from "@/components/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="h-full flex flex-col pb-12">
            <Header />
            <main className="w-full flex mt-12">
                <Sidebar />
                <div className="w-full">{children}</div>
            </main>
        </div>
    );
}
