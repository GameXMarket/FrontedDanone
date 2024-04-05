'use client'

import { Avatar } from "@/components/Avatar";
import Modal from "@/components/sidebar/modal";
import { useAuthQuery } from "@/hooks/useAuthQuery";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useOutside } from "@/hooks/useOutside";
import { currentUser } from "@/lib/auth";
import { userService } from "@/requests/user/user.service";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export const UserInfo = () => {
    const {data, error, isLoading} = useAuthQuery({
        queryKey: ['Get main user data'],
        queryFn: () => userService.getUser()
    })


    const {isShow, setIsShow, ref} = useOutside(false)

    return (
        <div className="flex flex-col items-center gap-y-6">
            <div className="flex gap-x-6 items-center">
                <Avatar size={80} src={data?.files?.[0]}/>
                <div>
                    <p className="text-3xl">{data?.username}</p>
                    <div className="flex items-center gap-x-1">
                        <span className="text-muted-foreground text-lg mr-1">Оценка:</span>
                        {Array.from({length: 5}, (_, idx) => <Image key={idx} src='/images/main/star.svg' alt="star" width={16} height={16} />)}
                        <span>5.0</span>
                    </div>
                </div>
            </div>
            <div  onClick={() => setIsShow(!isShow)} className="rounded-full bg-[#FB2A29] bg-opacity-5 px-6 py-4 flex items-center gap-x-3 cursor-pointer hover:bg-opacity-10 transition">
                <Image src="/profile-assets/empty-wallet.svg" alt="wallet" width={25} height={25} />
                <span className="text-lg leading-4">19,221.01₽</span>
            </div>
            {isShow && <Modal isShow={isShow} reference={ref} setIsShow={setIsShow}/>}
        </div>

    );
};
