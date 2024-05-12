import { useRef, useEffect,  } from "react";

export const useChatScrollDown = (deps: {}[]) => {
    const chatScroll = useRef<any>()

    useEffect(() => {
        if (chatScroll.current) {
            chatScroll.current.scrollTop = chatScroll.current.scrollHeight
        }
    }, [deps])
}