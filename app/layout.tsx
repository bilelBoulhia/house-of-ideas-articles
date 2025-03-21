import { Space_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

const Spacemono = Space_Mono(
    {weight:'400',style:'normal',subsets:['latin']}
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={Spacemono.className} suppressHydrationWarning>
      <Analytics/>
      <body className="bg-background text-foreground">
      <ThemeProvider
          attribute="class"

          defaultTheme='dark'
          enableSystem
          disableTransitionOnChange
      >
          <main className="min-h-[100dvh] overflow-x-hidden flex flex-col  z-0 items-center">
              {children}
          </main>
      </ThemeProvider>
      </body>
    </html>
  );
}
