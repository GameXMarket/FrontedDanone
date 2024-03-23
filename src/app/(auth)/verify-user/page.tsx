"use client";

import { AuthApiService } from "@/requests/auth/auth-service";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

const VerifyUserPage = () => {
    const searchParams = useSearchParams();
    const { push } = useRouter();

    useEffect(() => {
        (async function () {
            if (searchParams.get("token")) {
                try {
                    await AuthApiService.verifyUser(searchParams.get("token")!);
                    toast.success("Verified");
                    push("/login");
                } catch (e) {
                    toast.error("Smth Wrong");
                    push("/register");
                }
            }
            else{
                toast.error("Token not provided")
                push("/register")
            }
        })();
    }, []);

    return (
        <div className="w-full h-full flex items-center justify-center">
            <h1 className="text-5xl">Verifying...</h1>
        </div>
    );
};

export default VerifyUserPage;
