import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import NavBar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-commerce App",
  description: "E-commerce example app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={inter.className}>
          <Toaster />
          <NavBar></NavBar>
          <main >
            <div className="h-full w-full md:px-44 lg:px-52 py-12 bg-white">
              {children}
            </div>
            {/* <Footer></Footer> */}
          </main>

        </body>
      </html>
    </SessionProvider>
  );
}
