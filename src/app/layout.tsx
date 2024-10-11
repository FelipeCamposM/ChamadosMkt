import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
// import Link from "next/link";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "R3 Chamados Marketing",
  description: "Aplicação de chamados para o Marketing R3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex flex-col min-h-screen">
          {children}
        </div>
        {/* <div className="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
              <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                © 2024 
                <Link href="https://r3suprimentos.com.br/" target="_blank" className="hover:underline">
                  R3 Suprimentos™
                </Link>.
                All Rights Reserved.
            </span>
              <div className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                  <div>
                    <Link href="https://r3suprimentos.com/" target="_blank" className="hover:underline me-4 md:me-6">Sobre</Link>
                  </div>
              </div>
            </div>
        </div> */}
      </body>
    </html>
  );
}
