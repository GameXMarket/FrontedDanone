'use client'

import { useMediaQuery } from "react-responsive"
import { Navbar } from "./_components/navbar"
import { Button } from "@/components/ui/button"
import { logout } from "@/actions/logout"
import { LogoutIcon } from "./icons/icons"
import styles from './styles/navbar.module.css'

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
    const mobileRes = useMediaQuery({
        query: '(max-width: 768px)'
    })
    
    return(
        <div className="w-full">
            <div className="flex w-full mobile:flex-col mobile:items-center">
                <Navbar />
                <div className="w-[calc(100%-200px)] mobile:w-full">
                    {children}
                </div>
            </div>
            {mobileRes && (
                <div className="w-full flex items-center justify-center mt-12">
                <Button onClick={() => logout()} className={styles.button_mob}>
                    <p className="text-[20px] font-light">Выйти</p>
                    <div>
                        <LogoutIcon/>
                    </div>
                </Button>
                </div>                
            )}
        </div>
    )
}

export default SettingsLayout