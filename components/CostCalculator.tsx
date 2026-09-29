'use client';

import { useState, useMemo } from 'react';
import { Shirt, Coffee, Image as ImageIcon, BookOpen, Calculator, Sparkles, TrendingDown, Info } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';

interface ProductConfig {
  id: string;
  name: string;
  icon: typeof Shirt;
  description: string;
  baseUnitCost: number; // Koszt bazowy 1 szt. (zł)
  recommendedRetail: number; // Rekomendowana cena sprzedaży (zł)
  technology: string;
  leadTime: string;
}

const PRODUCTS: ProductConfig[] = [
  {
    id: 'tshirt',
    name: 'Koszulka bawełniana Premium',
    icon: Shirt,
    description: 'Druk DTG / DTF, 100% bawełna czesana 190g',
    baseUnitCost: 28,
    recommendedRetail: 69,
    technology: 'DTG / DTF Full Color',
    leadTime: '24-48h',
  },
  {
    id: 'mug',
    name: 'Kubek ceramiczny 330ml',
    icon: Coffee,
    description: 'Sublimacja HD, odporny na zmywarkę, powłoka gloss',
    baseUnitCost: 14,
    recommendedRetail: 39,
    technology: 'Termosublimacja',
    leadTime: '24h',
  },
  {
    id: 'poster',
    name: 'Plakat artystyczny B2 (50x70)',
    icon: ImageIcon,
    description: 'Papier archiwalny matowy 230g, druk pigmentowy 12 kolorów',
    baseUnitCost: 18,
    recommendedRetail: 55,
    technology: 'Fine-Art Giclée',
    leadTime: '24h',
  },
  {
    id: 'tote',
    name: 'Torba bawełniana Canvas',
    icon: BookOpen,
    description: 'Gramatura 280g, długie uszy, sitodruk cyfrowy',
    baseUnitCost: 16,
    recommendedRetail: 45,
    technology: 'Druk cyfrowy DTF',
    leadTime: '24-48h',
  },
];

const QUANTITY_STEPS = [1, 5, 10, 25, 50, 100];

export default function CostCalculator() {
  const [selectedProductId, setSelectedProductId] = useState<string>('tshirt');
  const [quantity, setQuantity] = useState<number>(10);
  const [includeBranding, setIncludeBranding] = useState<boolean>(true);

  const currentProduct = useMemo(
    () => PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0],
    [selectedProductId]
  );

  // Kalkulacja rabatu ilościowego charakterystycznego dla Print On Demand
  const getUnitCostForQty = (qty: number, baseCost: number, branding: boolean) => {
    let factor = 1.0;
    if (qty >= 100) factor = 0.68; // -32%
    else if (qty >= 50) factor = 0.74; // -26%
    else if (qty >= 25) factor = 0.82; // -18%
    else if (qty >= 10) factor = 0.90; // -10%
    else if (qty >= 5) factor = 0.95; // -5%

    const brandingCost = branding ? 1.5 : 0;
    return Math.round((baseCost * factor + brandingCost) * 10) / 10;
  };

  // Dane do wykresu Recharts (porównanie kosztu jednostkowego i całkowitego w nakładach)
  const chartData = useMemo(() => {
    return QUANTITY_STEPS.map((qty) => {
      const unitCost = getUnitCostForQty(qty, currentProduct.baseUnitCost, includeBranding);
      const totalCost = Math.round(unitCost * qty);
      const totalRevenue = Math.round(currentProduct.recommendedRetail * qty);
      const profit = totalRevenue - totalCost;

      return {
        naklad: `${qty} szt.`,
        'Koszt jednostkowy (zł)': unitCost,
        'Zysk szacunkowy (zł)': profit,
        'Koszt całkowity (zł)': totalCost,
      };
    });
  }, [currentProduct, includeBranding]);

  // Wyliczenia dla bieżącej wartości
  const currentUnitCost = getUnitCostForQty(quantity, currentProduct.baseUnitCost, includeBranding);
  const currentTotalCost = Math.round(currentUnitCost * quantity);
  const currentRevenue = Math.round(currentProduct.recommendedRetail * quantity);
  const currentProfit = currentRevenue - currentTotalCost;
  const marginPercent = Math.round((currentProfit / currentRevenue) * 100);

  return (
    <div className="w-full bg-white border border-neutral-200/90 rounded-2xl shadow-sm p-5 sm:p-7 transition-all">
      {/* Nagłówek kalkulatora */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-neutral-100 gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center shadow-sm">
            <Calculator className="w-5 h-5 text-sky-400" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-neutral-900 tracking-tight flex items-center gap-2">
              Kalkulator Kosztów Druku na Żądanie (POD)
              <span className="text-[10px] font-mono font-medium px-2 py-0.5 bg-sky-50 text-sky-700 border border-sky-200 rounded-full">
                LIVE
              </span>
            </h2>
            <p className="text-xs text-neutral-500 font-mono mt-0.5">
              Wybierz produkt i sprawdź skalowalność kosztów produkcji
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-neutral-500 bg-neutral-50 px-3 py-1.5 rounded-lg border border-neutral-200/60 font-mono self-start sm:self-auto">
          <Info className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
          <span>Realizacja: {currentProduct.leadTime}</span>
        </div>
      </div>

      {/* Krok 1: Wybór produktu */}
      <div className="mt-5">
        <label className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-500 block mb-2.5">
          1. Wybierz typ asortymentu:
        </label>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
          {PRODUCTS.map((prod) => {
            const Icon = prod.icon;
            const isSelected = prod.id === selectedProductId;
            return (
              <button
                key={prod.id}
                type="button"
                onClick={() => setSelectedProductId(prod.id)}
                className={`p-3 text-left rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-neutral-900 bg-neutral-900 text-white shadow-md'
                    : 'border-neutral-200 hover:border-neutral-400 bg-white text-neutral-800'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                      isSelected ? 'bg-neutral-800 text-sky-400' : 'bg-neutral-100 text-neutral-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span
                    className={`text-[11px] font-mono font-bold ${
                      isSelected ? 'text-sky-300' : 'text-neutral-500'
                    }`}
                  >
                    od {prod.baseUnitCost} zł
                  </span>
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-semibold leading-tight line-clamp-1">
                    {prod.name}
                  </div>
                  <div
                    className={`text-[10px] mt-1 line-clamp-2 ${
                      isSelected ? 'text-neutral-300' : 'text-neutral-500'
                    }`}
                  >
                    {prod.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Krok 2: Suwak nakładu i opcje */}
      <div className="mt-6 pt-5 border-t border-neutral-100 grid grid-cols-1 md:grid-cols-3 gap-5 items-center">
        <div className="md:col-span-2 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-600">
              2. Planowany nakład:
            </label>
            <span className="text-sm font-bold font-mono px-2.5 py-0.5 bg-neutral-100 text-neutral-900 rounded-md border border-neutral-200">
              {quantity} {quantity === 1 ? 'sztuka' : quantity < 5 ? 'sztuki' : 'sztuk'}
            </span>
          </div>

          <input
            type="range"
            min={1}
            max={100}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-neutral-900"
          />

          <div className="flex justify-between text-[10px] font-mono text-neutral-400 px-0.5">
            <span>1 szt. (On-Demand)</span>
            <span>25 szt.</span>
            <span>50 szt.</span>
            <span>100 szt. (Hurt)</span>
          </div>
        </div>

        {/* Dodatki produkcyjne */}
        <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-200/80">
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-xs font-medium text-neutral-700">
              Etykieta i branding POD
            </span>
            <input
              type="checkbox"
              checked={includeBranding}
              onChange={(e) => setIncludeBranding(e.target.checked)}
              className="w-4 h-4 rounded text-neutral-900 border-neutral-300 focus:ring-neutral-900"
            />
          </label>
          <p className="text-[10px] text-neutral-500 mt-1 leading-snug">
            Indywidualna wszywka / metka kartonowa z Twoim logo (+1.50 zł/szt.)
          </p>
        </div>
      </div>

      {/* Wyniki finansowe - Podsumowanie */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200/60">
          <span className="text-[11px] font-mono text-neutral-500 uppercase block">
            Koszt / 1 szt.
          </span>
          <span className="text-lg sm:text-xl font-bold font-mono text-neutral-900 mt-0.5 block">
            {currentUnitCost.toFixed(2)} zł
          </span>
          <span className="text-[10px] text-emerald-600 font-mono flex items-center gap-1 mt-1">
            <TrendingDown className="w-3 h-3" />
            Rabat skali aktywny
          </span>
        </div>

        <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200/60">
          <span className="text-[11px] font-mono text-neutral-500 uppercase block">
            Koszt zlecenia
          </span>
          <span className="text-lg sm:text-xl font-bold font-mono text-neutral-900 mt-0.5 block">
            {currentTotalCost} zł
          </span>
          <span className="text-[10px] text-neutral-500 font-mono mt-1 block">
            dla {quantity} szt.
          </span>
        </div>

        <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200/60">
          <span className="text-[11px] font-mono text-neutral-500 uppercase block">
            Przychód (Sugerowany)
          </span>
          <span className="text-lg sm:text-xl font-bold font-mono text-neutral-900 mt-0.5 block">
            {currentRevenue} zł
          </span>
          <span className="text-[10px] text-neutral-500 font-mono mt-1 block">
            przy cenie {currentProduct.recommendedRetail} zł/szt.
          </span>
        </div>

        <div className="p-3.5 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-200/70">
          <span className="text-[11px] font-mono text-emerald-700 uppercase block">
            Twój zysk (Marża)
          </span>
          <span className="text-lg sm:text-xl font-bold font-mono text-emerald-700 mt-0.5 block">
            +{currentProfit} zł
          </span>
          <span className="text-[10px] text-emerald-600 font-bold font-mono mt-1 block">
            Marża: {marginPercent}%
          </span>
        </div>
      </div>

      {/* Wizualizacja Recharts: Koszt vs Zysk w zależności od nakładu */}
      <div className="mt-7 pt-5 border-t border-neutral-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sky-500" />
            <h3 className="text-xs sm:text-sm font-bold text-neutral-800 font-mono uppercase tracking-wider">
              Wizualizacja Recharts: Skalowalność nakładu ({currentProduct.name})
            </h3>
          </div>
          <span className="text-[10px] font-mono text-neutral-400 hidden sm:inline">
            Symulacja kosztu vs zysku
          </span>
        </div>

        <div className="w-full h-64 sm:h-72 bg-neutral-50/50 rounded-xl p-2 sm:p-4 border border-neutral-200/60">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis
                dataKey="naklad"
                stroke="#6b7280"
                fontSize={11}
                tickLine={false}
              />
              <YAxis
                stroke="#6b7280"
                fontSize={11}
                tickLine={false}
                tickFormatter={(value) => `${value} zł`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#171717',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#ffffff',
                  fontSize: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                }}
                formatter={(value: unknown) => {
                  const numValue = typeof value === 'number' ? value : Number(value);
                  return [`${numValue.toFixed(2)} zł`];
                }}
              />
              <Legend
                wrapperStyle={{
                  fontSize: '11px',
                  fontFamily: 'monospace',
                  paddingTop: '8px',
                }}
              />
              <Bar
                dataKey="Koszt całkowity (zł)"
                fill="#0284c7"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="Zysk szacunkowy (zł)"
                fill="#10b981"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
