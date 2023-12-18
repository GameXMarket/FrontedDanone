
import Header from '@/components/header/Header'
import '../../styles/globals.css'

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
    <Header/>
    <main >{children}</main>
    </>

  )
}