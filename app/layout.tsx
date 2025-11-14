import { Inter } from 'next/font/google'
import type { ReactNode } from 'react'
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// @ts-ignore: allow importing global CSS without type declaration
import './globals.css'
//import Navbar from '@/components/Navbar' // (Vous aurez probablement aussi une Navbar)
import Footer from '@/components/Footer' // <-- 1. IMPORTEZ VOTRE FOOTER
import Landings from '@/components/Landings';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Rental Web',
  description: 'Rent your Dream Car',
}
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      {/*
        CHANGEMENTS ICI :
        1. flex: Transforme <body> en conteneur flex
        2. flex-col: Ordonne les enfants verticalement
        3. min-h-screen: Force <body> à faire AU MOINS la hauteur de l'écran
      */}
      <body className={`${inter.className} ${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        
        <Landings />  {/* Vous ajouterez votre Navbar ici */}
        
        {/*
          CHANGEMENT ICI :
          1. flex-1: Dit à <main> de "grandir" et de prendre tout l'espace disponible
        */}
        <main className="flex-1">
          {children}
        </main>
        
        <Footer /> {/* <-- Votre Footer sera maintenant "poussé" en bas */}
        
      </body>
    </html>
  )
}