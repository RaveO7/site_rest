import React, { useEffect, useState } from 'react';
import { supabaseAdmin } from './supabaseAdminClient';
import { useToast } from './ToastContext';

export default function GalleryAdmin() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newImg, setNewImg] = useState({ src: '', legend: '' });
  const showToast = useToast();

  useEffect(() => { fetchGallery(); }, []);

  async function fetchGallery() {
    setLoading(true);
    const { data } = await supabaseAdmin.from('gallery').select('*').order('order', { ascending: true });
    setGallery(data || []);
    setLoading(false);
  }

  async function addImg() {
    if (!newImg.src.trim()) return;
    await supabaseAdmin.from('gallery').insert([{ ...newImg, order: gallery.length }]);
    setNewImg({ src: '', legend: '' });
    showToast('Image ajoutée !');
    fetchGallery();
  }

  async function deleteImg(id) {
    await supabaseAdmin.from('gallery').delete().eq('id', id);
    showToast('Image supprimée', 'error');
    fetchGallery();
  }

  async function updateImg(id, field, value) {
    await supabaseAdmin.from('gallery').update({ [field]: value }).eq('id', id);
    setGallery(gallery => gallery.map(img => img.id === id ? { ...img, [field]: value } : img));
    showToast('Modifié !');
  }

  async function moveImg(idx, dir) {
    if ((dir === -1 && idx === 0) || (dir === 1 && idx === gallery.length - 1)) return;
    const a = gallery[idx];
    const b = gallery[idx + dir];
    // swap local
    setGallery(gallery => gallery.map(img => {
      if (img.id === a.id) return { ...img, order: b.order };
      if (img.id === b.id) return { ...img, order: a.order };
      return img;
    }));
    // swap en base
    await supabaseAdmin.from('gallery').update({ order: b.order }).eq('id', a.id);
    await supabaseAdmin.from('gallery').update({ order: a.order }).eq('id', b.id);
    showToast('Ordre modifié !');
  }

  if (loading) return <div>Chargement...</div>;

  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Galerie</h2>
      <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px #0001', padding: 28, marginBottom: 30 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <input value={newImg.src} onChange={e => setNewImg(i => ({ ...i, src: e.target.value }))} placeholder="URL de l'image" style={{ flex: 2, padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }} />
          <input value={newImg.legend} onChange={e => setNewImg(i => ({ ...i, legend: e.target.value }))} placeholder="Légende" style={{ flex: 1, padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }} />
          <button onClick={addImg} style={{ background: '#4ade80', color: '#232946', border: 'none', borderRadius: 6, padding: '10px 18px', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Ajouter</button>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
        {gallery
          .slice()
          .sort((a, b) => a.order - b.order)
          .map((img, idx) => (
          <div key={img.id} style={{ background: '#f7f7fa', borderRadius: 10, boxShadow: '0 1px 6px #0001', padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
            <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
              <button
                style={{ background: '#eebbc3', color: '#232946', border: 'none', borderRadius: 5, padding: '4px 8px', fontWeight: 700, fontSize: 16, cursor: idx === 0 ? 'not-allowed' : 'pointer', opacity: idx === 0 ? 0.5 : 1 }}
                disabled={idx === 0}
                onClick={() => moveImg(idx, -1)}
                title="Monter"
              >↑</button>
              <button
                style={{ background: '#eebbc3', color: '#232946', border: 'none', borderRadius: 5, padding: '4px 8px', fontWeight: 700, fontSize: 16, cursor: idx === gallery.length - 1 ? 'not-allowed' : 'pointer', opacity: idx === gallery.length - 1 ? 0.5 : 1 }}
                disabled={idx === gallery.length - 1}
                onClick={() => moveImg(idx, 1)}
                title="Descendre"
              >↓</button>
            </div>
            <img src={img.src} alt={img.legend} style={{ maxWidth: 200, maxHeight: 120, objectFit: 'cover', borderRadius: 8, marginBottom: 10, background: '#fff' }} />
            <input
              value={img.legend}
              onChange={e => updateImg(img.id, 'legend', e.target.value)}
              style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', fontSize: 15, marginBottom: 8 }}
            />
            <input
              value={img.src}
              onChange={e => updateImg(img.id, 'src', e.target.value)}
              style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', fontSize: 15, marginBottom: 8 }}
            />
            <button onClick={() => deleteImg(img.id)} style={{ background: '#f87171', color: '#fff', border: 'none', borderRadius: 6, padding: '7px 16px', fontWeight: 600, fontSize: 15, cursor: 'pointer', marginTop: 4 }}>Supprimer</button>
          </div>
        ))}
      </div>
    </div>
  );
} 