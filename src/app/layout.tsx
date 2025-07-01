import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "KID'S ZONE ACADEMY - School Management System",
  description: 'Complete school management system for students, teachers, attendance, and invoices',
  keywords: 'school management, education, students, teachers, attendance, invoices',
  authors: [{ name: "KID'S ZONE ACADEMY" }],
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/Kid-Zone Logo.png',
    shortcut: '/Kid-Zone Logo.png',
    apple: '/Kid-Zone Logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={poppins.className}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className={`${poppins.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}