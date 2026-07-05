import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://otvoreno.me"),
  title: {
    default: "OtvorenoCG — Da li radi sada?",
    template: "%s · OtvorenoCG"
  },
  description:
    "Radno vrijeme svih objekata u Crnoj Gori: apoteke, banke, prodavnice, pumpe, bolnice i još mnogo toga. Provjeri da li radi sada, do kada i gdje se nalazi."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sr-Latn-ME">
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  );
}
