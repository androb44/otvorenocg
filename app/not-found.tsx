import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-petrol">404</p>
      <h1 className="mt-2 text-2xl font-bold text-graphite">Ova stranica ne postoji</h1>
      <p className="mt-2 max-w-md text-sm text-slate">
        Objekat je možda uklonjen ili je adresa pogrešna. Probaj pretragu — vjerovatno je ono što tražiš na klik odavde.
      </p>
      <Link href="/pretraga" className="mt-6">
        <Button>Idi na pretragu</Button>
      </Link>
    </div>
  );
}
