import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KHAN BARBERSHOP | Барбершоп в Жезказгане",
  description: "Мужские стрижки, бритьё и уход за бородой. г. Жезказган, ул. Сейфуллина 53А, 2 этаж.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
    >
      <body className="bg-zinc-950 text-white antialiased">{children}</body>
    </html>
  );
}
