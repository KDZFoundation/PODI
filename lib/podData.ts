export interface ProductVariantOption {
  id: string;
  name: string;
  priceDelta: number; // np. +0, +15 zł
}

export interface ProductConfigSchema {
  formats: ProductVariantOption[];
  papers: ProductVariantOption[];
  finishes: ProductVariantOption[];
  defaultQuantity: number;
  minQuantity: number;
  bulkDiscountStep: number; // np. rabat przy wyższych nakładach
  basePricePerUnit: number; // cena jednostkowa bazowa
}

export interface PodProduct {
  id: string;
  title: string;
  category: 'firmowe' | 'foto' | 'gadzety' | 'biuro';
  categoryLabel: string;
  badge?: string;
  tagline: string;
  description: string;
  fromPrice: number;
  leadTime: string; // np. '24-48h'
  imageEmoji: string;
  specs: string[];
  config: ProductConfigSchema;
}

export const POD_CATEGORIES = [
  { id: 'all', label: 'Wszystkie produkty' },
  { id: 'firmowe', label: 'Dla Firm & Akcydens' },
  { id: 'foto', label: 'Foto & Pamiątki (CEWE/Colorland)' },
  { id: 'gadzety', label: 'Gadżety & Tekstylia' },
  { id: 'biuro', label: 'Biuroserwis & Oprawa' },
] as const;

export const POD_PRODUCTS: PodProduct[] = [
  // 1. DLA FIRM & AKCYDENS
  {
    id: 'wizytowki-premium',
    title: 'Wizytówki Premium & Soft-Touch',
    category: 'firmowe',
    categoryLabel: 'Dla Firm & Akcydens',
    badge: 'Bestseller B2B',
    tagline: 'Pierwsze wrażenie biznesowe na papierze 350g/450g z wybiórczym lakierem UV.',
    description: 'Najwyższej jakości wizytówki drukowane cyfrowo na żądanie. Idealne dla reprezentantów firm, prawników, lekarzy i przedsiębiorców z Elbląga i całej Polski.',
    fromPrice: 39,
    leadTime: '24h',
    imageEmoji: '📇',
    specs: ['Kreda mat 350g lub MultiLoft 650g', 'Format standard 90x50 mm lub 85x55 mm', 'Folia Soft-Touch + lakier wybiórczy UV 3D'],
    config: {
      basePricePerUnit: 0.45,
      defaultQuantity: 100,
      minQuantity: 25,
      bulkDiscountStep: 0.15,
      formats: [
        { id: '85x55', name: '85 x 55 mm (Euro-standard)', priceDelta: 0 },
        { id: '90x50', name: '90 x 50 mm (Polski standard)', priceDelta: 0 },
        { id: 'kwadrat', name: '65 x 65 mm (Kwadrat modern)', priceDelta: 12 },
      ],
      papers: [
        { id: 'kreda350', name: 'Kreda mat 350g (Solidna)', priceDelta: 0 },
        { id: 'multiloft650', name: 'MultiLoft 650g z kolorowym rdzeniem', priceDelta: 35 },
        { id: 'eko-kraft', name: 'Ekologiczny Kraft brązowy 300g', priceDelta: 15 },
      ],
      finishes: [
        { id: 'brak', name: 'Brak uszlachetnienia (Mat naturalny)', priceDelta: 0 },
        { id: 'soft-touch', name: 'Aksamitna folia Soft-Touch', priceDelta: 20 },
        { id: 'uv-gold', name: 'Soft-Touch + Złocenie Liquid Gold 3D', priceDelta: 49 },
      ],
    },
  },
  {
    id: 'papier-firmowy',
    title: 'Papier Firmowy & Druki Akcydensowe',
    category: 'firmowe',
    categoryLabel: 'Dla Firm & Akcydens',
    tagline: 'Oficjalna papeteria korespondencyjna bezpieczna dla drukarek biurowych laserowych.',
    description: 'Druk papieru listowego, formularzy samokopiujących CMR i druków akcydensowych zgodnie ze specyfikacją Biuroserwisu.',
    fromPrice: 65,
    leadTime: '24-48h',
    imageEmoji: '📄',
    specs: ['Papier offset premium 90g lub Preprint 100g', 'Gwarancja druku w kserokopiarkach', 'Dowolna numeracja druków akcydensowych'],
    config: {
      basePricePerUnit: 0.28,
      defaultQuantity: 250,
      minQuantity: 50,
      bulkDiscountStep: 0.2,
      formats: [
        { id: 'a4', name: 'Format A4 (210 x 297 mm)', priceDelta: 0 },
        { id: 'a5', name: 'Format A5 (148 x 210 mm)', priceDelta: -10 },
      ],
      papers: [
        { id: 'offset90', name: 'Offset preprint 90g (Standard biurowy)', priceDelta: 0 },
        { id: 'preprint100', name: 'Soporset Premium 100g (Wysoka biel)', priceDelta: 25 },
        { id: 'samokopia', name: 'Papier samokopiujący CB/CFB/CF (Druki KP/CMR)', priceDelta: 40 },
      ],
      finishes: [
        { id: 'standard', name: 'Docinanie na gilotynie do formatu', priceDelta: 0 },
        { id: 'dziurkowanie', name: 'Dziurkowanie do segregatora (2 lub 4 otwory)', priceDelta: 15 },
        { id: 'bloczek', name: 'Klejenie w bloczki po 50 lub 100 kart', priceDelta: 25 },
      ],
    },
  },
  {
    id: 'teczki-ofertowe',
    title: 'Teczki Ofertowe z Gumką lub Grzbietem',
    category: 'firmowe',
    categoryLabel: 'Dla Firm & Akcydens',
    badge: 'Prestiż B2B',
    tagline: 'Eleganckie teczki na umowy, oferty handlowe i dokumentację projektową.',
    description: 'Teczki z miejscem na wizytówkę i pojedynczym lub podwójnym grzbietem mieszczącym do 50 arkuszy dokumentów.',
    fromPrice: 99,
    leadTime: '48h',
    imageEmoji: '📁',
    specs: ['Karton jednostronnie powlekany 300g', 'Wykrojnik z nacięciem na wizytówkę', 'Zabezpieczenie folią błysk lub mat'],
    config: {
      basePricePerUnit: 3.2,
      defaultQuantity: 50,
      minQuantity: 10,
      bulkDiscountStep: 0.25,
      formats: [
        { id: 'a4-1grzbiet', name: 'Teczka A4 jednobigowa (grzbiet 1 mm)', priceDelta: 0 },
        { id: 'a4-2grzbiet', name: 'Teczka A4 dwubigowa (grzbiet 5.5 mm)', priceDelta: 15 },
      ],
      papers: [
        { id: 'karton300', name: 'Karton Arktika 300g (Sztywny)', priceDelta: 0 },
        { id: 'kreda350', name: 'Kreda mat 350g', priceDelta: 10 },
      ],
      finishes: [
        { id: 'folia-mat', name: 'Folia matowa odporna na zarysowania', priceDelta: 0 },
        { id: 'folia-soft', name: 'Folia aksamitna Soft-Touch', priceDelta: 28 },
        { id: 'gumka', name: 'Dodatkowa narożna gumka zamykająca', priceDelta: 35 },
      ],
    },
  },

  // 2. FOTO & PAMIĄTKI (CEWE / OPTIMALPRINT / COLORLAND)
  {
    id: 'fotoksiazka-luksusowa',
    title: 'Fotoksiążka & Fotoalbum na Płasko (Lay-Flat)',
    category: 'foto',
    categoryLabel: 'Foto & Pamiątki',
    badge: 'Jakość CEWE',
    tagline: 'Twoje najpiękniejsze wspomnienia na sztywnych kartach rozkładanych na płasko.',
    description: 'Druk fotograficzny HD na naświetlanym papierze FujiFilm lub cyfrowym papierze jedwabistym. Trwałość kolorów do 100 lat.',
    fromPrice: 69,
    leadTime: '24-48h',
    imageEmoji: '📖',
    specs: ['Od 28 do 120 stron', 'Twarda oprawa z gąbką i laminatem', 'Otwieranie 180° (brak ucięcia w grzbiecie)'],
    config: {
      basePricePerUnit: 69,
      defaultQuantity: 1,
      minQuantity: 1,
      bulkDiscountStep: 0.1,
      formats: [
        { id: '20x20', name: 'Kwadrat 20 x 20 cm (Popularny)', priceDelta: 0 },
        { id: 'a4-pion', name: 'A4 Pionowy (21 x 28 cm)', priceDelta: 25 },
        { id: 'a4-poziom', name: 'A4 Panoramiczny (28 x 21 cm)', priceDelta: 35 },
        { id: '30x30', name: 'Format XL 30 x 30 cm Grand', priceDelta: 59 },
      ],
      papers: [
        { id: 'satyna200', name: 'Papier satynowy 200g (Półmat)', priceDelta: 0 },
        { id: 'fotograficzny-mat', name: 'Papier foto Fuji Silk Jedwab 360g (Lay-flat)', priceDelta: 45 },
        { id: 'fotograficzny-blysk', name: 'Papier foto Lustre Ultra-HD', priceDelta: 40 },
      ],
      finishes: [
        { id: 'twarda-mat', name: 'Twarda laminowana okładka mat', priceDelta: 0 },
        { id: 'eko-skora', name: 'Luksusowa oprawa z ekoskóry z tłoczeniem', priceDelta: 39 },
        { id: 'okno-foto', name: 'Oprawa płócienna z okienkiem foto', priceDelta: 49 },
      ],
    },
  },
  {
    id: 'kalendarz-scienny',
    title: 'Fotokalendarz Ścienny Spirala z Zawieszką',
    category: 'foto',
    categoryLabel: 'Foto & Pamiątki',
    badge: 'Hit Sezonu',
    tagline: '13 kart (12 miesięcy + okładka) z Twoimi zdjęciami, świętami i rocznicami.',
    description: 'Personalizowany kalendarz ścienny drukowany już od 1 sztuki. Doskonały prezent dla bliskich oraz prestiżowy upominek dla klientów firmy.',
    fromPrice: 29,
    leadTime: '24h',
    imageEmoji: '🗓️',
    specs: ['13 stron na papierze kreda 250g', 'Metalowa spirala Wire-O z zawieszką', 'Darmowe szablony kalendariów z imieninami'],
    config: {
      basePricePerUnit: 29,
      defaultQuantity: 1,
      minQuantity: 1,
      bulkDiscountStep: 0.18,
      formats: [
        { id: 'a4-pion', name: 'A4 Pionowy (21 x 29.7 cm)', priceDelta: 0 },
        { id: 'a3-pion', name: 'A3 Duży (29.7 x 42 cm)', priceDelta: 16 },
        { id: 'a3-poziom', name: 'A3 Poziomy Panoramiczny', priceDelta: 20 },
      ],
      papers: [
        { id: 'kreda250', name: 'Kreda 250g matowa (Łatwo pisać notatki)', priceDelta: 0 },
        { id: 'kreda-blysk', name: 'Kreda 250g błyszcząca (Głębokie nasycenie)', priceDelta: 6 },
        { id: 'papier-eko', name: 'Papier ekologiczny Nautilus 250g', priceDelta: 12 },
      ],
      finishes: [
        { id: 'spirala-srebrna', name: 'Metalowa spirala srebrna + zawieszka', priceDelta: 0 },
        { id: 'spirala-czarna', name: 'Elegancka spirala czarna mat', priceDelta: 4 },
        { id: 'spirala-biala', name: 'Czysta spirala biała', priceDelta: 0 },
      ],
    },
  },
  {
    id: 'fotoobraz-plotno',
    title: 'Fotoobraz na Płótnie Canvas & Krosno Sosnowe',
    category: 'foto',
    categoryLabel: 'Foto & Pamiątki',
    tagline: 'Prawdziwe bawełniane płótno malarskie naciągnięte na sosnowy blejtram.',
    description: 'Zmień dowolne zdjęcie w dzieło sztuki. Zadrukowane boki 3D – gotowy do powieszenia na ścianie od razu po rozpakowaniu.',
    fromPrice: 49,
    leadTime: '24-48h',
    imageEmoji: '🖼️',
    specs: ['Płótno Canvas Canvas 100% Cotton 360g', 'Głęboki blejtram sosnowy 2 cm lub 4 cm', 'Druk ekosolwentowy bezzapachowy do wnętrz'],
    config: {
      basePricePerUnit: 49,
      defaultQuantity: 1,
      minQuantity: 1,
      bulkDiscountStep: 0.12,
      formats: [
        { id: '30x40', name: '30 x 40 cm (Klasyczny format)', priceDelta: 0 },
        { id: '50x70', name: '50 x 70 cm (Optymalny do salonu)', priceDelta: 35 },
        { id: '70x100', name: '70 x 100 cm (Wielki format)', priceDelta: 79 },
        { id: '50x50', name: '50 x 50 cm (Nowoczesny kwadrat)', priceDelta: 29 },
      ],
      papers: [
        { id: 'canvas-standard', name: 'Płótno Canvas Art 320g', priceDelta: 0 },
        { id: 'canvas-premium', name: 'Naturalne płótno bawełniane 380g struktura olejowa', priceDelta: 22 },
      ],
      finishes: [
        { id: 'blejtram-standard', name: 'Krosno sosnowe profil 2 cm (Standard)', priceDelta: 0 },
        { id: 'blejtram-galeryjny', name: 'Krosno galeryjne profil 4 cm (Efekt 3D)', priceDelta: 28 },
        { id: 'werniks', name: 'Dodatkowy werniks ochronny UV z połyskiem', priceDelta: 19 },
      ],
    },
  },

  // 3. GADŻETY & TEKSTYLIA
  {
    id: 'kubek-sublimacja',
    title: 'Kubek Ceramiczny z Nadrukiem 360°',
    category: 'gadzety',
    categoryLabel: 'Gadżety & Tekstylia',
    badge: 'Zmywarka OK',
    tagline: 'Klasyczny kubek 330 ml z trwałym nadrukiem odpornym na mycie w zmywarkach.',
    description: 'Druk fotograficzny wokół całego kubka. Dostępny od 1 sztuki na prezent lub w setkach sztuk jako firmowy gadżet promocyjny.',
    fromPrice: 19,
    leadTime: '24h',
    imageEmoji: '☕',
    specs: ['Pojemność 330 ml lub latte 450 ml', 'Certyfikat dopuszczenia do kontaktu z żywnością', 'Odporny na ponad 2000 cykli w zmywarce'],
    config: {
      basePricePerUnit: 19,
      defaultQuantity: 1,
      minQuantity: 1,
      bulkDiscountStep: 0.22,
      formats: [
        { id: '330ml-bialy', name: 'Kubek biały standard 330 ml', priceDelta: 0 },
        { id: '330ml-kolor', name: 'Kubek z kolorowym uchem i wnętrzem (czarny, czerwony, granat)', priceDelta: 5 },
        { id: 'magiczny', name: 'Kubek magiczny (nadruk ujawnia się pod wpływem ciepła)', priceDelta: 14 },
        { id: 'latte', name: 'Kubek stożkowy Latte 450 ml', priceDelta: 9 },
      ],
      papers: [
        { id: 'ceramika-aa', name: 'Ceramika biała klasa Premium AA+', priceDelta: 0 },
      ],
      finishes: [
        { id: 'kartonik-eko', name: 'Biały kartonik ochronny z okienkiem', priceDelta: 0 },
        { id: 'kartonik-prezent', name: 'Ozdobny kartonik prezentowy z kokardą', priceDelta: 6 },
      ],
    },
  },
  {
    id: 'koszulka-dtg',
    title: 'Koszulka Bawełniana z Nadrukiem DTG / DTF',
    category: 'gadzety',
    categoryLabel: 'Gadżety & Tekstylia',
    tagline: '100% czesana bawełna 190g z nasyconym, oddychającym nadrukiem cyfrowym.',
    description: 'Brak ograniczeń w ilości kolorów i przejściach tonalnych. Drukujemy grafikę, logo, zdjęcia już od 1 sztuki bez kosztownych matryc.',
    fromPrice: 39,
    leadTime: '24-48h',
    imageEmoji: '👕',
    specs: ['100% bawełna ringspun o wysokiej gramaturze 190g', 'Technologia druku bezpośredniego DTG / DTF Premium', 'Krój męski, damski lub dziecięcy (XS - 3XL)'],
    config: {
      basePricePerUnit: 39,
      defaultQuantity: 1,
      minQuantity: 1,
      bulkDiscountStep: 0.2,
      formats: [
        { id: 'przod-a4', name: 'Nadruk z przodu do formatu A4', priceDelta: 0 },
        { id: 'przod-a3', name: 'Duży nadruk z przodu format A3', priceDelta: 12 },
        { id: 'dwustronny', name: 'Nadruk dwustronny (przód A4 + tył A4)', priceDelta: 24 },
        { id: 'logo-piers', name: 'Dyskretne logo na piersi (10x10 cm)', priceDelta: -5 },
      ],
      papers: [
        { id: 'tshirt-czarna', name: 'Koszulka Czarna Deep Black 190g', priceDelta: 0 },
        { id: 'tshirt-biala', name: 'Koszulka Biała Pure White 190g', priceDelta: 0 },
        { id: 'tshirt-navy', name: 'Koszulka Granatowa Navy Blue 190g', priceDelta: 2 },
        { id: 'tshirt-szara', name: 'Koszulka Szary Melanż 190g', priceDelta: 2 },
      ],
      finishes: [
        { id: 'standard', name: 'Pakowanie pojedyncze w woreczek foliowy', priceDelta: 0 },
        { id: 'eko-pudelko', name: 'Prezentowe pudełko fasonowe Eko', priceDelta: 8 },
      ],
    },
  },
  {
    id: 'torba-bawelniana',
    title: 'Ekologiczna Torba Bawełniana z Twoim Logo',
    category: 'gadzety',
    categoryLabel: 'Gadżety & Tekstylia',
    tagline: 'Torba na zakupy i materiały konferencyjne o gramaturze 140g lub 280g canvas.',
    description: 'Praktyczny i ekologiczny nośnik reklamy, popularny na targach, w sklepach i instytucjach publicznych.',
    fromPrice: 12,
    leadTime: '24h',
    imageEmoji: '🛍️',
    specs: ['Długie uszy do noszenia na ramieniu (70 cm)', 'Krzyżowe przeszycia uchwytów dla dużej wytrzymałości', 'Format 38 x 42 cm'],
    config: {
      basePricePerUnit: 12,
      defaultQuantity: 10,
      minQuantity: 1,
      bulkDiscountStep: 0.25,
      formats: [
        { id: 'standard-38x42', name: 'Standard 38 x 42 cm z długim uchem', priceDelta: 0 },
        { id: 'z-dnem', name: 'Torba pojemna z poszerzanym dnem (szer. dna 10 cm)', priceDelta: 6 },
      ],
      papers: [
        { id: 'ecru-140', name: 'Bawełna naturalna Ecru 140g', priceDelta: 0 },
        { id: 'czarna-140', name: 'Bawełna barwiona Czarna 140g', priceDelta: 3 },
        { id: 'canvas-280', name: 'Ciężki Canvas 280g Heavy Duty (B. trwała)', priceDelta: 11 },
      ],
      finishes: [
        { id: 'nadruk-1strona', name: 'Nadruk z jednej strony', priceDelta: 0 },
        { id: 'nadruk-2strony', name: 'Nadruk z obu stron', priceDelta: 7 },
      ],
    },
  },

  // 4. BIUROSERWIS & OPRAWA DOKUMENTÓW (Specjalność Biuroserwisu)
  {
    id: 'pieczatki-trodat',
    title: 'Pieczątki Firmowe & Imienne Automatyczne (Trodat/Colop)',
    category: 'biuro',
    categoryLabel: 'Biuroserwis & Oprawa',
    badge: 'Realizacja 1h',
    tagline: 'Ekspresowy wyrób pieczątek metodą laserową w 1 godzinę na automatach Trodat.',
    description: 'Kompaktowe, trwałe pieczątki z zatyczką lub klasyczne biurowe. Laserowe grawerowanie gumy o mikroskopijnej precyzji linii.',
    fromPrice: 38,
    leadTime: '1-2h',
    imageEmoji: '🖋️',
    specs: ['Automaty samotuszujące Trodat Printy lub Colop Printer', 'Guma bezzapachowa odporna na alkohole i oleje', 'Poduszka tuszująca na ponad 15 000 odbić'],
    config: {
      basePricePerUnit: 38,
      defaultQuantity: 1,
      minQuantity: 1,
      bulkDiscountStep: 0.1,
      formats: [
        { id: 'trodat-4911', name: 'Trodat 4911 (38 x 14 mm, 3-4 linie - Imienna)', priceDelta: 0 },
        { id: 'trodat-4912', name: 'Trodat 4912 (47 x 18 mm, 4-5 linii - Standard firmowy)', priceDelta: 8 },
        { id: 'trodat-4913', name: 'Trodat 4913 (58 x 22 mm, 5-6 linii - Spółki i REGON)', priceDelta: 16 },
        { id: 'okragla', name: 'Pieczątka Okrągła Ø 30 mm lub Ø 40 mm', priceDelta: 19 },
      ],
      papers: [
        { id: 'tusz-czarny', name: 'Tusz czarny biurowy', priceDelta: 0 },
        { id: 'tusz-niebieski', name: 'Tusz niebieski', priceDelta: 0 },
        { id: 'tusz-czerwony', name: 'Tusz czerwony / zielony', priceDelta: 2 },
      ],
      finishes: [
        { id: 'zatyczka', name: 'Wersja biurowa z zatyczką ochronną (do torby)', priceDelta: 0 },
        { id: 'kieszonkowa-mobilna', name: 'Mechanizm kieszonkowy Stamp Mouse Colop', priceDelta: 7 },
      ],
    },
  },
  {
    id: 'oprawa-bindowanie',
    title: 'Oprawa Prac, Bindowanie & Laminowanie A4/A3',
    category: 'biuro',
    categoryLabel: 'Biuroserwis & Oprawa',
    tagline: 'Twarde oprawy prac dyplomowych z napisem oraz bindowanie drutowe lub plastikowe.',
    description: 'Kompleksowa obsługa studentów, firm projektowych i instytucji. Złocony napis Praca Magisterska/Dyplomowa, bindowanie raportów finansowych.',
    fromPrice: 15,
    leadTime: 'Od ręki (15 min)',
    imageEmoji: '📚',
    specs: ['Twarda oprawa kanałowa ze złotym lub srebrnym napisem', 'Spirala drutowa 3:1 lub plastikowa grzebieniowa', 'Laminacja na gorąco folią 100/150 mikronów'],
    config: {
      basePricePerUnit: 15,
      defaultQuantity: 1,
      minQuantity: 1,
      bulkDiscountStep: 0.15,
      formats: [
        { id: 'oprawa-twarda', name: 'Twarda oprawa ze złoconym napisem (Granat, Czerń, Zieleń, Bord)', priceDelta: 15 },
        { id: 'bindowanie-drut', name: 'Bindowanie drutowe metalowe (Przezroczysta okładka + karton)', priceDelta: 0 },
        { id: 'bindowanie-plastik', name: 'Bindowanie grzebieniowe plastikowe', priceDelta: -3 },
        { id: 'laminacja-a4', name: 'Laminowanie dokumentów A4 (odporność na wilgoć)', priceDelta: -8 },
      ],
      papers: [
        { id: 'karton-skora', name: 'Spód: Karton tłoczony na wzór skóry 250g', priceDelta: 0 },
        { id: 'karton-blysk', name: 'Spód: Karton błyszczący Chromolux 300g', priceDelta: 4 },
      ],
      finishes: [
        { id: 'przod-przezroczysty', name: 'Przód: Folia przezroczysta PCV 200 mikronów', priceDelta: 0 },
        { id: 'przod-mat', name: 'Przód: Folia matowa półprzezroczysta Antyrefleks', priceDelta: 3 },
      ],
    },
  },
  {
    id: 'notesy-bloczki',
    title: 'Notesy Spiralowane & Bloczki Klejone z Okładką',
    category: 'biuro',
    categoryLabel: 'Biuroserwis & Oprawa',
    tagline: 'Wygodne notesy firmowe z kartkami w kratkę, linie lub czystymi z Twoim logo.',
    description: 'Niezbędne wyposażenie każdego biura, szkolenia i konferencji. 50 lub 100 kartek z mikroperforacją lub klejeniem na krótkim boku.',
    fromPrice: 7,
    leadTime: '24-48h',
    imageEmoji: '📓',
    specs: ['Środek: papier offsetowy 80g z nadrukiem liniatury i logo', 'Okładka: kreda 300g uszlachetniona folią', 'Spód usztywniony grubą tekturą litą'],
    config: {
      basePricePerUnit: 7.5,
      defaultQuantity: 20,
      minQuantity: 5,
      bulkDiscountStep: 0.25,
      formats: [
        { id: 'a5', name: 'Format A5 (148 x 210 mm) - Najbardziej poręczny', priceDelta: 0 },
        { id: 'a4', name: 'Format A4 (210 x 297 mm) - Do notatek i szkiców', priceDelta: 5 },
        { id: 'a6', name: 'Format A6 (105 x 148 mm) - Kieszonkowy', priceDelta: -2.5 },
      ],
      papers: [
        { id: '50-kart', name: 'Objętość: 50 kartek (100 stron notatnika)', priceDelta: 0 },
        { id: '100-kart', name: 'Objętość: 100 kartek (Gruby notatnik)', priceDelta: 4.5 },
      ],
      finishes: [
        { id: 'spirala-gora', name: 'Spirala metalowa po krótkim boku (u góry)', priceDelta: 0 },
        { id: 'spirala-bok', name: 'Spirala metalowa po długim boku (zeszyt)', priceDelta: 1 },
        { id: 'klejenie-glowkowe', name: 'Klejone główki (bloczek do wyrywania kartek)', priceDelta: -1 },
      ],
    },
  },
];
