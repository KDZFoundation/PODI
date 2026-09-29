import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Sparkles, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Studio PODI - Druk na żądanie (Demonstracja)',
  description: 'Demonstracyjna platforma druku na żądanie: plakaty, kalendarze, fotoksiążki i kartki.',
};

export default function PodStudioPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 flex flex-col justify-between selection:bg-neutral-900 selection:text-white">
      {/* Pasek nawigacyjny */}
      <header className="w-full px-6 py-4 flex items-center justify-between border-b border-neutral-100 bg-white/90 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-mono text-neutral-500 hover:text-neutral-900 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-neutral-100 border border-neutral-200/80"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Powrót do PODI</span>
          </Link>

          <div className="h-4 w-px bg-neutral-200" />

          <div className="flex items-center gap-2">
            <span className="font-bold text-sm tracking-tight text-neutral-900">
              Studio PODI
            </span>
            <span className="text-[10px] font-mono uppercase tracking-wider bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded">
              Wersja demonstracyjna
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-sky-50 text-sky-700 border border-sky-200/70">
            <Sparkles className="w-3 h-3 text-sky-500" />
            Trasa techniczna /pod
          </span>
        </div>
      </header>

      {/* Główna sekcja szkieletu etapu 1 */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-16 max-w-3xl mx-auto w-full text-center">
        <div className="w-full bg-neutral-50 border border-neutral-200/90 rounded-2xl p-8 sm:p-10 shadow-xs flex flex-col items-center">
          
          <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white flex items-center justify-center font-mono font-bold text-base mb-5 shadow-sm">
            POD
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 mb-3">
            Studio PODI
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 max-w-xl leading-relaxed mb-6">
            Demonstracyjna platforma druku na żądanie. Nawigacja i struktura trasy{' '}
            <code className="bg-neutral-200/70 text-neutral-800 px-1.5 py-0.5 rounded font-mono text-xs">/pod</code>{' '}
            zostały poprawnie przygotowane technicznie w Etapie 1.
          </p>

          {/* Ostrzeżenie i status demonstracyjny */}
          <div className="w-full bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 flex items-start gap-3 text-left mb-6">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 leading-relaxed space-y-1">
              <p className="font-semibold">Status etapu technicznego:</p>
              <p>
                Docelowa warstwa wizualna (typografia, barwy, ilustracje PODI) zostanie wdrożona po udostępnieniu Brand Booka oraz plików graficznych (podi1.png–podi4.png).
              </p>
              <p className="text-amber-800">
                Prawdziwe płatności, wysyłki oraz realizacja zamówień nie są i nie będą wykonywane w wersji demonstracyjnej.
              </p>
            </div>
          </div>

          {/* Informacja o planowanym zakresie produktów */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full text-left font-mono">
            <div className="p-3 bg-white rounded-xl border border-neutral-200 text-xs">
              <div className="text-neutral-400 text-[10px]">PRODUKT 01</div>
              <div className="font-bold text-neutral-800 mt-1">Plakaty</div>
            </div>
            <div className="p-3 bg-white rounded-xl border border-neutral-200 text-xs">
              <div className="text-neutral-400 text-[10px]">PRODUKT 02</div>
              <div className="font-bold text-neutral-800 mt-1">Kalendarze</div>
            </div>
            <div className="p-3 bg-white rounded-xl border border-neutral-200 text-xs">
              <div className="text-neutral-400 text-[10px]">PRODUKT 03</div>
              <div className="font-bold text-neutral-800 mt-1">Fotoksiążki</div>
            </div>
            <div className="p-3 bg-white rounded-xl border border-neutral-200 text-xs">
              <div className="text-neutral-400 text-[10px]">PRODUKT 04</div>
              <div className="font-bold text-neutral-800 mt-1">Kartki</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stopka */}
      <footer className="w-full px-6 py-4 border-t border-neutral-100 bg-white text-xs text-neutral-400 flex flex-col sm:flex-row items-center justify-between gap-2 font-mono">
        <div>Studio PODI &middot; Wersja demonstracyjna (etap 1)</div>
        <div className="text-[11px] text-neutral-400">PLN &middot; InPost &middot; Orlen Paczka</div>
      </footer>
    </main>
  );
}
