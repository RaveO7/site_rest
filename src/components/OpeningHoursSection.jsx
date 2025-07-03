import React from 'react';
import { ClockIcon } from '@heroicons/react/24/outline';
import { useSiteData } from './SiteDataContext';

const DAYS = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
const DAY_LABELS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

// Formate une heure ("HH:mm:ss" ou "HH:mm") en "HH:mm"
const formatHour = h => h ? h.split(':').slice(0, 2).join(':') : '';

// Regroupe les jours consécutifs ayant les mêmes horaires
function groupDaysByHours(openingHours) {
  const dayHours = DAYS.map(day => {
    const slots = openingHours.filter(h => h.day === day);
    return slots.length ? slots.map(slot => `${formatHour(slot.open)} - ${formatHour(slot.close)}`).join(', ') : 'Fermé';
  });
  const groups = [];
  let start = 0;
  for (let i = 1; i <= DAYS.length; i++) {
    if (i === DAYS.length || dayHours[i] !== dayHours[start]) {
      groups.push({ from: start, to: i - 1, hours: dayHours[start] });
      start = i;
    }
  }
  return groups;
}

const OpeningHoursSection = () => {
  const { openingHours } = useSiteData();
  const groups = groupDaysByHours(openingHours);

  // Affiche le label de jour(s) pour un groupe
  const renderDayLabel = (from, to) =>
    from === to ? DAY_LABELS[from] :
    to === from + 1 ? `${DAY_LABELS[from]}, ${DAY_LABELS[to]}` :
    `Du ${DAY_LABELS[from]} au ${DAY_LABELS[to]}`;

  return (
    <section id="horaires" className="relative py-20 px-4" style={{ background: "repeating-linear-gradient(135deg, #f9f6f2 0 40px, #f7f3ee 40px 80px)" }}>
      <div className="w-full max-w-xl mx-auto rounded-2xl shadow-2xl border border-gray-200 bg-white p-8 md:p-12 relative overflow-hidden slide-up" data-aos="fade-up">
        <div className="flex flex-col items-center mb-6">
          <span className="bg-secondary/20 rounded-full p-4 mb-2"><ClockIcon className="w-10 h-10 text-secondary" /></span>
          <h2 className="text-3xl md:text-4xl font-lora font-bold text-primary text-center drop-shadow-sm">Horaires d'ouverture</h2>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <div className="w-16 border-t-4 border-dashed border-secondary mb-4"></div>
          <ul className="text-gray-700 text-lg md:text-xl space-y-2 text-center font-montserrat">
            {groups.map((g, idx) => (
              <li key={idx}>
                <span className="font-semibold text-primary block">{renderDayLabel(g.from, g.to)} :</span>
                {g.hours === 'Fermé' ? (
                  <span className="block text-secondary font-bold">Fermé</span>
                ) : (
                  <span className="block">{g.hours}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
        {/* Motif décoratif bas et haut */}
        <div className="absolute left-0 right-0 bottom-0 h-6 bg-repeat-x opacity-10 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'6\' viewBox=\'0 0 100 6\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 3 Q 25 0 50 3 T 100 3\' stroke=\'%23bdb6a3\' stroke-width=\'1.5\' fill=\'none\'/%3E%3C/svg%3E")' }}></div>
        <div className="rotate-180 absolute left-0 right-0 top-0 h-6 bg-repeat-x opacity-10 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'6\' viewBox=\'0 0 100 6\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 3 Q 25 0 50 3 T 100 3\' stroke=\'%23bdb6a3\' stroke-width=\'1.5\' fill=\'none\'/%3E%3C/svg%3E")' }}></div>
      </div>
    </section>
  );
};

export default OpeningHoursSection; 