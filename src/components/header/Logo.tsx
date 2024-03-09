'use client'

import Image from 'next/image'
import { useMediaQuery } from 'react-responsive'

const Logo = () => {
    const mobileRes = useMediaQuery({
        query: '(max-width:440px)'
    })

    return (
        <Image priority src='/logo.svg' width={mobileRes ? 137 : 210} height={mobileRes ? 26 : 32} alt="logo"/>
    )
}

export default Logo