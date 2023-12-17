import { FC, PropsWithChildren } from "react";
import styles from './layout.module.css'
import Header from "../header/Header";

const Layout:FC<PropsWithChildren> = ({children}) => {
    return (
        <> 
            <Header/>
            <main>
                {children}
            </main>
        </>
    )
}

export default Layout;