# Algor Marketing Dashboard

Algor Marketing Dashboard je multi-tenant Node.js/Express web aplikacija namijenjena praćenju marketinških statistika i kampanja klijenata. Sučelje je dizajnirano u premium modernom **glassmorphism** stilu s ugrađenim interaktivnim grafikonima, pametnim AI asistentom i sustavom paketa suradnje.

---

## 🚀 Tehnologije i Pokretanje

Aplikacija se temelji na poslužiteljskom renderiranju (EJS) i klijentskim skriptama za crtanje grafikona i chat streaming.

### Preduvjeti
- Node.js (preporučeno v18+)

### Pokretanje aplikacije
1. Instalirajte ovisnosti:
   ```bash
   npm install
   ```
2. Pokrenite poslužitelj:
   ```bash
   node app.js
   ```
3. Otvorite preglednik na adresi: `http://localhost:3000`

---

## 📂 Struktura Projekta

Aplikacija je organizirana kao lagana monolitna struktura s jasnim odvajanjem vizualnog dijela i poslovne logike:

```bash
├── app.js               # Glavni Express poslužitelj (Rute, SSE API i Mock Baza Klijenata)
├── package.json         # Konfiguracijski file ovisnosti (express, ejs, dotenv)
├── .gitignore           # Datoteke izuzete iz Git praćenja (node_modules, .env, logovi)
├── public/
│   └── css/
│       └── style.css    # Globalni stilovi, uvoz fontova, gradijenti i glassmorphism
└── views/
    ├── index.ejs        # Početna stranica (Kartice klijenata, progress barovi objava, modal za dodavanje)
    └── client.ejs       # Klijentska stranica (Omjer 80/20, Meta/Google/TikTok grafikoni, AI Asistent)
```

---

## 🎨 Dizajn i Vizualni Identitet

Dizajn je prilagođen svijetlom načinu rada (Light Theme) s luksuznim staklenim elementima i zaobljenim rubovima.

### Tipografija
- **Font**: `Urbanist` (učitava se direktno s Google Fonts), moderan bezserifni font čistih linija idealan za brojčane podatke i tablice.

### Paleta Boja
- **Pozadina**: Blagi bijelo-plavi fiksni gradijent (`linear-gradient(135deg, #F0F4F8 0%, #FFFFFF 50%, #D4E4F5 100%)`) nadopunjen s dvije velike, zamućene ukrasne pozadinske točke (svjetloružičasta i svjetlozelena).
- **Tekst i kontrasti**: Tamno neutralna `#122022` za naslove, tekstove i primarne elemente.
- **Akcenti paketa klijenta**:
  - **Start Paket**: Svjetlozelena `#DAF4AA`
  - **Pro Paket**: Svjetlocijanska `#96D8D0`
  - **Ultra Paket**: Svjetloružičasta `#F1B4B9`

### Glassmorphism Stilovi
Sve kartice i paneli koriste prozirnu pozadinu s mutnim filterom, tankim bijelim obrubom i mekim sjenama:
```css
background: rgba(255, 255, 255, 0.45);
backdrop-filter: blur(16px);
border: 1px solid rgba(255, 255, 255, 0.5);
border-radius: 2rem; /* Zaobljeni rubovi na svim glavnim kontejnerima */
```

---

## 📦 Sustav Paketa i Ograničenja (Locks)

Aplikacija podržava tri razine paketa suradnje s klijentima, pri čemu svaki paket dinamički otključava specifične platforme i praćenja na sučelju:

| Značajka | Start Paket (€690/mj) | Pro Paket (€1,250/mj) | Ultra Paket (€2,150/mj) |
| :--- | :---: | :---: | :---: |
| **Meta Ads** (FB/IG) | ✅ Otključano | ✅ Otključano | ✅ Otključano |
| **Google Ads** | 🔒 Zaključano | ✅ Otključano | ✅ Otključano |
| **TikTok Ads** | 🔒 Zaključano | 🔒 Zaključano | ✅ Otključano |
| **Maksimalno Objava** | 8 objava/mj | 12 objava/mj | 16 objava/mj |
| **Produkcija** | Snimanje na lokaciji | Foto + Reels/TikTok | Ekskluzivna produkcija |
| **AI Automatizacija** | Auto-odgovori (Basic) | Lead & Booking Engine | Custom AI CRM integracija |
| **Izvještaji** | Mjesečna analiza | ROAS i Konverzije | CAC, ROAS & ROI |

### Logika zaključavanja na sučelju:
- Na klijentskoj stranici, tabovi za zaključane platforme u navigaciji imaju ikonu lokota (`fa-lock`).
- Ako korisnik klikne na zaključanu platformu, ne iscrtavaju se grafikoni već se prikazuje stakleni prozor s upozorenjem o zaključanosti i uputom za nadogradnju paketa.

---

## 📊 Integrirani Grafikoni (Apache ECharts)

Sve vizualizacije iscrtane su pomoću **Apache ECharts** knjižnice i potpuno su responzivne (automatski se prilagođavaju promjenama širine ekrana).

### Meta Ads Vizualizacije
- **Trend učinkovitosti**: Linijski grafikon s dvije osi Y (dnevni trošak u odnosu na dnevni broj konverzija).
- **Usporedba platformi**: Prstenasti (donut) grafikon raspodjele budžeta (Facebook vs. Instagram vs. Audience Network).
- **Analiza publike**: Horizontalni stupci konverzija po dobi i spolu.
- **Top 5 objava po angažmanu**: Slagani horizontalni stupci (lajkovi, komentari, dijeljenja).
- **Trend organskog dosega**: Površinski (area) grafikon s prozirnim preljevom.

### Google Ads Vizualizacije
- **Trošak vs. Konverzije**: Dnevni linijski grafikon.
- **Tempo potrošnje (Budget Pacing)**: Kombinirani grafikon koji prikazuje ciljanu idealnu linearnu potrošnju (linija) u odnosu na stvarnu kumulativnu potrošnju (stupci) klijenta.
- **Raspodjela po mrežama**: Donut grafikon (Search vs. PMax vs. YouTube vs. Display).
- **Top 10 kampanja**: Horizontalni stupci po ROAS-u (komforno raspoređeni na širim panelima).
- **Uređaji i lokacije**: Usporedni stupčasti grafikon gradova i uređaja.
- **Lijevak prodaje (GA4 Funnel)**: Lijevak grafikon stope napuštanja (Klik > Web posjet > Košarica > Kupnja).

---

## 🤖 AI Asistent (SSE Chat Widget)

Klijentski dashboard je podijeljen u omjeru **80% (lijevo - grafovi)** i **20% (desno - AI Asistent sidebar)**.

- **Streaming tehnologija (SSE)**: Backend `/api/chat` koristi standard *Server-Sent Events* za slanje podataka u paketima (chunks) u stvarnom vremenu.
- **Odvajanje razmišljanja (Thoughts)**: Asistent u chat log prvo šalje svoje korake razmišljanja (`THOUGHT`), koji se ispisuju u malom uvučenom bloku s animacijom učitavanja (npr. *Analiziram konverzije...*, *Dohvaćam budžet...*).
- **Konačni odgovor (`FINAL_RESPONSE`)**: Tekst odgovora se postupno "tipka" u chat oblačiću, a klijentska JS skripta ga automatski pretvara u Markdown (naslovi, podebljani tekst, liste, tablice).
- **Brzi prijedlozi (Suggestions)**: Asistent na kraju svakog odgovora generira interaktivne gornje gumbe (npr. *"Kako smanjiti CPA?"*), na koje korisnik može kliknuti za nastavak rasprave bez tipkanja.
