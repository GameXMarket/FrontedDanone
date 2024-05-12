import Image from 'next/image'

const Logo = () => {
    return (
        <Image className='w-[210px] h-[37px] mobile:w-[127px] mobile:h-[23px]' priority src='/logo.svg' width={210} height={32} alt="logo"/>
    )
}

export default Logo