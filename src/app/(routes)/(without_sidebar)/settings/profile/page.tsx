import Image from "next/image"
import { ChangeNameForm } from "./_components/change-name-form"
import { currentUser } from "@/lib/auth"

const ProfilePage = async () => {
    
    const user = await currentUser()

    return(
        <div className="flex flex-col items-center gap-y-8">
            <h1 className="text-4xl mobile:hidden">Изменить данные о себе</h1>
            <div className="relative rounded-full w-[90px] h-[90px] mobile:mt-8"><Image src='/images/temp_main/diablo.png' alt="profileImg" fill className="absolute object-cover rounded-full" /></div>
            <ChangeNameForm user={user} />
        </div>
    )
}

export default ProfilePage