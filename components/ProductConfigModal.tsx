'use client';

import { useState } from 'react';
import { PodProduct } from '@/lib/podData';
import {
  X,
  UploadCloud,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Truck,
  Sparkles,
  Info,
  ChevronRight,
  FileCheck,
} from 'lucide-react';
import { motion } from 'motion/react';

interface ProductConfigModalProps {
  product: PodProduct | null;
  onClose: () => void;
  onAddToCart?: (orderItem: any) => void;
}

// Komponent wewnętrzny montowany tylko gdy produkt istnieje (eliminuje useEffect i setState-in-effect)
function ProductConfigContent({
  product,
  onClose,
  onAddToCart,
}: {
  product: PodProduct;
  onClose: () => void;
  onAddToCart?: (orderItem: any) => void;
}) {
  const [selectedFormatId, setSelectedFormatId] = useState(
    product.config.formats[0]?.id || ''
  );
  const [selectedPaperId, setSelectedPaperId] = useState(
    product.config.papers[0]?.id || ''
  );
  const [selectedFinishId, setSelectedFinishId] = useState(
    product.config.finishes[0]?.id || ''
  );
  const [quantity, setQuantity] = useState(product.config.defaultQuantity);
  const [fileUploaded, setFileUploaded] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'kalkulator' | 'plik' | 'szczegoly'>('kalkulator');
  const [isSuccessNotification, setIsSuccessNotification] = useState(false);

  // Wyliczanie ceny w czasie rzeczywistym
  const selectedFormat = product.config.formats.find((f) => f.id === selectedFormatId);
  const selectedPaper = product.config.papers.find((p) => p.id === selectedPaperId);
  const selectedFinish = product.config.finishes.find((f) => f.id === selectedFinishId);

  const deltaFormat = selectedFormat?.priceDelta || 0;
  const deltaPaper = selectedPaper?.priceDelta || 0;
  const deltaFinish = selectedFinish?.priceDelta || 0;

  // Rabat nakładowy: przy nakładzie > defaultQuantity obniżka za sztukę
  const quantityMultiplier =
    quantity > product.config.defaultQuantity
      ? Math.max(0.65, 1 - (Math.log10(quantity / product.config.defaultQuantity) * product.config.bulkDiscountStep))
      : 1;

  const unitBase = product.config.basePricePerUnit + deltaFormat + deltaPaper + deltaFinish;
  const unitPriceNetto = Math.max(0.2, unitBase * quantityMultiplier);
  const totalNetto = unitPriceNetto * quantity;
  const totalBrutto = totalNetto * 1.23;

  const handleFileUploadSim = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileUploaded(e.target.files[0].name);
    }
  };

  const handleOrder = () => {
    const orderData = {
      productTitle: product.title,
      quantity,
      format: selectedFormat?.name,
      paper: selectedPaper?.name,
      finish: selectedFinish?.name,
      totalBrutto: totalBrutto.toFixed(2),
      fileName: fileUploaded,
    };

    if (onAddToCart) {
      onAddToCart(orderData);
    }

    setIsSuccessNotification(true);
    setTimeout(() => {
      setIsSuccessNotification(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-neutral-950/70 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 12 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-neutral-200 my-auto"
      >
        {/* Górna belka modalna */}
        <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/70">
          <div className="flex items-center gap-3">
            <span className="text-2xl p-2 rounded-xl bg-white shadow-sm border border-neutral-200/80">
              {product.imageEmoji}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-mono tracking-wider font-semibold text-sky-600 bg-sky-50 px-2 py-0.5 rounded">
                  {product.categoryLabel}
                </span>
                {product.badge && (
                  <span className="text-xs uppercase font-mono tracking-wider font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {product.badge}
                  </span>
                )}
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-neutral-900 leading-tight mt-0.5">
                {product.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 transition-colors"
            title="Zamknij"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Zakładki */}
        <div className="flex border-b border-neutral-200 px-6 gap-6 text-sm font-medium text-neutral-500 bg-white">
          <button
            onClick={() => setActiveTab('kalkulator')}
            className={`py-3 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'kalkulator'
                ? 'border-neutral-900 text-neutral-900 font-semibold'
                : 'border-transparent hover:text-neutral-900'
            }`}
          >
            <Sparkles className="w-4 h-4 text-sky-500" />
            Konfigurator & Wycena
          </button>
          <button
            onClick={() => setActiveTab('plik')}
            className={`py-3 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'plik'
                ? 'border-neutral-900 text-neutral-900 font-semibold'
                : 'border-transparent hover:text-neutral-900'
            }`}
          >
            <UploadCloud className="w-4 h-4 text-emerald-500" />
            Wgraj plik do druku {fileUploaded && '✓'}
          </button>
          <button
            onClick={() => setActiveTab('szczegoly')}
            className={`py-3 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'szczegoly'
                ? 'border-neutral-900 text-neutral-900 font-semibold'
                : 'border-transparent hover:text-neutral-900'
            }`}
          >
            <Info className="w-4 h-4 text-neutral-400" />
            Specyfikacja & Makietki
          </button>
        </div>

        {/* Główna treść */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {activeTab === 'kalkulator' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Lewa kolumna: Konfiguracja opcji */}
              <div className="lg:col-span-7 space-y-6">
                {/* 1. Format */}
                <div>
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 mb-2 block">
                    1. Wybierz format / wymiar:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {product.config.formats.map((fmt) => (
                      <button
                        key={fmt.id}
                        type="button"
                        onClick={() => setSelectedFormatId(fmt.id)}
                        className={`p-3 text-left rounded-xl border text-sm transition-all cursor-pointer ${
                          selectedFormatId === fmt.id
                            ? 'border-neutral-900 bg-neutral-900 text-white shadow-sm'
                            : 'border-neutral-200 hover:border-neutral-300 text-neutral-800 bg-neutral-50/50'
                        }`}
                      >
                        <div className="font-medium">{fmt.name}</div>
                        {fmt.priceDelta !== 0 && (
                          <div
                            className={`text-xs mt-0.5 ${
                              selectedFormatId === fmt.id
                                ? 'text-neutral-300'
                                : 'text-neutral-500'
                            }`}
                          >
                            {fmt.priceDelta > 0 ? `+${fmt.priceDelta} zł` : `${fmt.priceDelta} zł`}
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Podłoże / Papier / Kolor */}
                <div>
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 mb-2 block">
                    2. Wybierz rodzaj papieru / materiał:
                  </label>
                  <div className="space-y-2">
                    {product.config.papers.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setSelectedPaperId(p.id)}
                        className={`w-full p-3 text-left rounded-xl border text-sm flex items-center justify-between transition-all cursor-pointer ${
                          selectedPaperId === p.id
                            ? 'border-neutral-900 bg-neutral-900 text-white shadow-sm'
                            : 'border-neutral-200 hover:border-neutral-300 text-neutral-800 bg-neutral-50/50'
                        }`}
                      >
                        <span className="font-medium">{p.name}</span>
                        {p.priceDelta !== 0 && (
                          <span
                            className={`text-xs font-mono ${
                              selectedPaperId === p.id
                                ? 'text-neutral-300'
                                : 'text-neutral-500'
                            }`}
                          >
                            {p.priceDelta > 0 ? `+${p.priceDelta} zł` : `${p.priceDelta} zł`}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Uszlachetnienie / Oprawa */}
                <div>
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 mb-2 block">
                    3. Uszlachetnienie / Wykończenie:
                  </label>
                  <div className="space-y-2">
                    {product.config.finishes.map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setSelectedFinishId(f.id)}
                        className={`w-full p-3 text-left rounded-xl border text-sm flex items-center justify-between transition-all cursor-pointer ${
                          selectedFinishId === f.id
                            ? 'border-neutral-900 bg-neutral-900 text-white shadow-sm'
                            : 'border-neutral-200 hover:border-neutral-300 text-neutral-800 bg-neutral-50/50'
                        }`}
                      >
                        <span className="font-medium">{f.name}</span>
                        {f.priceDelta !== 0 && (
                          <span
                            className={`text-xs font-mono ${
                              selectedFinishId === f.id
                                ? 'text-neutral-300'
                                : 'text-neutral-500'
                            }`}
                          >
                            {f.priceDelta > 0 ? `+${f.priceDelta} zł` : `${f.priceDelta} zł`}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Nakład */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500">
                      4. Nakład (Sztuki):
                    </label>
                    <span className="text-xs text-sky-700 bg-sky-50 px-2 py-0.5 rounded font-mono">
                      POD: Druk od {product.config.minQuantity} szt.
                    </span>
                  </div>

                  {/* Szybkie przyciski nakładów */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {[
                      product.config.minQuantity,
                      product.config.defaultQuantity,
                      product.config.defaultQuantity * 2,
                      product.config.defaultQuantity * 5,
                      product.config.defaultQuantity * 10,
                    ]
                      .filter((val, idx, self) => self.indexOf(val) === idx && val >= product.config.minQuantity)
                      .slice(0, 5)
                      .map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setQuantity(val)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all cursor-pointer ${
                            quantity === val
                              ? 'bg-neutral-900 text-white border-neutral-900 font-bold'
                              : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
                          }`}
                        >
                          {val} szt.
                        </button>
                      ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min={product.config.minQuantity}
                      max={product.config.defaultQuantity * 10}
                      step={product.config.minQuantity === 1 ? 1 : 10}
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(product.config.minQuantity, Number(e.target.value)))}
                      className="flex-1 accent-neutral-900 cursor-pointer"
                    />
                    <div className="w-24">
                      <input
                        type="number"
                        min={product.config.minQuantity}
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(product.config.minQuantity, Number(e.target.value)))}
                        className="w-full px-3 py-1.5 border border-neutral-300 rounded-lg text-sm font-mono text-center font-bold focus:ring-1 focus:ring-neutral-900 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Prawa kolumna: Podsumowanie kalkulatora cen */}
              <div className="lg:col-span-5 flex flex-col justify-between p-5 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-6">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                    <h3 className="font-bold text-neutral-900 text-sm font-mono uppercase tracking-wider">
                      Podsumowanie wyceny
                    </h3>
                    <span className="text-xs text-emerald-600 font-mono flex items-center gap-1 font-semibold">
                      <Clock className="w-3.5 h-3.5" />
                      Wysyłka: {product.leadTime}
                    </span>
                  </div>

                  <div className="mt-4 space-y-2.5 text-xs text-neutral-600">
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Produkt:</span>
                      <span className="font-medium text-neutral-900 text-right">{product.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Format:</span>
                      <span className="font-medium text-neutral-900">{selectedFormat?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Podłoże:</span>
                      <span className="font-medium text-neutral-900 truncate max-w-[180px]">
                        {selectedPaper?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Wykończenie:</span>
                      <span className="font-medium text-neutral-900 truncate max-w-[180px]">
                        {selectedFinish?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Ilość:</span>
                      <span className="font-bold font-mono text-neutral-900">{quantity} sztuk</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Cena za sztukę netto:</span>
                      <span className="font-mono text-neutral-900">{unitPriceNetto.toFixed(2)} zł/szt.</span>
                    </div>

                    {fileUploaded ? (
                      <div className="mt-2 p-2 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2 text-emerald-800 text-xs">
                        <FileCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="truncate font-mono">Załączono: {fileUploaded}</span>
                      </div>
                    ) : (
                      <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded-lg flex items-center gap-2 text-amber-800 text-xs">
                        <Info className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>Plik możesz wgrać teraz lub dosłać po zamówieniu.</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-200 space-y-4">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <div className="text-xs text-neutral-500">Wartość brutto z VAT 23%:</div>
                      <div className="text-2xl font-black text-neutral-900 font-mono tracking-tight">
                        {totalBrutto.toFixed(2)} zł
                      </div>
                    </div>
                    <div className="text-right text-xs text-neutral-500 font-mono">
                      netto: {totalNetto.toFixed(2)} zł
                    </div>
                  </div>

                  <button
                    onClick={handleOrder}
                    disabled={isSuccessNotification}
                    className="w-full py-3.5 px-4 bg-neutral-900 hover:bg-neutral-800 active:bg-black text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                  >
                    {isSuccessNotification ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        Dodano do zamówień POD!
                      </>
                    ) : (
                      <>
                        <span>Złóż zamówienie / Zamów próbkę</span>
                        <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="grid grid-cols-2 gap-2 text-[11px] text-neutral-500 pt-1 border-t border-neutral-200/60 font-mono">
                    <span className="flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5 text-neutral-400" />
                      Wysyłka lub odbiór Elbląg
                    </span>
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
                      Gwarancja jakości 100%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'plik' && (
            <div className="space-y-6 max-w-2xl mx-auto py-4">
              <div className="border-2 border-dashed border-neutral-300 rounded-2xl p-8 text-center bg-neutral-50/60 hover:bg-neutral-50 transition-colors relative">
                <input
                  type="file"
                  onChange={handleFileUploadSim}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept=".pdf,.tiff,.ai,.psd,.jpg,.png"
                />
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center shadow-sm">
                    <UploadCloud className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-900 text-base">
                      {fileUploaded ? `Wybrany plik: ${fileUploaded}` : 'Przeciągnij i upuść plik do druku lub kliknij tutaj'}
                    </h4>
                    <p className="text-xs text-neutral-500 mt-1">
                      Obsługujemy formaty: PDF (zalecany drukarski), TIFF, JPG, PNG, PSD, AI. Maksymalny rozmiar: 150 MB.
                    </p>
                  </div>
                  {fileUploaded && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                      <CheckCircle2 className="w-4 h-4" /> Plik poprawnie załadowany
                    </span>
                  )}
                </div>
              </div>

              <div className="bg-sky-50/70 border border-sky-200 rounded-xl p-4 text-xs text-sky-900 space-y-2">
                <div className="font-bold flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-sky-600" />
                  Wskazówki przygotowania pliku dla drukarni Biuroserwis:
                </div>
                <ul className="list-disc list-inside space-y-1 text-sky-800/90 pl-1">
                  <li>Przestrzeń barwna: <strong>CMYK</strong> (pliki RGB zostaną automatycznie przekonwertowane).</li>
                  <li>Spady drukarskie: <strong>2 mm lub 3 mm</strong> z każdej strony.</li>
                  <li>Bezpieczny margines wewnętrzny tekstu: min. <strong>4 mm</strong> od linii cięcia.</li>
                  <li>Rozdzielczość map bitowych / zdjęć: min. <strong>300 DPI</strong> w skali 1:1.</li>
                </ul>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveTab('kalkulator')}
                  className="px-5 py-2.5 bg-neutral-900 text-white rounded-xl text-sm font-medium hover:bg-neutral-800 transition-colors"
                >
                  Przejdź do wyceny i potwierdzenia &rarr;
                </button>
              </div>
            </div>
          )}

          {activeTab === 'szczegoly' && (
            <div className="space-y-6 max-w-2xl mx-auto py-2">
              <div>
                <h4 className="font-bold text-neutral-900 text-base mb-1">
                  O produkcie: {product.title}
                </h4>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div>
                <h5 className="font-mono text-xs uppercase tracking-wider font-bold text-neutral-500 mb-2.5">
                  Główne atuty i specyfikacja techniczna:
                </h5>
                <ul className="space-y-2">
                  {product.specs.map((spec, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-neutral-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-2 shrink-0" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 text-xs text-neutral-600 space-y-1">
                <div className="font-semibold text-neutral-900">
                  Druk na żądanie (Print on Demand):
                </div>
                <p>
                  Zamawiaj dokładnie tyle sztuk, ile potrzebujesz, bez konieczności ponoszenia kosztów magazynowania. Wysyłka kurierem, paczkomatem lub bezpośredni bezpłatny odbiór osobisty w punkcie Biuroserwisu w Elblągu (ul. Hetmańska 32).
                </p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default function ProductConfigModal({
  product,
  onClose,
  onAddToCart,
}: ProductConfigModalProps) {
  if (!product) return null;

  return (
    <ProductConfigContent
      key={product.id}
      product={product}
      onClose={onClose}
      onAddToCart={onAddToCart}
    />
  );
}
