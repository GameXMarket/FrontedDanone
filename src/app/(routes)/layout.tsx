
import Header from '@/components/header/Header'
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
      <div className='w-full'>
        {children}
      </div>
      </main>
    </>

  )
}