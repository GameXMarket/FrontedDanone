"use client";

import { verifyLogin } from "@/actions/login";
import { AuthApiService } from "@/requests/auth/auth-service";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

const VerifyUserPage = () => {
    const searchParams = useSearchParams();
    const { push } = useRouter();

    // TODO: Finish this shit
    useEffect(() => {
        (async function () {
            if (searchParams.get("token")) {
                try {
                    const data = await AuthApiService.verifyUser(searchParams.get("token")!);
                    toast.success("Verified");
                    verifyLogin(data)
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
