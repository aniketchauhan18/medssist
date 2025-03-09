import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Toaster, toast } from 'sonner'

const geistSans = Geist({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Medssist",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <Toaster />
      <body className={`${geistSans.className} antialiased`}>{children}</body>
    </html>
  );
}
