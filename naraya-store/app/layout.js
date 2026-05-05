// app/layout.js
import './globals.css'

export const metadata = {
  title: 'Naraya Store',
  description: 'Tugas Fullstack Bootcamp - Filter, Load More, Skeleton',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* Tambahkan suppressHydrationWarning di sini */}
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  )
}