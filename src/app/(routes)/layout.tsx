
import Header from '@/components/header/Header'
import '../../styles/globals.css'
import Sidebar from '@/components/sidebar/Sidebar'

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
    <Header/>
    <main className='w-full flex'>
      <Sidebar/>
      <div>
        {children}
      </div>
      </main>
    </>

  )
}