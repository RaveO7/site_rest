import React, { useEffect, useState } from 'react';
import { supabaseAdmin } from './supabaseAdminClient';
import { useToast } from './ToastContext';

export default function ContactAdmin() {
  const [contact, setContact] = useState({ address: '', phone: '', email: '', map_url: '' });
  const [draft, setDraft] = useState({ address: '', phone: '', email: '', map_url: '' });
  const [loading, setLoading] = useState(true);
  const showToast = useToast();

  useEffect(() => { fetchContact(); }, []);

  async function fetchContact() {
    setLoading(true);
    const { data } = await supabaseAdmin.from('contact').select('*');
    if (data && data[0]) {
      setContact(data[0]);
      setDraft(data[0]);
    }
    setLoading(false);
  }

  async function updateField(field) {
    if (draft[field] === contact[field]) return;
    setContact(c => ({ ...c, [field]: draft[field] }));
    await supabaseAdmin.from('contact').update({ [field]: draft[field] }).eq('id', 1);
    showToast('Modifié !');
  }

  if (loading) return <div>Chargement...</div>;

  return (
    <div style={{ maxWidth: 700, margin: '0 auto' }}>
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Contact</h2>
      <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px #0001', padding: 28 }}>
        <div style={{ marginBottom: 22 }}>
          <label style={{ fontWeight: 600 }}>Adresse :</label>
          <input
            value={draft.address}
            onChange={e => setDraft(d => ({ ...d, address: e.target.value }))}
            onBlur={() => updateField('address')}
            style={{ width: '100%', padding: 12, borderRadius: 6, border: '1px solid #ccc', fontSize: 16, marginTop: 4 }}
          />
        </div>
        <div style={{ marginBottom: 22 }}>
          <label style={{ fontWeight: 600 }}>Téléphone :</label>
          <input
            value={draft.phone}
            onChange={e => setDraft(d => ({ ...d, phone: e.target.value }))}
            onBlur={() => updateField('phone')}
            style={{ width: '100%', padding: 12, borderRadius: 6, border: '1px solid #ccc', fontSize: 16, marginTop: 4 }}
          />
        </div>
        <div style={{ marginBottom: 22 }}>
          <label style={{ fontWeight: 600 }}>Email :</label>
          <input
            value={draft.email}
            onChange={e => setDraft(d => ({ ...d, email: e.target.value }))}
            onBlur={() => updateField('email')}
            style={{ width: '100%', padding: 12, borderRadius: 6, border: '1px solid #ccc', fontSize: 16, marginTop: 4 }}
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label style={{ fontWeight: 600 }}>URL Google Maps :</label>
          <input
            value={draft.map_url}
            onChange={e => setDraft(d => ({ ...d, map_url: e.target.value }))}
            onBlur={() => updateField('map_url')}
            style={{ width: '100%', padding: 12, borderRadius: 6, border: '1px solid #ccc', fontSize: 16, marginTop: 4 }}
          />
        </div>
      </div>
    </div>
  );
} 