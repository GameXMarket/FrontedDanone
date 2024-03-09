import { Input } from "@/components/ui/input";
import { FC } from "react";

const MessengerInput:FC = () => {
    return (
        <div>
            <Input id="message" className="text-white w-[480px] h-16 rounded-[24px]" placeholder="Сообщение"/>
        </div>
    )
}

export default MessengerInput;