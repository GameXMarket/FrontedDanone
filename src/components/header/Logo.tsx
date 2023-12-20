import Image from 'next/image'

const Logo = () => {
    return (
        <Image src='/logo.svg' width={210} height={32} alt="logo"/>
    )
}

export default Logo