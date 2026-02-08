import React, { useState } from 'react';
import { Calendar, Info, Train, Hotel, Camera, Coffee, ChevronDown, ChevronUp, ArrowRight, Plane, Backpack, Clock, ExternalLink, AlertTriangle, Wallet, Sun, CloudRain, Cloud, Utensils, Bus, MapPin, Footprints, CheckSquare, Banknote, Package, Star, BookOpen, Wifi, Globe, FileText, Bed, ShieldCheck, HeartPulse, ClipboardCheck } from 'lucide-react';

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f1f5f9',
    fontFamily: 'sans-serif',
    color: '#1e293b',
    paddingBottom: '48px'
  },
  header: {
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e2e8f0',
    position: 'sticky',
    top: 0,
    zIndex: 20,
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  },
  headerContent: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px',
    flexWrap: 'wrap'
  },
  title: {
    fontSize: '24px',
    fontWeight: 900,
    letterSpacing: '-0.02em',
    textTransform: 'uppercase',
    color: '#0f172a'
  },
  titleAccent: {
    color: '#dc2626'
  },
  nav: {
    display: 'flex',
    gap: '4px'
  },
  navButton: (active) => ({
    padding: '8px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 700,
    textTransform: 'capitalize',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: active ? '#0f172a' : 'transparent',
    color: active ? '#ffffff' : '#64748b',
    transition: 'all 0.2s'
  }),
  main: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '24px 16px'
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    border: '1px solid #e2e8f0',
    padding: '16px',
    marginBottom: '16px'
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    overflow: 'hidden',
    marginBottom: '24px'
  },
  sectionHeader: {
    backgroundColor: '#f8fafc',
    padding: '16px',
    borderBottom: '1px solid #e2e8f0',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  }
};

const EntryData = [
  { title: "Kein Visum nötig (Visa Waiver)", desc: "Für deutsche, österreichische und schweizer Staatsbürger gilt für touristische Reisen bis 90 Tage Visumsfreiheit. Du erhältst bei der Einreise einen 'Temporary Visitor' Sticker in den Pass.", recommended: true },
  { title: "Visit Japan Web (Fast Track)", desc: "PFLICHT-TIPP: Lade deinen Reisepass vorab auf 'Visit Japan Web' hoch und fülle die digitale Zollerklärung aus. Du erhältst QR-Codes, mit denen du am Flughafen an den Papierschlangen vorbei direkt zum Ausgang kannst.", recommended: true }
];

const HotelSuggestions = [
  { city: "Osaka (3N)", hotels: [
    { name: "Hotel Keihan Universal City", price: "ca. 120€/N", vibe: "Modern & zentral in Namba", type: "Business Hotel", rating: "⭐⭐⭐⭐" },
    { name: "Daiwa Roynet Hotel Osaka-Kitahama", price: "ca. 140€/N", vibe: "Upscale mit Spa & guter Küche", type: "Upper Mid-Range", rating: "⭐⭐⭐⭐⭐" },
    { name: "Crosshotel Osaka", price: "ca. 100€/N", vibe: "Budget-freundlich, Dotonbori Nähe", type: "Budget", rating: "⭐⭐⭐" }
  ]},
  { city: "Koyasan (1N im Ryokan)", hotels: [
    { name: "Rengejoin Monastery", price: "ca. 80€/N incl. Dinner", vibe: "Authentisches Ryokan-Erlebnis mit Meditation", type: "Ryokan (Shukubo)", rating: "⭐⭐⭐⭐⭐" },
    { name: "Koyasan Guest House", price: "ca. 50€/N", vibe: "Budget-freundlich, moderner Ryokan-Stil", type: "Ryokan", rating: "⭐⭐⭐⭐" }
  ]},
  { city: "Hiroshima (2N)", hotels: [
    { name: "Hotel Gracery Hiroshima", price: "ca. 110€/N", vibe: "Central mit guter Business-Ausstattung", type: "Business Hotel", rating: "⭐⭐⭐⭐" },
    { name: "The Ritz-Carlton Hiroshima", price: "ca. 350€/N", vibe: "Luxus am Fluss mit Ausblick", type: "Luxury", rating: "⭐⭐⭐⭐⭐" }
  ]},
  { city: "Kanazawa (2N)", hotels: [
    { name: "Daiwa Roynet Hotel Kanazawa", price: "ca. 130€/N", vibe: "Premium, nah bei Schloss & Gärten", type: "Upper Mid-Range", rating: "⭐⭐⭐⭐⭐" },
    { name: "Hotel Mystays Kanazawa Castle", price: "ca. 90€/N", vibe: "Modernes Budget-Hotel am Schloss", type: "Business Hotel", rating: "⭐⭐⭐⭐" }
  ]},
  { city: "Takayama (1N)", hotels: [
    { name: "Spa Hotel Alpina Takayama", price: "ca. 110€/N", vibe: "Berghütten-Feeling mit Onsen", type: "Onsen Resort", rating: "⭐⭐⭐⭐⭐" },
    { name: "Spa Hotel Assantei", price: "ca. 95€/N", vibe: "Traditionell, gutes Preis-Leistung", type: "Ryokan", rating: "⭐⭐⭐⭐" }
  ]},
  { city: "Matsumoto (1N)", hotels: [
    { name: "Hotel Buena Vista Matsumoto", price: "ca. 100€/N", vibe: "Direkt gegenüber der Burg", type: "Mid-Range", rating: "⭐⭐⭐⭐" },
    { name: "Agape Matsumoto", price: "ca. 80€/N", vibe: "Gemütlich, Familie-geführt", type: "Guesthouse", rating: "⭐⭐⭐⭐" }
  ]},
  { city: "Fuji/Hakone (2N)", hotels: [
    { name: "Hakone Ginyu (Ryokan)", price: "ca. 250€/N incl. Dinner", vibe: "Premium-Ryokan mit Fuji-Ausblick & privates Onsen", type: "Luxury Ryokan", rating: "⭐⭐⭐⭐⭐" },
    { name: "Hotel Mt. Fuji", price: "ca. 120€/N", vibe: "See-Lage mit Fuji-Blick", type: "Mid-Range Resort", rating: "⭐⭐⭐⭐" },
    { name: "Fuji Lakeside Hotel", price: "ca. 85€/N", vibe: "Budget mit schönem See-Blick", type: "Business Hotel", rating: "⭐⭐⭐" }
  ]},
  { city: "Tokio (3N)", hotels: [
    { name: "Shinjuku Granbell Hotel", price: "ca. 130€/N", vibe: "Design-Hotel, kreativ & zentral in Shinjuku", type: "Boutique Hotel", rating: "⭐⭐⭐⭐⭐" },
    { name: "Hotel Metropolitan Tokyo", price: "ca. 100€/N", vibe: "Klassisch, zentral, gutes Preis-Leistung", type: "Business Hotel", rating: "⭐⭐⭐⭐" },
    { name: "Mitsui Garden Hotel Shibuya", price: "ca. 140€/N", vibe: "Modern & trendy in Shibuya", type: "Upper Mid-Range", rating: "⭐⭐⭐⭐⭐" }
  ]}
];

const ChecklistData = [
  { id: 1, text: "Reisepass (Gültigkeit prüfen)" },
  { id: 2, text: "Visit Japan Web (Einreiseformular) ausfüllen" },
  { id: 3, text: "eSIM oder Pocket WiFi bestellen" },
  { id: 4, text: "Kreditkarten (Visa/Mastercard) freischalten" },
  { id: 5, text: "Steckdosen-Adapter (Typ A) einpacken" },
  { id: 6, text: "Erste Unterkunft gebucht?" },
  { id: 7, text: "Internationale Krankenversicherung" }
];

const TripData = [
  { 
    day: 0, 
    date: "30. Okt 2026", 
    weekday: "Freitag", 
    title: "Abflug MUC (Finnair)", 
    location: "München -> Osaka", 
    summary: "Start der Japan-Expedition.",
    description: "Wir nehmen die Qualitäts-Option über Helsinki! Schnelle Nordroute, entspannter Umstieg. Der Flug startet vormittags bequem um 10:30 Uhr in München.",
    transportLegs: [
      { time: "10:30", route: "München (MUC) -> Osaka (KIX)", type: "Flight", ticket: "ca. 1.090€", notes: "1 Stopp in Helsinki (HEL). Ankunft 12:50 am nächsten Tag." }
    ],
    activities: []
  },
  { 
    day: 1, 
    date: "31. Okt 2026", 
    weekday: "Samstag", 
    title: "Ankunft in Osaka", 
    location: "Osaka", 
    summary: "Ankunft, Pass & Hotel Drop-off.",
    description: "Willkommen! Landung um 12:50 Uhr. Perfekte Zeit, um entspannt durch Zoll und Einreise zu kommen.",
    transportLegs: [
      { time: "12:50", route: "Landung in Osaka (KIX)", type: "Flight", notes: "Einreise & Zoll (ca. 1 Std)" },
      { time: "14:05", route: "KIX -> Namba Station", type: "Train", ticket: "1.450 JPY", notes: "Nankai Rapi:t Beta 46" }
    ],
    activities: [
      { time: "17:00", title: "Shinsekai Retro Viertel", duration: "1.5 Std", price: "Kostenlos" },
      { time: "19:00", title: "Dotonbori Neon-Walk", duration: "Offen", price: "Kostenlos" }
    ]
  },
  { 
    day: 2, 
    date: "01. Nov 2026", 
    weekday: "Sonntag", 
    title: "Koyasan - Die Pilgerreise", 
    location: "Koyasan", 
    summary: "Der Weg ist das Ziel. Zwei Optionen für den Aufstieg: Wanderung oder mit der Standseilbahn. Wir reisen mit Daypack.",
    description: "Der Weg ist das Ziel. Zwei Optionen für den Aufstieg: Wanderung oder mit der Standseilbahn. Wir reisen mit Daypack.",
    transportLegs: [
      { time: "08:00", route: "Namba -> Koyasan", type: "Train", ticket: "2.050 JPY", notes: "Ltd. Exp. Koya" },
      { time: "09:30", route: "Gokurakubashi -> Koyasan", type: "Train", ticket: "750 JPY", notes: "Standseilbahn + Bus" }
    ],
    activities: [
      { time: "10:30", title: "Choishi Michi Trail", duration: "3-4 Std", price: "Kostenlos ⭐" },
      { time: "16:30", title: "Meditation im Tempel", duration: "45 Min", price: "Inklusive" }
    ]
  },
  { 
    day: 3, 
    date: "02. Nov 2026", 
    weekday: "Montag", 
    title: "Transfer nach Hiroshima", 
    location: "Hiroshima", 
    description: "Vom Heiligen Berg zur Stadt des Friedens.",
    transportLegs: [
      { time: "08:30", route: "Tempel -> Koyasan Station", type: "Bus", ticket: "Inklusive", notes: "Nankai Bus" },
      { time: "11:45", route: "Shin-Osaka -> Hiroshima", type: "Train", ticket: "9.000 JPY", notes: "Shinkansen Sakura/Mizuho (1h 30m)" }
    ],
    activities: [
      { time: "14:30", title: "Peace Memorial Park", duration: "2 Std", price: "200 JPY" },
      { time: "17:30", title: "Orizuru Tower", duration: "1 Std", price: "1.700 JPY ⭐" }
    ]
  },
  { 
    day: 4, 
    date: "03. Nov 2026", 
    weekday: "Dienstag", 
    title: "Garten-Oase & Transfer Kanazawa", 
    location: "Kanazawa", 
    description: "Entspannter Vormittag im Shukkei-en Garten. Dann Shinkansen nach Kanazawa.",
    transportLegs: [
      { time: "10:00", route: "Shukkei-en", type: "Walk", ticket: "Kostenlos", notes: "15 Min zu Fuß" },
      { time: "12:57", route: "Hiroshima -> Shin-Osaka", type: "Train", ticket: "9.000 JPY", notes: "Shinkansen Sakura 550" },
      { time: "14:42", route: "Shin-Osaka -> Tsuruga", type: "Train", ticket: "7.000 JPY", notes: "Thunderbird 29 (Pass Start!)" }
    ],
    activities: [
      { time: "10:30", title: "Shukkei-en Garten", duration: "1.5 Std", price: "260 JPY ⭐" }
    ]
  },
  { 
    day: 5, 
    date: "04. Nov 2026", 
    weekday: "Mittwoch", 
    title: "UNESCO Weltkulturerbe Shirakawa-go", 
    location: "Takayama", 
    description: "Gassho-zukuri Häuser und Takayama erkunden.",
    transportLegs: [
      { time: "08:10", route: "Kanazawa -> Shirakawa-go", type: "Bus", ticket: "2.470 JPY", notes: "Nohi Bus (Reservierung!)" },
      { time: "13:15", route: "Shirakawa-go -> Takayama", type: "Bus", ticket: "2.600 JPY", notes: "Nohi Bus" }
    ],
    activities: [
      { time: "09:45", title: "Shiroyama Viewpoint", duration: "30 Min", price: "Kostenlos ⭐" },
      { time: "15:30", title: "Higashiyama Walking", duration: "2 Std", price: "Kostenlos ⭐" }
    ]
  },
  { 
    day: 6, 
    date: "05. Nov 2026", 
    weekday: "Donnerstag", 
    title: "Alpen-Traversierung nach Matsumoto", 
    location: "Matsumoto", 
    description: "Über die Pässe zur Schwarzen Burg.",
    transportLegs: [
      { time: "09:40", route: "Takayama -> Matsumoto", type: "Bus", ticket: "3.500 JPY", notes: "Alpico Bus" },
      { time: "12:05", route: "Ankunft Matsumoto", type: "Bus", ticket: "Kostenlos", notes: "Gepäck ins Hotel" }
    ],
    activities: [
      { time: "14:00", title: "Burg Matsumoto", duration: "1.5 Std", price: "700 JPY ⭐" },
      { time: "16:00", title: "Altstadt Nawate", duration: "1.5 Std", price: "Kostenlos ⭐" }
    ]
  },
  { 
    day: 7, 
    date: "06. Nov 2026", 
    weekday: "Freitag", 
    title: "Direkt zum Fuji", 
    location: "Fuji", 
    description: "Transfer zur Südseite des Fuji.",
    transportLegs: [
      { time: "08:00", route: "Matsumoto -> Shin-Fuji", type: "Train", ticket: "4.000 JPY", notes: "Azusa + Fujikawa" },
      { time: "12:15", route: "Shin-Fuji -> Hotel", type: "Bus", ticket: "5.000 JPY", notes: "Taxi" }
    ],
    activities: [
      { time: "13:30", title: "Lake Tanuki Walk", duration: "1.5 Std", price: "Kostenlos (Fuji-View) ⭐" }
    ]
  },
  { 
    day: 8, 
    date: "07. Nov 2026", 
    weekday: "Samstag", 
    title: "Fuji Radtour & nach Tokio", 
    location: "Tokio", 
    description: "Morgens Radtour, abends Shinkansen nach Tokio.",
    transportLegs: [
      { time: "17:13", route: "Shin-Fuji -> Tokio", type: "Train", ticket: "5.600 JPY", notes: "Shinkansen Kodama" }
    ],
    activities: [
      { time: "10:00", title: "See-Umrundung (Rad)", duration: "1.5 Std", price: "500 JPY ⭐" }
    ]
  },
  { 
    day: 9, 
    date: "08. Nov 2026", 
    weekday: "Sonntag", 
    title: "Tokio West: Shibuya & Shinjuku", 
    location: "Tokio", 
    description: "High-Tech, Schreine und Neonlicht.",
    transportLegs: [],
    activities: [
      { time: "16:00", title: "Shibuya Sky Sunset", duration: "1.5 Std", price: "2.200 JPY ⭐" },
      { time: "18:00", title: "Shibuya Crossing", duration: "30 Min", price: "Kostenlos" }
    ]
  },
  { 
    day: 10, 
    date: "09. Nov 2026", 
    weekday: "Montag", 
    title: "Tokio Ost: Old Tokyo & Hipster", 
    location: "Tokio", 
    description: "Das alte Tokio und Vintage-Viertel.",
    transportLegs: [],
    activities: [
      { time: "10:00", title: "Yanaka Ginza", duration: "2 Std", price: "Kostenlos (Old Tokyo) ⭐" },
      { time: "14:00", title: "Shimokitazawa", duration: "3 Std", price: "Kostenlos (Vintage) ⭐" }
    ]
  },
  { 
    day: 11, 
    date: "10. Nov 2026", 
    weekday: "Dienstag", 
    title: "Bonus-Tag Tokio & Rückflug", 
    location: "Tokio -> München", 
    description: "Flug startet 21:55 Uhr! Ein kompletter letzter Tag in Tokio.",
    transportLegs: [
      { time: "19:00", route: "Shibuya -> Haneda Airport", type: "Train", ticket: "1.000 JPY", notes: "Keikyu Line" },
      { time: "21:55", route: "Haneda (HND) -> München", type: "Flight", ticket: "ca. 1.090€", notes: "Finnair via Helsinki. Ankunft Mi 09:30." }
    ],
    activities: [
      { time: "10:00", title: "Meiji Schrein", duration: "2 Std", price: "Kostenlos (Morgen) ⭐" },
      { time: "14:00", title: "Omotesando", duration: "2 Std", price: "Letzte Einkäufe" }
    ]
  }
];

const TransportIcon = ({ type }) => {
  switch (type) {
    case "Train": return <Train size={16} color="#64748b" />;
    case "Flight": return <Plane size={16} color="#3b82f6" />;
    case "Bus": return <Bus size={16} color="#f59e0b" />;
    case "Walk": return <Footprints size={16} color="#16a34a" />;
    default: return <Clock size={16} color="#94a3b8" />;
  }
};

const DayCard = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ ...styles.card, border: '1px solid #e2e8f0', marginBottom: '16px' }}>
      <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }} onClick={() => setIsOpen(!isOpen)}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', width: '100%' }}>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            width: '56px', 
            height: '56px',
            backgroundColor: '#f8fafc',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            position: 'relative'
          }}>
            <div style={{ position: 'absolute', top: 0, width: '100%', height: '6px', backgroundColor: '#0f172a' }}></div>
            <span style={{ fontSize: '10px', fontWeight: 700, color: '#94a3b8', marginTop: '4px' }}>{data.weekday.substring(0,2).toUpperCase()}</span>
            <span style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>{data.date.substring(0,2)}</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>{data.location}</div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>{data.title}</h3>
          </div>
        </div>
        <div style={{ color: '#94a3b8', marginLeft: '8px' }}>
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>

      {isOpen && (
        <div style={{ padding: '20px 16px', borderTop: '1px solid #e2e8f0', backgroundColor: '#ffffff' }}>
          <p style={{ marginBottom: '20px', color: '#475569', fontSize: '14px', lineHeight: 1.6 }}>{data.description}</p>
          
          {data.transportLegs && data.transportLegs.length > 0 && (
            <div style={{ marginBottom: '20px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
              <div style={{ backgroundColor: '#e2e8f0', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #e2e8f0' }}>
                <Train size={16} color: '#4f46e5' />
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#334155', textTransform: 'uppercase' }}>Transport</span>
              </div>
              {data.transportLegs.map((leg, idx) => (
                <div key={idx} style={{ padding: '12px 16px', borderTop: idx > 0 ? '1px solid #e2e8f0' : 'none', display: 'flex', gap: '12px' }}>
                  <div style={{ fontFamily: 'monospace', fontSize: '12px', fontWeight: 700, color: '#64748b', minWidth: '48px' }}>{leg.time}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <TransportIcon type={leg.type} />
                      <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{leg.route}</span>
                    </div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>{leg.notes}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {data.activities && data.activities.length > 0 && (
            <div>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>
                <Camera size={16} color="#dc2626" /> Highlights
              </h4>
              {data.activities.map((act, idx) => (
                <div key={idx} style={{ padding: '12px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <span style={{ fontWeight: 700, fontSize: '14px', color: '#0f172a' }}>{act.title}</span>
                    <span style={{ fontSize: '12px', fontFamily: 'monospace', backgroundColor: '#f1f5f9', padding: '4px 8px', borderRadius: '4px', color: '#64748b' }}>{act.time}</span>
                  </div>
                  <p style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>{act.duration} • {act.price}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const CurrencyConverter = () => {
  const [yen, setYen] = useState("");
  const euro = yen ? (Number(yen) / 165).toFixed(2) : "-";

  return (
    <div style={styles.section}>
      <div style={styles.sectionHeader}>
        <Banknote size={20} color="#16a34a" />
        <span>Währungsrechner</span>
      </div>
      <div style={{ padding: '20px', display: 'flex', gap: '16px', alignItems: 'flex-end' }}>
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: '10px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Yen (JPY)</label>
          <input 
            type="number" 
            value={yen} 
            onChange={(e) => setYen(e.target.value)} 
            placeholder="0"
            style={{ width: '100%', padding: '12px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px' }}
          />
        </div>
        <div style={{ paddingBottom: '12px', color: '#94a3b8', fontWeight: 700 }}>≈</div>
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: '10px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Euro (EUR)</label>
          <div style={{ width: '100%', padding: '12px', backgroundColor: '#eef2ff', border: '1px solid #c7d2fe', borderRadius: '8px', fontWeight: 700, textAlign: 'center', color: '#312e81' }}>
            {euro} €
          </div>
        </div>
      </div>
    </div>
  );
};

const Tools = () => {
  const [checks, setChecks] = useState({});
  const toggleCheck = (id) => setChecks(prev => ({...prev, [id]: !prev[id]}));

  return (
    <div>
      <CurrencyConverter />
      <div style={{ backgroundColor: '#1e293b', color: '#ffffff', padding: '24px', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', textAlign: 'center', marginBottom: '24px' }}>
        <span style={{ color: '#94a3b8', fontSize: '12px', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Geschätztes Budget</span>
        <span style={{ display: 'block', fontSize: '40px', fontWeight: 900, marginTop: '8px' }}>ca. 2.600 €</span>
        <span style={{ color: '#64748b', fontSize: '10px', marginTop: '8px', display: 'block', fontStyle: 'italic' }}>Pro Person, exkl. Shopping</span>
      </div>
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <CheckSquare size={20} color="#f59e0b" />
          <span>To-Do Liste</span>
        </div>
        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {ChecklistData.map((item) => (
            <label key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '8px', cursor: 'pointer', userSelect: 'none' }}>
              <input 
                type="checkbox" 
                onChange={() => toggleCheck(item.id)} 
                checked={!!checks[item.id]}
                style={{ width: '16px', height: '16px', cursor: 'pointer' }}
              />
              <span style={{ fontSize: '14px', color: checks[item.id] ? '#94a3b8' : '#334155', textDecoration: checks[item.id] ? 'line-through' : 'none' }}>
                {item.text}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState("diary");

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.title}>
            Japan<span style={styles.titleAccent}>2026</span>
          </h1>
          <nav style={styles.nav}>
            {["diary", "tools", "info"].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={styles.navButton(activeTab === tab)}
              >
                {tab === "diary" ? "Tagebuch" : tab === "info" ? "Infos" : "Rechner"}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <main style={styles.main}>
        {activeTab === "diary" && (
          <div>
            {TripData.map(day => <DayCard key={day.day} data={day} />)}
          </div>
        )}

        {activeTab === "tools" && (
          <div>
            <Tools />
          </div>
        )}

        {activeTab === "info" && (
          <div>
            <div style={styles.section}>
              <div style={styles.sectionHeader}>
                <Hotel size={20} color="#ec4899" />
                <span>Hotel-Vorschläge</span>
              </div>
              <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {HotelSuggestions.map((city, idx) => (
                  <div key={idx}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {city.city}
                    </div>
                    {city.hotels.map((hotel, hidx) => (
                      <div key={hidx} style={{ padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px', marginBottom: '8px', border: '1px solid #e2e8f0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '4px' }}>
                          <span style={{ fontWeight: 700, fontSize: '13px', color: '#0f172a' }}>{hotel.name}</span>
                          <span style={{ fontSize: '11px', fontWeight: 700, backgroundColor: '#fef3c7', padding: '3px 8px', borderRadius: '4px', color: '#92400e' }}>{hotel.price}</span>
                        </div>
                        <p style={{ fontSize: '11px', color: '#64748b', marginBottom: '4px' }}>{hotel.vibe}</p>
                        <div style={{ fontSize: '10px', color: '#94a3b8', display: 'flex', gap: '12px' }}>
                          <span>{hotel.type}</span>
                          <span>{hotel.rating}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div style={styles.section}>
              <div style={styles.sectionHeader}>
                <FileText size={20} color="#4f46e5" />
                <span>Einreise & Visum</span>
              </div>
              {EntryData.map((item, idx) => (
                <div key={idx} style={{ padding: '16px', borderTop: idx > 0 ? '1px solid #e2e8f0' : 'none' }}>
                  <span style={{ fontWeight: 700, color: '#0f172a', display: 'block', marginBottom: '4px' }}>{item.title}</span>
                  <p style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
