import type { Metadata } from 'next'
import Header from '@/components/Header'
import './globals.css'

export const metadata: Metadata = {
  title: 'Energy Market',
  description: 'Energy Market Client Web',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <div className='px-12 pt-4'>
          {children}
        </div>
      </body>
    </html>
  )
}
