import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { appointmentStatuses } from '@/lib/constants';
import { Portal } from '@/components/ui/portal';

interface AppointmentEditorProps {
  appointment: any;
  onClose: () => void;
  onSave: (updated: any) => void;
}

export default function AppointmentEditor({
  appointment,
  onClose,
  onSave,
}: AppointmentEditorProps) {
  const [status, setStatus] = useState(appointment.status);
  const [duration, setDuration] = useState(appointment.duration_min);
  const [loading, setLoading] = useState(false);

  // ✅ Reset values when appointment changes (essential for re-opening)
  useEffect(() => {
    setStatus(appointment.status);
    setDuration(appointment.duration_min);
    console.log('🔁 Reset editor with:', appointment);
  }, [appointment]);

  const handleSave = async () => {
    setLoading(true);
    try {
      await onSave({
        ...appointment,
        status,
        duration_min: duration,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Portal>
      <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 z-[101]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Modifica Appuntamento</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-black">
              <X />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Stato</label>
              <select
                className="w-full border rounded px-3 py-2"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {appointmentStatuses.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Durata (minuti)</label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <button
              onClick={handleSave}
              disabled={loading}
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
            >
              {loading ? 'Salvataggio...' : 'Salva modifiche'}
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
}