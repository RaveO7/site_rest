import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'success', duration = 2500) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), duration);
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {toast && (
        <div style={{
          position: 'fixed', top: 30, right: 30, zIndex: 9999,
          background: toast.type === 'success' ? '#4ade80' : '#f87171',
          color: '#232946', padding: '16px 32px', borderRadius: 8,
          fontWeight: 600, fontSize: 18, boxShadow: '0 2px 16px #0002',
          minWidth: 200, textAlign: 'center', letterSpacing: 0.5
        }}>
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
} 