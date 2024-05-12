"use client";

import { verifyLogin } from "@/actions/login";
import { AuthApiService } from "@/requests/auth/auth-service";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
// import toast from "react-hot-toast";

const VerifyUserPage = () => {
    const searchParams = useSearchParams();
    const { push } = useRouter();

    const verify = async (token: string) => {
        try {
            const data = await AuthApiService.verifyUser(token);
            // toast.success("Verified");
            verifyLogin(data);
        } catch (err) {
            // toast.error("Smth Wrong");
            push("/register");
        }
    };

    useEffect(() => {
        const token = searchParams.get("token");
        if (token?.length) {
            verify(token);
        } else {
            // toast.error("Token not provided");
            push("/register");
        }
    }, [searchParams]);

    return (
        <div className="w-full h-full flex items-center justify-center">
            <h1 className="text-5xl">Verifying...</h1>
        </div>
    );
};

export default VerifyUserPage;
