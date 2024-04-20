'use client'

import { useEffect, useRef } from "react";
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { useCurrentUser } from "@/hooks/useCurrentUser";
import toast from "react-hot-toast";
import { useSetAtom } from "jotai";
import { chatNotifAtom } from "@/atoms/chatAtom";
import { useQueryClient } from "@tanstack/react-query";

export const NotificationProvider = ({
    children
  }: {
    children: React.ReactNode;
  }) => {
    const controller = new AbortController()
    const { signal } = controller

    const queryClient = useQueryClient()

    const user = useCurrentUser()

    const setChatNotifAtom = useSetAtom(chatNotifAtom) // Временно?

    const establishSseNotifications = async (accessToken: string) => {
        await fetchEventSource("https://test.yunikeil.ru/users/me/listeners/notifications", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
            },
            async onopen() {
                // console.log("notification opened")
            },
            onmessage(e) {
                if(e.event === "new_chat"){
                    toast.success("С вами создали новый чат!", {icon: '✨', duration: 5000 })
                    setChatNotifAtom((prev) => prev+1)
                    queryClient.invalidateQueries({queryKey: ['get all chats']})
                }
                // console.log("sse message", e)
            },
            onclose() {
                // console.log("notification closed")
            },
            onerror(err) {
                console.log(err)
            },
            signal
        })
    }

    useEffect(() => {
        if(user){
            establishSseNotifications(user.accessToken)
        }
        return () => {
            controller.abort()
        }
      }, [user]);

    return(
        <>
        {children}
        </>
    )
}