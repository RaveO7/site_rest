import React, { useEffect, useState } from 'react';
import { supabaseAdmin } from './supabaseAdminClient';
import { useToast } from './ToastContext';

export default function MenuAdmin() {
  const [sections, setSections] = useState([]);
  const [plats, setPlats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newSection, setNewSection] = useState('');
  const [newPlat, setNewPlat] = useState({ menu_id: '', name: '', description: '', price: '' });
  const [editPlats, setEditPlats] = useState({});
  const showToast = useToast();

  useEffect(() => { fetchData(); }, []);

  async function fetchData() {
    setLoading(true);
    const { data: menuRows } = await supabaseAdmin.from('menu').select('*').order('order', { ascending: true });
    const { data: platsRows } = await supabaseAdmin.from('plats').select('*').order('order', { ascending: true });
    setSections(menuRows || []);
    setPlats(platsRows || []);
    setEditPlats({});
    setLoading(false);
  }

  async function addSection() {
    if (!newSection.trim()) return;
    await supabaseAdmin.from('menu').insert([{ name: newSection, order: sections.length }]);
    setNewSection('');
    showToast('Section ajoutée !');
    fetchData();
  }

  async function deleteSection(id) {
    await supabaseAdmin.from('plats').delete().eq('menu_id', id);
    await supabaseAdmin.from('menu').delete().eq('id', id);
    showToast('Section supprimée', 'error');
    fetchData();
  }

  async function addPlat() {
    if (!newPlat.menu_id || !newPlat.name.trim()) return;
    await supabaseAdmin.from('plats').insert([{ ...newPlat, menu_id: Number(newPlat.menu_id), order: plats.filter(p => p.menu_id === Number(newPlat.menu_id)).length }]);
    setNewPlat({ menu_id: '', name: '', description: '', price: '' });
    showToast('Plat ajouté !');
    fetchData();
  }

  async function deletePlat(id) {
    await supabaseAdmin.from('plats').delete().eq('id', id);
    showToast('Plat supprimé', 'error');
    fetchData();
  }

  function handleEditPlatChange(platId, field, value) {
    setEditPlats(e => ({ ...e, [platId]: { ...e[platId], [field]: value } }));
  }

  async function handleEditPlatBlur(plat) {
    const edit = editPlats[plat.id];
    if (!edit) return;
    if (edit.name === plat.name && edit.description === plat.description && edit.price === plat.price) return;
    await supabaseAdmin.from('plats').update(edit).eq('id', plat.id);
    showToast('Plat modifié !');
    setPlats(plats => plats.map(p => p.id === plat.id ? { ...p, ...edit } : p));
    setEditPlats(e => { const { [plat.id]: _, ...rest } = e; return rest; });
  }

  async function movePlat(platsList, idx, dir) {
    if ((dir === -1 && idx === 0) || (dir === 1 && idx === platsList.length - 1)) return;
    const a = platsList[idx];
    const b = platsList[idx + dir];
    // swap local
    setPlats(plats => plats.map(p => {
      if (p.id === a.id) return { ...p, order: b.order };
      if (p.id === b.id) return { ...p, order: a.order };
      return p;
    }));
    // swap en base
    await supabaseAdmin.from('plats').update({ order: b.order }).eq('id', a.id);
    await supabaseAdmin.from('plats').update({ order: a.order }).eq('id', b.id);
    showToast('Ordre modifié !');
  }

  if (loading) return <div>Chargement...</div>;

  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Gestion du menu</h2>
      <div style={{ marginBottom: 30, display: 'flex', gap: 12 }}>
        <input value={newSection} onChange={e => setNewSection(e.target.value)} placeholder="Nouvelle section" style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }} />
        <button onClick={addSection} style={{ background: '#4ade80', color: '#232946', border: 'none', borderRadius: 6, padding: '10px 18px', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Ajouter section</button>
      </div>
      <div style={{ display: 'grid', gap: 28 }}>
        {sections.map(section => {
          const platsList = plats.filter(p => p.menu_id === section.id).sort((a, b) => a.order - b.order);
          return (
            <div key={section.id} style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px #0001', padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <span style={{ fontWeight: 700, fontSize: 20 }}>{section.name}</span>
                <button style={{ marginLeft: 18, background: '#f87171', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 14px', fontWeight: 600, cursor: 'pointer' }} onClick={() => deleteSection(section.id)}>Supprimer section</button>
              </div>
              <div style={{ marginBottom: 16, display: 'flex', gap: 8 }}>
                <input placeholder="Nom du plat" value={newPlat.menu_id === String(section.id) ? newPlat.name : ''} onChange={e => setNewPlat(p => ({ ...p, menu_id: String(section.id), name: e.target.value }))} style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', fontSize: 15 }} />
                <input placeholder="Description" value={newPlat.menu_id === String(section.id) ? newPlat.description : ''} onChange={e => setNewPlat(p => ({ ...p, menu_id: String(section.id), description: e.target.value }))} style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', fontSize: 15 }} />
                <input placeholder="Prix" value={newPlat.menu_id === String(section.id) ? newPlat.price : ''} onChange={e => setNewPlat(p => ({ ...p, menu_id: String(section.id), price: e.target.value }))} style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', fontSize: 15, width: 90 }} />
                <button onClick={addPlat} style={{ background: '#4ade80', color: '#232946', border: 'none', borderRadius: 6, padding: '8px 16px', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>Ajouter plat</button>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {platsList.map((plat, pIdx) => {
                  const edit = editPlats[plat.id] || plat;
                  return (
                    <li key={plat.id} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, background: '#f7f7fa', borderRadius: 6, padding: '8px 12px' }}>
                      <button
                        style={{ background: '#eebbc3', color: '#232946', border: 'none', borderRadius: 5, padding: '4px 8px', fontWeight: 700, fontSize: 16, cursor: pIdx === 0 ? 'not-allowed' : 'pointer', opacity: pIdx === 0 ? 0.5 : 1 }}
                        disabled={pIdx === 0}
                        onClick={() => movePlat(platsList, pIdx, -1)}
                        title="Monter"
                      >↑</button>
                      <button
                        style={{ background: '#eebbc3', color: '#232946', border: 'none', borderRadius: 5, padding: '4px 8px', fontWeight: 700, fontSize: 16, cursor: pIdx === platsList.length - 1 ? 'not-allowed' : 'pointer', opacity: pIdx === platsList.length - 1 ? 0.5 : 1 }}
                        disabled={pIdx === platsList.length - 1}
                        onClick={() => movePlat(platsList, pIdx, 1)}
                        title="Descendre"
                      >↓</button>
                      <input
                        value={edit.name}
                        onChange={e => handleEditPlatChange(plat.id, 'name', e.target.value)}
                        onBlur={() => handleEditPlatBlur(plat)}
                        style={{ fontWeight: 500, fontSize: 16, border: '1px solid #ccc', borderRadius: 5, padding: '4px 8px', width: 140 }}
                      />
                      <input
                        value={edit.description}
                        onChange={e => handleEditPlatChange(plat.id, 'description', e.target.value)}
                        onBlur={() => handleEditPlatBlur(plat)}
                        style={{ color: '#888', fontSize: 15, border: '1px solid #ccc', borderRadius: 5, padding: '4px 8px', flex: 1 }}
                      />
                      <input
                        value={edit.price}
                        onChange={e => handleEditPlatChange(plat.id, 'price', e.target.value)}
                        onBlur={() => handleEditPlatBlur(plat)}
                        style={{ fontWeight: 600, color: '#232946', fontSize: 15, border: '1px solid #ccc', borderRadius: 5, padding: '4px 8px', width: 70 }}
                      />
                      <button style={{ marginLeft: 'auto', background: '#f87171', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 12px', fontWeight: 600, cursor: 'pointer' }} onClick={() => deletePlat(plat.id)}>Supprimer</button>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
} 