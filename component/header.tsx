// components/Header.tsx
export default function Header() {
  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0.6rem 2rem',
      background: '#fff',
      borderBottom: '2px solid #2563EB'
    }}>
      {/* Logo */}
      <div style={{
        fontWeight: 'bold',
        fontSize: 26,
        color: '#2563EB',
        letterSpacing: 1,
        display: 'flex',
        alignItems: 'center'
      }}>
        EASY-<span style={{ color: '#F76513' }}>RENT</span>
      </div>

      {/* Barre de recherche moderne */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        background: '#f4f5fb',
        borderRadius: '2rem',
        padding: '0.8rem 2rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        minWidth: 220,
        maxWidth: 360
      }}>
        <svg width="24" height="24" fill="none" stroke="#2563EB" strokeWidth="2" style={{ marginRight: 12 }}>
          <circle cx="11" cy="11" r="7"/>
          <line x1="17" y1="17" x2="21" y2="21"/>
        </svg>
        <input
          type="text"
          placeholder="Search here"
          style={{
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontSize: 17,
            width: '100%',
            color: '#333'
          }}
        />
      </div>

      {/* Menu navigation */}
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        gap: '2rem',
        marginLeft: '3.3rem'
      }}>
        <a href="#" style={{
          color: '#2563EB',
          fontWeight: 600,
          textDecoration: 'underline',
          fontSize: 17
        }}>Home</a>
        <a href="#" style={{ color: '#222', fontWeight: 500, fontSize: 17 }}>Cars</a>
        <a href="#" style={{ color: '#222', fontWeight: 500, fontSize: 17 }}>Agencies</a>
        <a href="#" style={{ color: '#222', fontWeight: 500, fontSize: 17 }}>Help</a>
        <a href="#" style={{ color: '#222', fontWeight: 500, fontSize: 17 }}>About Us</a>
      </nav>

      {/* Icônes d'actions modernes */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1.6rem',
        marginLeft: '2rem'
      }}>
        {/* Favoris */}
        <svg width="22" height="22" fill="none" stroke="#F76513" strokeWidth="2" style={{cursor:'pointer'}}>
          <path d="M15.32 3C13.86 3 12.5 3.76 11.73 5.09C10.96 3.76 9.60 3 8.14 3C5.44 3 3.25 5.06 3.25 7.45C3.25 12.62 11.73 18.5 11.73 18.5C11.73 18.5 20.20 12.62 20.20 7.45C20.20 5.06 18.01 3 15.32 3Z"/>
        </svg>
        {/* Compte utilisateur */}
        <svg height="22" width="22" viewBox="0 0 24 24" style={{ fill: "#6D28D9", cursor:'pointer' }}>
          <circle cx="12" cy="8.5" r="4"/>
          <path d="M2,20 C2,16 9,15.3 12,15.3 C15,15.3 22,16 22,20"/>
        </svg>
        
      </div>
    </header>
  );
}
