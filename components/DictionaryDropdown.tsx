'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, Utensils, HeartHandshake, Building2, Sparkles, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface DictionaryTopic {
  id: string;
  code: string;
  label: string;
  sublabel?: string;
  icon: typeof Utensils;
  isLink?: boolean;
  href?: string;
}

const TOPICS: DictionaryTopic[] = [
  {
    id: 'pod',
    code: 'POD',
    label: 'Studio PODI (Druk na żądanie)',
    sublabel: 'Plakaty, kalendarze, fotoksiążki, kartki okolicznościowe (przejdź do /pod)',
    icon: Sparkles,
    isLink: true,
    href: '/pod',
  },
  {
    id: 'restauracja',
    code: '01',
    label: 'Jestem restauracją',
    sublabel: 'Karty dań, menu, etykiety, fartuchy, gadżety gastronomiczne',
    icon: Utensils,
  },
  {
    id: 'ngo',
    code: '02',
    label: 'Jestem organizacją pozarządową',
    sublabel: 'Materiały kampanijne, koszulki charytatywne, gadżety dla darczyńców',
    icon: HeartHandshake,
  },
  {
    id: 'deweloper',
    code: '03',
    label: 'Jestem deweloperem',
    sublabel: 'Katalogi inwestycji, teczki ofertowe, identyfikacja biur sprzedaży',
    icon: Building2,
  },
];

interface DictionaryDropdownProps {
  onSelectTopic?: (topic: DictionaryTopic) => void;
}

export default function DictionaryDropdown({ onSelectTopic }: DictionaryDropdownProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<DictionaryTopic | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSelect = (topic: DictionaryTopic) => {
    if (topic.isLink && topic.href) {
      setIsOpen(false);
      router.push(topic.href);
      return;
    }

    setSelectedTopic(topic);
    setIsOpen(false);
    if (onSelectTopic) {
      onSelectTopic(topic);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto relative select-none font-mono" ref={dropdownRef}>
      {/* Przycisk wyboru profilu */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={`w-full flex items-center justify-between px-4 py-3.5 bg-white border rounded-xl transition-all duration-200 text-left cursor-pointer shadow-sm hover:shadow-md ${
          isOpen
            ? 'border-neutral-900 ring-2 ring-neutral-900/10'
            : selectedTopic
            ? 'border-neutral-800'
            : 'border-neutral-200 hover:border-neutral-300'
        }`}
      >
        <div className="flex items-center gap-3.5 min-w-0">
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
              selectedTopic
                ? 'bg-neutral-900 text-white'
                : 'bg-neutral-100 text-neutral-600'
            }`}
          >
            {selectedTopic ? (
              <selectedTopic.icon className="w-4 h-4" />
            ) : (
              <span className="text-xs font-bold">#</span>
            )}
          </div>
          <div className="truncate">
            <span
              className={`text-sm sm:text-base block truncate ${
                selectedTopic ? 'text-neutral-900 font-bold' : 'text-neutral-600'
              }`}
            >
              {selectedTopic ? selectedTopic.label : 'Wybierz profil ze słownika...'}
            </span>
            {selectedTopic && (
              <span className="text-xs text-neutral-500 hidden sm:block truncate mt-0.5">
                {selectedTopic.sublabel}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 ml-3">
          <span className="text-xs text-neutral-400 font-mono tracking-wider bg-neutral-100 px-2 py-0.5 rounded">
            {TOPICS.length} opcje
          </span>
          <ChevronDown
            className={`w-4 h-4 text-neutral-500 transition-transform duration-200 ease-in-out ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
      </button>

      {/* Rozwijana lista tematów */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute left-0 right-0 mt-2 bg-white border border-neutral-200 shadow-xl rounded-xl z-30 overflow-hidden divide-y divide-neutral-100"
          >
            <div className="px-4 py-2.5 bg-neutral-50/80 flex items-center justify-between text-xs text-neutral-500 font-medium">
              <span>LISTA PROFILI I BRANŻ PODI:</span>
              <span className="text-[10px] text-neutral-400">KLIKNIJ ABY WYBRAĆ</span>
            </div>

            <div className="divide-y divide-neutral-100">
              {TOPICS.map((topic) => {
                const Icon = topic.icon;
                const isSelected = selectedTopic?.id === topic.id;
                const isPod = topic.id === 'pod';

                return (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => handleSelect(topic)}
                    className={`w-full text-left px-4 py-3.5 flex items-start justify-between gap-3 transition-colors duration-150 cursor-pointer ${
                      isPod
                        ? 'bg-sky-50/50 hover:bg-sky-50 text-sky-950 font-medium'
                        : isSelected
                        ? 'bg-neutral-50 text-neutral-900 font-medium'
                        : 'hover:bg-neutral-50/60 text-neutral-800'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isPod
                            ? 'bg-sky-500 text-white'
                            : isSelected
                            ? 'bg-neutral-900 text-white'
                            : 'bg-neutral-100 text-neutral-700'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm flex items-center gap-2">
                          <span className={isPod ? 'text-sky-950 font-bold' : 'text-neutral-900'}>
                            {topic.label}
                          </span>
                          {isPod && (
                            <span className="text-[10px] font-mono uppercase bg-sky-100 text-sky-700 px-1.5 py-0.5 rounded border border-sky-200">
                              Nowość
                            </span>
                          )}
                        </div>
                        {topic.sublabel && (
                          <div className={`text-xs mt-0.5 leading-relaxed font-sans ${isPod ? 'text-sky-800' : 'text-neutral-500'}`}>
                            {topic.sublabel}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="shrink-0 mt-1">
                      {isPod ? (
                        <div className="text-[11px] font-mono text-sky-600 bg-white border border-sky-200 px-2 py-0.5 rounded">
                          /pod &rarr;
                        </div>
                      ) : isSelected ? (
                        <div className="w-5 h-5 rounded-full bg-neutral-900 text-white flex items-center justify-center">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-neutral-300" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
