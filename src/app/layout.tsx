import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
import { QueryProvider } from '@/components/providers/query-provider'
import { ToastProvider } from '@/components/providers/toaster-provider'

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
              {children}
        </QueryProvider>
        {/*<div className="background_wave">
          <BackgroundWaveOne/>
        </div>*/}
      </body>
    </html>
  )
}

const BackgroundWaveOne = () => {
  return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={1920}
        height={473}
        viewBox="0 0 1920 473"
        fill="none"
      >
        <path
          opacity="0.32"
          d="M571.5 239.5C204.111 -296.889 -108.796 462.723 -86.7961 761.222H1940.2V132.222C1940.2 132.222 1929.95 -163.127 1557.2 132.222C1324 317 696.5 422 571.5 239.5Z"
          fill="url(#paint0_linear_1509_53)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_1509_53"
            x1="745.702"
            y1="-2.77599"
            x2="1625.7"
            y2="951.224"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#23242C" />
            <stop offset={1} stopColor="#191A21" />
          </linearGradient>
        </defs>
      </svg>
  )
}

const BackgroundWaveTwo = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={1920}
      height={393}
      viewBox="0 0 1920 393"
      fill="none"
    >
      <path
        opacity="0.32"
        d="M571.5 239.5C204.111 -296.889 -108.796 462.723 -86.7961 761.222H1940.2V132.222C1940.2 132.222 1929.95 -163.127 1557.2 132.222C1324 317 696.5 422 571.5 239.5Z"
        fill="url(#paint0_linear_1509_57)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1509_57"
          x1="745.702"
          y1="-2.77599"
          x2="1625.7"
          y2="951.224"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#23242C" />
          <stop offset={1} stopColor="#191A21" />
        </linearGradient>
      </defs>
    </svg>
  )
}