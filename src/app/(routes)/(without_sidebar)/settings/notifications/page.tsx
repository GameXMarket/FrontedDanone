import Image from "next/image"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"

const NotificationsPage = () => {
    return(
        <div className="flex flex-col items-center gap-y-16 mobile:gap-y-12 mt-8">
            <p className="text-center text-3xl mobile:text-xl font-light leading-normal">Подключите уведомления от нашего Telagram-бота,<br/>чтоб оперативно получать уведомления о новых покупках.</p>
            <div className="flex items-center gap-x-8">
                <Image src="/ui-assets/telegram.svg" alt="tg" width={70} height={70} />
                <span className="text-3xl mobile:text-2xl">@GameX_Bot</span>
            </div>
            <Button variant="accent" size="lg" className="rounded-2xl text-lg py-6 px-8">Подключить</Button>
            <p className="text-center text-3xl mobile:text-xl font-light leading-normal">Включите уведомления напрямую от нашего сайта.<br/><span className="mobile:text-muted-foreground mobile:text-base">Мы уведомляем вас только о важных для вас событиях.</span></p>
            <div className="flex items-center gap-x-4">
                <Image src="/ui-assets/notification.svg" alt="nofification" width={40} height={40} />
                <p className="text-2xl mobile:text-2xl font-light">Push-уведомления</p>
                <Switch />
            </div>
        </div>
    )
}

export default NotificationsPage