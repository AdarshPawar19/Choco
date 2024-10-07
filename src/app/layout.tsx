import type { Metadata } from "next";
import {Inter as FontSans} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { QueryClient  } from '@tanstack/react-query'
import { QueryProvider } from "@/providers/queryProvider";
const fontSans=FontSans({
  subsets:["latin"],
  variable:"--font-sans"
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn('min-h-screen bg-background font-sans antialiased',fontSans.variable)}
      >
        <QueryProvider>
        {children}
        </QueryProvider>
        
      </body>
    </html>
  );
}
