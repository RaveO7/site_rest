import React, { useEffect, useState } from 'react';
import { supabaseAdmin } from './supabaseAdminClient';
import { useToast } from './ToastContext';

export default function SiteInfoAdmin() {
  const [info, setInfo] = useState({ name: '', slogan: '', about: '', ville: '', meta_description: '', primary_color: '#4F46E5', secondary_color: '#F59E42', header_image: '' });
  const [loading, setLoading] = useState(true);
  const showToast = useToast();
  // Pour stocker la valeur temporaire avant validation
  const [draft, setDraft] = useState({ name: '', slogan: '', about: '', ville: '', meta_description: '', primary_color: '#4F46E5', secondary_color: '#F59E42', header_image: '' });

  useEffect(() => { fetchInfo(); }, []);

  async function fetchInfo() {
    setLoading(true);
    const { data } = await supabaseAdmin.from('site_info').select('*');
    if (data && data[0]) {
      setInfo(data[0]);
      setDraft(data[0]);
    }
    setLoading(false);
  }

  async function updateField(field) {
    if (draft[field] === info[field]) return;
    setInfo(i => ({ ...i, [field]: draft[field] }));
    await supabaseAdmin.from('site_info').update({ [field]: draft[field] }).eq('id', 1);
    showToast('Modifié !');
  }

  if (loading) return <div>Chargement...</div>;

  return (
    <div style={{ maxWidth: 700, margin: '0 auto' }}>
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Infos générales du site</h2>
      <div style={{ marginBottom: 18 }}>
        <label style={{ fontWeight: 600 }}>Nom du restaurant :</label>
        <input
          value={draft.name}
          onChange={e => setDraft(d => ({ ...d, name: e.target.value }))}
          onBlur={() => updateField('name')}
          style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16, marginTop: 4 }}
        />
      </div>
      <div style={{ marginBottom: 18 }}>
        <label style={{ fontWeight: 600 }}>Slogan :</label>
        <input
          value={draft.slogan}
          onChange={e => setDraft(d => ({ ...d, slogan: e.target.value }))}
          onBlur={() => updateField('slogan')}
          style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16, marginTop: 4 }}
        />
      </div>
      <div style={{ marginBottom: 18 }}>
        <label style={{ fontWeight: 600 }}>Présentation :</label>
        <textarea
          value={draft.about}
          onChange={e => setDraft(d => ({ ...d, about: e.target.value }))}
          onBlur={() => updateField('about')}
          rows={4}
          style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16, marginTop: 4 }}
        />
      </div>
      <div style={{ marginBottom: 18 }}>
        <label style={{ fontWeight: 600 }}>Ville :</label>
        <input
          value={draft.ville}
          onChange={e => setDraft(d => ({ ...d, ville: e.target.value }))}
          onBlur={() => updateField('ville')}
          style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16, marginTop: 4 }}
        />
      </div>
      <div style={{ marginBottom: 18 }}>
        <label style={{ fontWeight: 600 }}>Description SEO :</label>
        <textarea
          value={draft.meta_description}
          onChange={e => setDraft(d => ({ ...d, meta_description: e.target.value }))}
          onBlur={() => updateField('meta_description')}
          rows={3}
          style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16, marginTop: 4 }}
          placeholder="Ex : Restaurant à Lyon, cuisine maison, produits frais, ambiance conviviale..."
        />
      </div>
      <div style={{ marginBottom: 18, display: 'flex', gap: 24 }}>
        <div style={{ flex: 1 }}>
          <label style={{ fontWeight: 600 }}>Couleur principale :</label>
          <input
            type="color"
            value={draft.primary_color || '#4F46E5'}
            onChange={e => setDraft(d => ({ ...d, primary_color: e.target.value }))}
            onBlur={() => updateField('primary_color')}
            style={{ width: 60, height: 40, border: 'none', background: 'none', marginLeft: 12, verticalAlign: 'middle' }}
          />
          <span style={{ marginLeft: 12 }}>{draft.primary_color}</span>
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ fontWeight: 600 }}>Couleur secondaire :</label>
          <input
            type="color"
            value={draft.secondary_color || '#F59E42'}
            onChange={e => setDraft(d => ({ ...d, secondary_color: e.target.value }))}
            onBlur={() => updateField('secondary_color')}
            style={{ width: 60, height: 40, border: 'none', background: 'none', marginLeft: 12, verticalAlign: 'middle' }}
          />
          <span style={{ marginLeft: 12 }}>{draft.secondary_color}</span>
        </div>
      </div>
      <div style={{ marginBottom: 18 }}>
        <label style={{ fontWeight: 600 }}>Image d'accueil (URL) :</label>
        <input
          type="text"
          value={draft.header_image || ''}
          onChange={e => setDraft(d => ({ ...d, header_image: e.target.value }))}
          onBlur={() => updateField('header_image')}
          style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16, marginTop: 4 }}
          placeholder="https://..."
        />
        {draft.header_image && (
          <div style={{ marginTop: 10 }}>
            <img src={draft.header_image} alt="Aperçu header" style={{ maxWidth: 320, maxHeight: 180, borderRadius: 8, boxShadow: '0 2px 12px #0002' }} />
          </div>
        )}
      </div>
    </div>
  );
} 