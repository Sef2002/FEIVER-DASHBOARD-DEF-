import React, { useEffect, useState } from 'react';
import { format, isSameDay, isSameMonth } from 'date-fns';
import { getBarberAppointments, FormattedAppointment } from '@/lib/appointments';

interface CalendarProps {
  currentMonth: Date;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  daysInMonth: Date[];
}

const ALKET_UUID = '421add1b-66d3-477d-8244-af3f4fe21f39'; // replace if needed

const CalendarAlket: React.FC<CalendarProps> = ({
  currentMonth,
  selectedDate,
  setSelectedDate,
  daysInMonth,
}) => {
  const [appointments, setAppointments] = useState<FormattedAppointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const data = await getBarberAppointments(ALKET_UUID, selectedDate);
        console.log('Fetched appointments:', data); // Debugging
        setAppointments(data);
        setError(null);
      } catch (err) {
        setError('Errore nel recupero degli appuntamenti');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [selectedDate]);

  return (
    <div className="space-y-4 w-full">
      <h2 className="text-lg font-semibold">Calendario - Alket</h2>
      <div className="grid grid-cols-7 gap-px overflow-hidden rounded-lg bg-gray-200 text-sm">
        {['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'].map((day) => (
          <div key={day} className="bg-gray-50 p-2 text-center font-medium text-gray-500">
            {day}
          </div>
        ))}
        {daysInMonth.map((date, i) => (
          <button
            key={i}
            onClick={() => setSelectedDate(date)}
            className={`bg-white p-2 text-center transition-colors hover:bg-gray-50 ${
              !isSameMonth(date, currentMonth)
                ? 'text-gray-300'
                : isSameDay(date, selectedDate)
                ? 'bg-black text-white hover:bg-gray-800'
                : 'text-gray-900'
            }`}
          >
            {format(date, 'd')}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-sm text-gray-500">Caricamento appuntamenti...</p>
      ) : error ? (
        <p className="text-sm text-red-500">{error}</p>
      ) : (
        <div className="space-y-2">
          {appointments.map((appt) => (
            <div key={appt.id} className="bg-black text-white p-2 rounded shadow text-sm">
              <p>{appt.customer || 'Nome non disponibile'}</p>
              <p>{appt.treatment}</p>
              <p>
                {appt.start} – {appt.end}
              </p>
              <p>€{appt.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CalendarAlket;