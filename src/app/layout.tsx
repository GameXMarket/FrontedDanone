import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
import { QueryProvider } from '@/components/providers/query-provider'
import { ToastProvider } from '@/components/providers/toaster-provider'
import MySessionProvider from '@/components/providers/session-provider'
import { SessionProvider } from 'next-auth/react'
import { AppProps } from 'next/app'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GameX market',
  description: 'Best Marketplace',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <ToastProvider />
          <MySessionProvider>
            {children}
          </MySessionProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
