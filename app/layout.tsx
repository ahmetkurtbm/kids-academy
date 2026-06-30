import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kids Academy | Oyun Evi & Aktivite Merkezi",
  description: "Merakla büyüyen, oyunla öğrenen çocuklar için güvenli ve neşeli bir dünya.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="tr"><body>{children}</body></html>;
}
