// Fichier : app/layout.tsx
import { Inter, Poppins } from 'next/font/google' // <-- MODIFIÉ
import type { ReactNode } from 'react'
import type { Metadata } from "next";
// @ts-ignore: allow importing global CSS without type declaration
import './globals.css'
import Footer from '@/components/Footer' 
import Landings from '@/components/Landings';

// ----- MODIFIÉ : Configuration des polices -----
// Police pour le corps
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter', // Crée une variable CSS
});

// Police pour les titres
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['600', '700', '800'], // Poids pour les titres
  variable: '--font-poppins', // Crée une variable CSS
});
// ---------------------------------------------

export const metadata = {
  title: 'Rental Web',
  description: 'Rent your Dream Car',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // ----- MODIFIÉ : Appliquer les variables à <html> -----
    <html lang="fr" className={`${inter.variable} ${poppins.variable} antialiased`}>
      {/* La classe 'antialiased' lisse la police.
        Le reste de la <body> gère la mise en page (footer en bas) 
      */}
      <body className="flex flex-col min-h-screen">
        
        <Landings />  
        
        <main className="flex-1">
          {children}
        </main>
        
        <Footer /> 
        
      </body>
    </html>
  )
}