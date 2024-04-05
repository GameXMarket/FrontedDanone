'use client'

import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form";
import { useSafeMutation } from "@/hooks/useSafeMutation";
import { cn, convertToBase64 } from "@/lib/utils";
import { AttachmentApiService } from "@/requests/attachment/attachment-service";
import Image from "next/image";
import { ChangeEvent, FC, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import styles from './change-avatar.module.css'
import { Input } from "@/components/ui/input";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuthQuery } from "@/hooks/useAuthQuery";
import { userService } from "@/requests/user/user.service";



const ChangeAvatar:FC = () => {
    const {data, error, isLoading} = useAuthQuery({
        queryKey: ['get user data'],
        queryFn: () => userService.getUser()
    })

    const {mutation} = useSafeMutation(AttachmentApiService.uploadFileUser, {
        onSuccess: () => {
            toast.success('Изменения применены')
        },
        onError: () => {
            toast.error('Что-то пошло не так!')
        }
    })

    const deleteAvatar = AttachmentApiService.removeUserAvatar // TODO:

    const [avatar, setAvatar] = useState<string>('')

    const form = useForm({
        defaultValues: {
            img: null
        }
    })  

    const uploadFileHandler = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files![0]
        const base64 = await convertToBase64(file)

        setAvatar(base64 as string)

    }

    if (data === null) {
        data.files = ['']
    }

    return (
        <>
        <form>
            <div className="flex items-center flex-col justify-center">
            <div  className="relative rounded-full w-[90px] h-[90px] mobile:mt-8">
                <Image src= {avatar || data?.files?.[0]} alt="profileImg" fill className="absolute object-cover rounded-full" />
                <div>
                <FormField
                    control={form.control}
                    name="img"
                    render={({ field: {onChange}, ...field }) => (
                        //@ts-ignore
                        <Input
                            title=""
                            disabled={mutation.isPending}
                            {...field}
                            onChange={(event: any) => {
                                const dataTransfer = new DataTransfer()
                                Array.from(event.target.files!).forEach((image: any) =>
                                dataTransfer.items.add(image)
                                );

                                const files = dataTransfer.files
                                onChange(files)
                                uploadFileHandler(event)
                                mutation.mutate({files})
                            }}
                            type="file"
                            placeholder=""
                            className={cn(styles.add_photo)}
                        />
                    )}
                />                   
                </div>    
                      
                
            </div>
            
            </div>                
        </form>
    </>
    )
}

export default ChangeAvatar