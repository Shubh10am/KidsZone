'use client'

import { AppProvider } from '@/context/AppContext'
import SchoolManagementApp from '@/components/SchoolManagementApp'

export default function Home() {
  return (
    <AppProvider>
      <SchoolManagementApp />
    </AppProvider>
  )
}