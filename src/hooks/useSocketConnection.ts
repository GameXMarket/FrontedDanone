import { useRef } from "react"
import { useCurrentUser } from "./useCurrentUser"

export const useSocketConnection = () => {
    const socket = useRef<WebSocket>()

    const user = useCurrentUser()
    socket.current = new WebSocket(`wss://test.yunikeil.ru/ws/chat/my?token=${user?.accessToken}`)

    return socket
}