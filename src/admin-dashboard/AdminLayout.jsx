import React from 'react';

const navItems = [
  { key: 'siteinfo', label: 'Infos', icon: 'ℹ️' },
  { key: 'menu', label: 'Menu', icon: '🍽️' },
  { key: 'gallery', label: 'Galerie', icon: '🖼️' },
  { key: 'hours', label: 'Horaires', icon: '⏰' },
  { key: 'contact', label: 'Contact', icon: '📞' },
];

export default function AdminLayout({ page, setPage, children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f7f7fa' }}>
      <aside style={{
        width: 220,
        background: '#232946',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '40px 0',
        position: 'sticky',
        top: 0,
        height: '100vh',
        zIndex: 10
      }}>
        <div style={{ fontWeight: 'bold', fontSize: 24, marginBottom: 40, letterSpacing: 1 }}>Admin</div>
        <nav style={{ width: '100%' }}>
          {navItems.map(item => (
            <button
              key={item.key}
              onClick={() => setPage(item.key)}
              style={{
                display: 'flex', alignItems: 'center', width: '100%', padding: '14px 30px',
                background: page === item.key ? '#eebbc3' : 'transparent',
                color: page === item.key ? '#232946' : '#fff',
                border: 'none', outline: 'none', cursor: 'pointer', fontSize: 18, fontWeight: 500,
                marginBottom: 6, borderRadius: 8, transition: 'background 0.2s, color 0.2s'
              }}
            >
              <span style={{ fontSize: 22, marginRight: 16 }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </aside>
      <main style={{ flex: 1, padding: '40px 5vw', maxWidth: 1100, margin: '0 auto' }}>
        {children}
      </main>
    </div>
  );
} 