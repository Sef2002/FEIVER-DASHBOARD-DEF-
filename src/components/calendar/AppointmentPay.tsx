import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { FormattedAppointment } from '@/lib/appointments';
import { Portal } from '@/components/ui/portal';
import { supabase } from '@/lib/supabase';

interface AppointmentPayProps {
  appointment: FormattedAppointment;
  onClose: () => void;
  onConfirm: (updated: FormattedAppointment & { payment_method: string }) => void;
}

const AppointmentPay: React.FC<AppointmentPayProps> = ({ appointment, onClose, onConfirm }) => {
  const [price, setPrice] = useState(appointment.price);
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('Contanti');
  const [isConfirming, setIsConfirming] = useState(false);
  const [alreadyPaid, setAlreadyPaid] = useState(false);

  const finalAmount = Math.max(0, price - discount);

  useEffect(() => {
    // Check if this appointment already has a transaction
    const checkTransaction = async () => {
      const { data, error } = await supabase
        .from('transactions')
        .select('id')
        .eq('appointment_id', appointment.id)
        .single();

      if (data) setAlreadyPaid(true);
    };

    checkTransaction();
  }, [appointment.id]);

 const handleConfirm = async () => {
  if (alreadyPaid) return; // ⛔ Block second payment silently

  setIsConfirming(true);

  const payload = {
    appointment_id: appointment.id,
    barber_id: appointment.barber_id,
    service_id: appointment.service_id,
    payment_method: paymentMethod,
    price,
    discount,
    completed_at: new Date().toISOString(),
  };

  try {
    const { error: insertError } = await supabase.from('transactions').insert([payload]);
    if (insertError) throw insertError;

    const { error: updateError } = await supabase
      .from('appointments')
      .update({ appointment_status: 'pagato' })
      .eq('id', appointment.id);
    if (updateError) throw updateError;

    onConfirm({
      ...appointment,
      price: finalAmount,
      payment_method: paymentMethod,
    });
  } catch (err) {
    console.error('Errore:', err);
    // Do not show alert here anymore
  } finally {
    setIsConfirming(false);
  }
};

  return (
    <Portal>
      <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 z-50">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Conferma Pagamento</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-black">
              <X />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Cliente</p>
              <p className="font-semibold">{appointment.customer}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Trattamento</p>
              <p className="font-semibold">{appointment.treatment}</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Prezzo (€)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full border rounded px-3 py-2"
                disabled={alreadyPaid}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Sconto (€)</label>
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
                className="w-full border rounded px-3 py-2"
                disabled={alreadyPaid}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Metodo di Pagamento</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full border rounded px-3 py-2"
                disabled={alreadyPaid}
              >
                <option value="Contanti">Contanti</option>
                <option value="Carta">Carta</option>
                <option value="POS">POS</option>
                <option value="Satispay">Satispay</option>
                <option value="Altro">Altro</option>
              </select>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-600">Totale:</p>
              <p className="text-xl font-bold">€{finalAmount.toFixed(2)}</p>
            </div>

            <button
              onClick={handleConfirm}
              disabled={isConfirming || alreadyPaid}
              className={`w-full py-2 rounded text-white ${
                alreadyPaid
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {alreadyPaid
                ? 'Pagamento già effettuato'
                : isConfirming
                ? 'Conferma in corso...'
                : 'Conferma Pagamento'}
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default AppointmentPay;