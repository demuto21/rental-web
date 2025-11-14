import './globals.css'

export const metadata = {
  title: 'Agence Satisfaite',
  description: 'Découvrez les avis de nos clients',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
