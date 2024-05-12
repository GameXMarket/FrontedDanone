import type { Metadata } from "next";
import "../styles/globals.css";
import { QueryProvider } from "@/components/providers/query-provider";
import { ToastProvider } from "@/components/providers/toaster-provider";
import MySessionProvider from "@/components/providers/session-provider";
import localFont from "next/font/local";
import { NotificationProvider } from "@/components/providers/notification-provider";
import { Provider } from "jotai";

const gt = localFont({
    src: [
        {
            path: "../../public/fonts/GTEestiProDisplay-Light.woff2",
            weight: "300",
        },
        {
            path: "../../public/fonts/GTEestiProDisplay-Regular.woff2",
            weight: "400",
        },
        {
            path: "../../public/fonts/GTEestiProDisplay-Medium.woff2",
            weight: "500",
        },
        {
            path: "../../public/fonts/GTEestiProDisplay-Bold.woff2",
            weight: "700",
        },
    ],
});

export const metadata: Metadata = {
    title: "GameX market",
    description: "Best Marketplace",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={gt.className}>
                <QueryProvider>
                    <ToastProvider />
                    <MySessionProvider>
                        <Provider>
                            <NotificationProvider>
                                {children}
                            </NotificationProvider>
                        </Provider>
                    </MySessionProvider>
                </QueryProvider>
            </body>
        </html>
    );
}
