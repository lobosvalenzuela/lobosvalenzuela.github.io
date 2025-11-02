import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";                  // aquí ya importas bootstrap.css (como acordamos)
import BootstrapClient from "./bootstrap-client";
import Navbar from "./navbar";
import "./globals.css";




const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "El Italiano",
  description: "Auténtica comida italiana",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Habilita JS de Bootstrap */}
        <BootstrapClient />
        {/* Navbar fija para todas las páginas */}
        <Navbar />
        {/* Contenido de cada página */}
        {children}
      </body>
    </html>
  );
}
