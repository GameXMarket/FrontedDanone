import Image from "next/image"
import { ChangeNameForm } from "./_components/change-name-form"
import { currentUser } from "@/lib/auth"
import ChangeAvatar from "./_components/change-avatar"

const ProfilePage = async () => {
    return(
        <div className="flex flex-col items-center gap-y-8">
            <h1 className="text-4xl mobile:hidden">Изменить данные о себе</h1>
            <ChangeAvatar/>
            <ChangeNameForm />
        </div>
    )
}

export default ProfilePage