import Image from 'next/image'

const Logo = () => {
    return (
        <Image priority src='/logo.svg' width={210} height={32} alt="logo"/>
    )
}

export default Logo