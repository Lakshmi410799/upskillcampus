import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div id="toast-container" className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => {
        let icon = <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;

        if (toast.type === 'error') {
          icon = <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />;
        } else if (toast.type === 'warning') {
          icon = <AlertCircle className="w-5 h-5 text-[#fbbf24] shrink-0" />;
        } else if (toast.type === 'info') {
          icon = <Info className="w-5 h-5 text-sky-400 shrink-0" />;
        }

        return (
          <div
            key={toast.id}
            id={`toast-${toast.id}`}
            className="pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-2xl bg-[#0f172a] border border-slate-700/80 shadow-2xl text-white text-sm animate-in slide-in-from-bottom-3 duration-200"
          >
            <div className="flex items-center gap-3">
              {icon}
              <p className="font-semibold text-xs leading-tight text-white">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
