import { NoSidebarHeader } from "./_components/Header";
import { MobileSidebar } from "./_components/mobile-sidebar";

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="h-full flex flex-col pb-12 px-12 mobile:px-0">
            <NoSidebarHeader />
            <main className="w-full flex mt-16 mobile:mt-8">
                {children}
            </main>
            <footer className="hidden mobile:block">
                <MobileSidebar />
            </footer>
        </div>
    );
}
