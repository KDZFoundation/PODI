'use client';

import { useState } from 'react';
import { POD_CATEGORIES, POD_PRODUCTS, PodProduct } from '@/lib/podData';
import ProductConfigModal from '@/components/ProductConfigModal';
import PodiRobot from '@/components/PodiRobot';
import {
  Printer,
  Sparkles,
  Zap,
  ShoppingBag,
  ArrowLeft,
  Search,
  CheckCircle2,
  Clock,
  Building,
  Phone,
  MapPin,
  Mail,
  Shield,
  Layers,
  HelpCircle,
} from 'lucide-react';
import { motion } from 'motion/react';

interface PodPlatformProps {
  onBackToAdvisor: () => void;
}

export default function PodPlatform({ onBackToAdvisor }: PodPlatformProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<PodProduct | null>(null);
  const [cartItemsCount, setCartItemsCount] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filtrowanie produktów po kategorii i wyszukiwaniu
  const filteredProducts = POD_PRODUCTS.filter((prod) => {
    const matchesCat = activeCategory === 'all' || prod.category === activeCategory;
    const matchesQuery =
      prod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const handleAddToCart = (orderItem: any) => {
    setCartItemsCount((prev) => prev + 1);
    setToastMessage(`Dodano do zamówienia: ${orderItem.productTitle} (${orderItem.quantity} szt.)`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-neutral-900 flex flex-col justify-between selection:bg-neutral-900 selection:text-white">
      {/* 1. TOP ANNOUNCEMENT BANNER */}
      <div className="bg-neutral-950 text-neutral-200 text-xs py-2 px-4 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <div className="flex items-center gap-2 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>POD Platforma: Druk od 1 sztuki bez magazynowania</span>
            <span className="hidden md:inline text-neutral-500">|</span>
            <span className="hidden md:inline text-neutral-400">
              Wzorce: Biuroserwis Elbląg &times; CEWE &times; Optimalprint
            </span>
          </div>
          <div className="flex items-center gap-4 text-neutral-400 text-[11px] font-mono">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-sky-400" />
              Punkt stacjonarny: Hetmańska 32, Elbląg
            </span>
            <span className="hidden sm:flex items-center gap-1">
              <Phone className="w-3 h-3 text-emerald-400" />
              55 232 45 67
            </span>
          </div>
        </div>
      </div>

      {/* 2. GŁÓWNA NAWIGACJA Z ROBOTEM PODI (KLIKNIĘCIE POWRACA DO DORADCY) */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-neutral-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          {/* Przycisk powrotu do PODI Doradcy wraz z małym robotem PODI */}
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToAdvisor}
              className="group flex items-center gap-3 p-1.5 pr-4 rounded-2xl bg-neutral-100 hover:bg-neutral-200/80 border border-neutral-200/90 transition-all cursor-pointer shadow-xs"
              title="Kliknij w robota PODI, aby wrócić do inteligentnego doradcy"
            >
              <div className="w-10 h-10 flex items-center justify-center -my-2 overflow-hidden pointer-events-none">
                <div className="scale-65 origin-center">
                  <PodiRobot isVisible={true} />
                </div>
              </div>
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1">
                  <ArrowLeft className="w-3 h-3 text-neutral-500 group-hover:-translate-x-0.5 transition-transform" />
                  <span className="text-xs font-bold font-mono text-neutral-900">
                    ROBOT PODI
                  </span>
                </div>
                <span className="text-[10px] text-neutral-500 font-mono">
                  Wróć do Doradcy &larr;
                </span>
              </div>
            </button>

            <div className="h-6 w-px bg-neutral-200 hidden sm:block" />

            <div className="hidden sm:flex flex-col">
              <span className="font-bold text-base tracking-tight text-neutral-900 leading-tight">
                Druk na Żądanie (POD)
              </span>
              <span className="text-[11px] text-neutral-500 font-mono">
                Centrum poligrafii cyfrowej & fotousług
              </span>
            </div>
          </div>

          {/* Pasek wyszukiwania */}
          <div className="hidden md:flex flex-1 max-w-md mx-4 relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Szukaj: wizytówki, kubki, fotoksiążka, kalendarz, pieczątki..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-neutral-100/80 border border-neutral-200 rounded-xl text-xs font-sans focus:bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900 transition-all"
            />
          </div>

          {/* Koszyk i szybki kontakt */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (filteredProducts[0]) setSelectedProduct(filteredProducts[0]);
              }}
              className="px-3.5 py-2 rounded-xl bg-neutral-900 text-white text-xs font-medium hover:bg-neutral-800 transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Zap className="w-3.5 h-3.5 text-yellow-400" />
              <span className="hidden sm:inline">Szybka wycena</span>
            </button>

            <div className="relative">
              <button
                className="p-2.5 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 transition-colors flex items-center justify-center cursor-pointer"
                title="Twoje zamówienia"
              >
                <ShoppingBag className="w-4 h-4" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-sky-500 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                    {cartItemsCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Wyszukiwarka na telefonach */}
        <div className="md:hidden px-4 pb-3">
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Szukaj produktów POD..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-neutral-100 border border-neutral-200 rounded-xl text-xs"
            />
          </div>
        </div>
      </header>

      {/* 3. HERO BANNER - WZÓR OPTIMALPRINT & BIUROSERWIS */}
      <section className="bg-gradient-to-b from-white via-sky-50/30 to-[#fafafa] border-b border-neutral-200/60 py-10 sm:py-14 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-mono font-medium">
                <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                <span>Nowoczesna Drukarnia Cyfrowa & POD w Elblągu</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight">
                Druk na żądanie od 1 sztuki.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-indigo-600 to-neutral-800">
                  Bez magazynu, bez ryzyka, z natychmiastową wyceną.
                </span>
              </h1>
              <p className="text-neutral-600 text-sm sm:text-base max-w-2xl leading-relaxed">
                Połączyliśmy 35 lat doświadczenia elbląskiego Biuroserwisu z technologią
                czołowych platform POD (Optimalprint, CEWE, Colorland). Konfiguruj nakłady,
                wybieraj papiery, wgrywaj pliki i zamawiaj z ekspresową dostawą lub odbiorem
                osobistym.
              </p>

              {/* USP kluczowe wyróżniki */}
              <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-white rounded-xl border border-neutral-200/80 shadow-2xs">
                  <div className="font-bold text-neutral-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Nakład od 1 szt.
                  </div>
                  <div className="text-[11px] text-neutral-500 mt-0.5">Brak minimalnych limitów</div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-neutral-200/80 shadow-2xs">
                  <div className="font-bold text-neutral-900 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-sky-500" />
                    Wysyłka 24-48h
                  </div>
                  <div className="text-[11px] text-neutral-500 mt-0.5">Lub odbiór w 1h (pieczątki)</div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-neutral-200/80 shadow-2xs">
                  <div className="font-bold text-neutral-900 flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-indigo-500" />
                    Gwarancja jakości
                  </div>
                  <div className="text-[11px] text-neutral-500 mt-0.5">Weryfikacja plików CMYK</div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-neutral-200/80 shadow-2xs">
                  <div className="font-bold text-neutral-900 flex items-center gap-1.5">
                    <Building className="w-4 h-4 text-amber-500" />
                    Odbiór Elbląg
                  </div>
                  <div className="text-[11px] text-neutral-500 mt-0.5">Hetmańska 32 (bez opłat)</div>
                </div>
              </div>
            </div>

            {/* Karta asystenta PODI */}
            <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-sky-100 rounded-bl-full -z-0 opacity-60" />
              <div className="relative z-10 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 flex items-center justify-center">
                    <div className="scale-75 origin-center">
                      <PodiRobot isVisible={true} />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-neutral-900">PODI Asystent</h3>
                    <p className="text-xs text-neutral-500">Zawsze możesz do mnie wrócić!</p>
                  </div>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed bg-neutral-50 p-3 rounded-xl border border-neutral-100">
                  „Kliknij w dowolny produkt poniżej, aby otworzyć kalkulator cen, sprawdzić
                  koszt nakładu od 1 do tysięcy sztuk oraz wgrać swój plik do druku!”
                </p>
                <button
                  onClick={onBackToAdvisor}
                  className="w-full py-2 px-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold rounded-xl transition-colors font-mono"
                >
                  &larr; Zadaj pytanie PODI
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. NAWIGACJA PO KATEGORIACH (TABS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-4 w-full">
        <div className="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-neutral-200">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {POD_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-neutral-900 text-white shadow-sm'
                    : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200/80'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="text-xs text-neutral-500 font-mono">
            Znaleziono: {filteredProducts.length} pozycji
          </div>
        </div>
      </section>

      {/* 5. SIATKA PRODUKTÓW POD Z WYCENĄ I KALKULATOREM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full flex-1">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-neutral-200">
            <p className="text-neutral-500 text-sm">Nie znaleziono produktów dla podanych kryteriów.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="mt-3 px-4 py-2 bg-neutral-900 text-white rounded-xl text-xs font-medium"
            >
              Wyczyść filtry
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((prod) => (
              <motion.div
                key={prod.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.15 }}
                className="bg-white rounded-2xl border border-neutral-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
              >
                {/* Górna część karty */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <span className="text-4xl p-3 bg-neutral-50 rounded-2xl border border-neutral-100 group-hover:scale-105 transition-transform">
                      {prod.imageEmoji}
                    </span>
                    <div className="flex flex-col items-end gap-1.5">
                      {prod.badge && (
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full">
                          {prod.badge}
                        </span>
                      )}
                      <span className="text-[11px] font-mono text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded">
                        od {prod.fromPrice} zł
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-sky-600">
                    {prod.categoryLabel}
                  </span>
                  <h3 className="font-bold text-lg text-neutral-900 mt-1 group-hover:text-sky-700 transition-colors">
                    {prod.title}
                  </h3>
                  <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                    {prod.tagline}
                  </p>

                  {/* Specyfikacja w pigułce */}
                  <div className="mt-4 pt-4 border-t border-neutral-100 space-y-1.5">
                    {prod.specs.slice(0, 2).map((spec, i) => (
                      <div key={i} className="text-[11px] text-neutral-500 flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-neutral-400" />
                        <span className="truncate">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dolna belka akcji z czasem i przyciskiem konfiguracji */}
                <div className="p-4 bg-neutral-50/70 border-t border-neutral-100 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-mono">
                    <Clock className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Realizacja: {prod.leadTime}</span>
                  </div>

                  <button
                    onClick={() => setSelectedProduct(prod)}
                    className="px-3.5 py-2 bg-neutral-900 hover:bg-neutral-800 active:bg-black text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                    <span>Konfiguruj & Wycena</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* 6. MODAL KONFIGURATORA / KALKULATORA */}
      <ProductConfigModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* 7. TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-neutral-800 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-mono">{toastMessage}</span>
        </div>
      )}

      {/* 8. STOPKA BIUROSERWIS POD */}
      <footer className="mt-16 bg-neutral-950 text-neutral-400 text-xs border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-base mb-3">
              <span className="w-7 h-7 rounded-lg bg-sky-500 text-white flex items-center justify-center text-xs font-mono">
                POD
              </span>
              <span>Biuroserwis Elbląg &times; POD</span>
            </div>
            <p className="text-neutral-400 leading-relaxed text-[11px]">
              Kompleksowa obsługa firm, instytucji i klientów indywidualnych od 1990 roku.
              Nowoczesny druk cyfrowy na żądanie (Print on Demand), artykuły biurowe, pieczątki i foto-usługi.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white font-mono text-xs uppercase tracking-wider mb-3">
              Kategorie POD
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li>Fotoksiążki i kalendarze (CEWE standard)</li>
              <li>Wizytówki i teczki firmowe</li>
              <li>Kubki i odzież z nadrukiem (DTG)</li>
              <li>Pieczątki laserowe w 1h (Trodat)</li>
              <li>Oprawa prac dyplomowych i bindowanie</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white font-mono text-xs uppercase tracking-wider mb-3">
              Kontakt & Odbiór
            </h4>
            <div className="space-y-2 text-[11px]">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>ul. Hetmańska 32, 82-300 Elbląg</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>55 232 45 67 / 601 234 567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                <span>biuroserwis@elblag.pl</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white font-mono text-xs uppercase tracking-wider mb-3">
              Asystent PODI
            </h4>
            <p className="text-[11px] text-neutral-400 leading-relaxed mb-3">
              Nie wiesz, jaki papier lub format wybrać? Porozmawiaj z małym inteligentnym doradcą PODI.
            </p>
            <button
              onClick={onBackToAdvisor}
              className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-xs font-mono flex items-center gap-2 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Przełącz do widoku PODI</span>
            </button>
          </div>
        </div>

        <div className="border-t border-neutral-900 py-4 px-4 text-center text-[10px] text-neutral-500 font-mono">
          &copy; 1990-2026 Biuroserwis Elbląg &middot; Wszelkie prawa zastrzeżone &middot; Technologia Print On Demand
        </div>
      </footer>
    </div>
  );
}
