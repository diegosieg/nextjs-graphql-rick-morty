import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Box } from "@chakra-ui/react";
import { Providers } from "./providers";
import Navbar from "@/components/NavBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rick and Morty Lover's App",
  description:
    "Experimental project to display content for Rick and Morty Lovers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          <Box minH="100vh">
            <Navbar />
            <Box as="main" p={4}>
              {children}
            </Box>
          </Box>
        </Providers>
      </body>
    </html>
  );
}
