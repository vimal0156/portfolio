import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'

export const metadata: Metadata = {
  title: 'Vimal Dhama - Quantitative Analyst | AI/ML Engineer',
  description: 'Portfolio of Vimal Dhama - Quantitative Analyst, Data Scientist, and AI/ML Engineer specializing in algorithmic trading, predictive modeling, and intelligent automation.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        {children}
          <Toaster 
            position="top-right"
            richColors
            theme="dark"
            toastOptions={{
              style: {
                background: 'rgba(39, 39, 42, 0.95)',
                border: '1px solid rgba(63, 63, 70, 0.5)',
                color: 'white',
              },
            }}
          />
      </body>
    </html>
  )
}
