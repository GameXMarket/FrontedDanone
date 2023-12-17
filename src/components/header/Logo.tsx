import Image from 'next/image'
import LogoIcon from '../../assets/logo.png'


const Logo = () => {
    return (
        <Image src={LogoIcon} alt="logo"/>
    )
}

export default Logo