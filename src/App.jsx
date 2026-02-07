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
