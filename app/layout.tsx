import type { Metadata } from "next";
import "./globals.css";
import "./portal.css";
import "./topbar.css";
import "./home-v2.css";
import "./admin-events.css";
import "./home-events.css";
import "./results-enhanced.css";
import "./logo.css";
import "./content-features.css";

export const metadata: Metadata = {
  title: "Kids Academy | Eğitim & Aktivite Merkezi",
  description: "Osmaniye'de ödev takibi, konu anlatımı, okul öncesi etkinlik, yaz okulu ve atölye programları.",
  icons: {
    icon: "/kids-academy-logo.jpeg",
    shortcut: "/kids-academy-logo.jpeg",
    apple: "/kids-academy-logo.jpeg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="tr"><body>{children}</body></html>;
}
