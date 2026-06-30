import type { Metadata } from "next";
import "./globals.css";
import "./portal.css";
import "./topbar.css";
import "./home-v2.css";
import "./admin-events.css";
import "./home-events.css";
import "./results-enhanced.css";

export const metadata: Metadata = {
  title: "Kids Academy | Eğitim & Aktivite Merkezi",
  description: "Osmaniye'de ödev takibi, konu anlatımı, jimnastik, yaz okulu ve atölye programları.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="tr"><body>{children}</body></html>;
}
