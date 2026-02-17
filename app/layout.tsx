import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wattiva — DERMS for European Energy",
  description:
    "Wattiva aggregates EVs, batteries, heat pumps, and solar into one virtual power plant you control.",
  openGraph: {
    title: "Wattiva — DERMS for European Energy",
    description:
      "Your customers own the flexibility. We help you use it.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${archivo.variable} font-[family-name:var(--font-archivo)] antialiased`}>
        {children}
      </body>
    </html>
  );
}
