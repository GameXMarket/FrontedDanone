"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";

function MySessionProvider({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider basePath={process.env.NEXTAUTH_URL}>
            {children}
        </SessionProvider>
    );
}

export default MySessionProvider;
