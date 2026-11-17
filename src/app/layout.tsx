import type { Metadata } from "next";
import { Bricolage_Grotesque, Lato } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { QueryProvider } from "@/lib/query-provider";
import { Toaster } from "@/components/ui/toast";
import { RestoreSession } from "@/components/restore-session";


const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Voxunia",
  description: "Let your community ask, vote, and be heard. Host live Q&A sessions with real-time voting",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${lato.variable}`}>
      <body className={cn("font-lato antialiased")}>
        <QueryProvider>
          <RestoreSession/>
          <Toaster/>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
