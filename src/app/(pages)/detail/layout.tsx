import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Property Details',
  description: 'View detailed information about properties',
}

export default function DetailLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
