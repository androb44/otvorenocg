import { Logo } from "@/components/shared/logo";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-cloud/60">
      <header className="flex h-14 items-center justify-between border-b border-line bg-paper px-4">
        <Logo />
        <Link href="/" className="text-sm font-medium text-slate hover:text-graphite">
          ← Nazad na sajt
        </Link>
      </header>
      <main className="flex flex-1 items-center justify-center px-4 py-10">{children}</main>
    </div>
  );
}
