import React, { useEffect, useState } from 'react';
import { supabaseAdmin } from './supabaseAdminClient';
import { useToast } from './ToastContext';

const DAYS = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];

export default function HoursAdmin() {
  const [hours, setHours] = useState([]); // [{id, day, open, close}]
  const [loading, setLoading] = useState(true);
  const [newSlots, setNewSlots] = useState({}); // { day: { open: '', close: '' } }
  const showToast = useToast();

  useEffect(() => { fetchHours(); }, []);

  async function fetchHours() {
    setLoading(true);
    const { data } = await supabaseAdmin.from('opening_hours').select('*');
    setHours(data || []);
    setLoading(false);
  }

  function slotsByDay(day) {
    return hours.filter(h => h.day === day);
  }

  // Trouve le nombre max de créneaux sur tous les jours
  const maxSlots = Math.max(...DAYS.map(day => slotsByDay(day).length), 1);

  async function addSlot(day) {
    const slot = newSlots[day];
    if (!slot || !slot.open || !slot.close) return;
    await supabaseAdmin.from('opening_hours').insert([{ day, open: slot.open, close: slot.close }]);
    setNewSlots(s => ({ ...s, [day]: { open: '', close: '' } }));
    showToast('Créneau ajouté !');
    fetchHours();
  }

  async function deleteSlot(id) {
    await supabaseAdmin.from('opening_hours').delete().eq('id', id);
    showToast('Créneau supprimé', 'error');
    setHours(hs => hs.filter(h => h.id !== id));
  }

  async function updateSlot(id, field, value) {
    setHours(hs => hs.map(h => h.id === id ? { ...h, [field]: value } : h));
    await supabaseAdmin.from('opening_hours').update({ [field]: value }).eq('id', id);
    showToast('Modifié !');
  }

  if (loading) return <div>Chargement...</div>;

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Horaires d'ouverture</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px #0001' }}>
          <thead>
            <tr>
              <th style={{ padding: 14, fontWeight: 700, fontSize: 17, background: '#eebbc3', color: '#232946', border: 'none', textAlign: 'center' }}>Jour</th>
              {Array.from({ length: maxSlots }).map((_, idx) => (
                <th key={idx} style={{ padding: 14, fontWeight: 700, fontSize: 17, background: '#eebbc3', color: '#232946', border: 'none', textAlign: 'center' }}>{`Créneau ${idx + 1}`}</th>
              ))}
              <th style={{ padding: 14, background: '#eebbc3', border: 'none' }}></th>
            </tr>
          </thead>
          <tbody>
            {DAYS.map(day => {
              const slots = slotsByDay(day);
              return (
                <tr key={day}>
                  <td style={{ fontWeight: 700, textAlign: 'center', background: '#f7f7fa' }}>{day.charAt(0).toUpperCase() + day.slice(1)}</td>
                  {Array.from({ length: maxSlots }).map((_, idx) => {
                    const slot = slots[idx];
                    return (
                      <td key={idx} style={{ verticalAlign: 'top', padding: 12, minWidth: 160, borderTop: '1px solid #eee', textAlign: 'center' }}>
                        {slot ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}>
                            <input
                              type="time"
                              value={slot.open || ''}
                              onChange={e => updateSlot(slot.id, 'open', e.target.value)}
                              style={{ padding: 4, borderRadius: 5, border: '1px solid #ccc', fontSize: 15 }}
                            />
                            <span>-</span>
                            <input
                              type="time"
                              value={slot.close || ''}
                              onChange={e => updateSlot(slot.id, 'close', e.target.value)}
                              style={{ padding: 4, borderRadius: 5, border: '1px solid #ccc', fontSize: 15 }}
                            />
                            <button onClick={() => deleteSlot(slot.id)} style={{ background: '#f87171', color: '#fff', border: 'none', borderRadius: 5, padding: '4px 10px', fontWeight: 600, cursor: 'pointer' }}>Supprimer</button>
                          </div>
                        ) : (
                          <div style={{ color: '#f87171', fontWeight: 600 }}>Fermé</div>
                        )}
                      </td>
                    );
                  })}
                  <td style={{ padding: 12, minWidth: 160, textAlign: 'center', borderTop: '1px solid #eee' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}>
                      <input
                        type="time"
                        value={newSlots[day]?.open || ''}
                        onChange={e => setNewSlots(s => ({ ...s, [day]: { ...s[day], open: e.target.value } }))}
                        style={{ padding: 4, borderRadius: 5, border: '1px solid #ccc', fontSize: 15 }}
                      />
                      <span>-</span>
                      <input
                        type="time"
                        value={newSlots[day]?.close || ''}
                        onChange={e => setNewSlots(s => ({ ...s, [day]: { ...s[day], close: e.target.value } }))}
                        style={{ padding: 4, borderRadius: 5, border: '1px solid #ccc', fontSize: 15 }}
                      />
                      <button onClick={() => addSlot(day)} style={{ background: '#4ade80', color: '#232946', border: 'none', borderRadius: 5, padding: '4px 10px', fontWeight: 600, cursor: 'pointer' }}>Ajouter</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
} 