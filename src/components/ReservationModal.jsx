import React from 'react';

// Modale de réservation
const ReservationModal = ({ show, onClose, reservationSent, onSubmit, reservationRef, setReservationSent }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" aria-modal="true" role="dialog" tabIndex={-1} onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative animate-fade-in" onClick={e => e.stopPropagation()}>
        <button className="absolute top-3 right-4 text-2xl text-gray-400 hover:text-primary pop-on-click" aria-label="Fermer la réservation" onClick={onClose} tabIndex={0}>&times;</button>
        {!reservationSent ? (
          <form onSubmit={onSubmit} className="flex flex-col gap-4" autoComplete="off">
            <h3 className="text-2xl font-lora font-bold mb-2 text-primary">Réserver une table</h3>
            <input ref={reservationRef} required className="border rounded px-3 py-2" type="text" name="nom" placeholder="Votre nom" />
            <input required className="border rounded px-3 py-2" type="email" name="email" placeholder="Votre email" />
            <div className="flex gap-2">
              <input required className="border rounded px-3 py-2 w-1/2" type="date" name="date" />
              <input required className="border rounded px-3 py-2 w-1/2" type="time" name="heure" />
            </div>
            <input required className="border rounded px-3 py-2" type="number" name="personnes" min="1" max="20" placeholder="Nombre de personnes" />
            <textarea className="border rounded px-3 py-2" name="message" placeholder="Message (optionnel)" rows={2}></textarea>
            <button type="submit" className="btn bg-primary text-white rounded-full px-6 py-2 font-bold mt-2 hover:bg-secondary transition pop-on-click">Envoyer</button>
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[180px]">
            <span className="text-3xl text-primary mb-4">✔️</span>
            <p className="text-lg font-lora text-center">Merci !<br />Votre demande de réservation a bien été envoyée.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationModal; 