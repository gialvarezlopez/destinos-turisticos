import type { Metadata } from "next";
import { Amiko, ABeeZee } from "next/font/google";
import { TanStackProvider } from "@/components/provider/TanstackProvider";

import "./globals.css";

// Configuración de Amiko
const amiko = Amiko({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-amiko",
});

// Configuración de ABeeZee
const abeezee = ABeeZee({
  subsets: ["latin"],
  weight: ["400"], // ABeeZee solo tiene un peso disponible
  style: ["normal", "italic"],
  variable: "--font-abeezee",
});

export const metadata: Metadata = {
  title: "El Salvador",
  description: "Destinos turístico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${amiko.variable} ${abeezee.variable}`}>
      <body className="bg-[#F3F3F3] font-sans">
        <TanStackProvider>{children}</TanStackProvider>
      </body>
    </html>
  );
}
