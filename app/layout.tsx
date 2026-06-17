// src/app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Web3Provider } from "@/components/providers/Web3Provider";

export const metadata: Metadata = {
  title: "GoalStake",
  description: "Retos con dinero usando MiniPay",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Web3Provider>
            <Navbar />
            {children}
          </Web3Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}