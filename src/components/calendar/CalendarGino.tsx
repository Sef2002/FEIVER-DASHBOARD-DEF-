import React, { useEffect, useState } from 'react';
import { format, isSameDay, isSameMonth, startOfMonth, endOfMonth } from 'date-fns';
import { getBarberAppointments, FormattedAppointment } from '@/lib/appointments';

interface CalendarProps {
  currentMonth: Date;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  daysInMonth: Date[];
}

// ✅ Replace with Gino’s actual UUID from Supabase
const GINO_UUID = 'dafdd2d8-a439-45d6-addb-7fb50ff24c5c';

const CalendarGino: React.FC<CalendarProps> = ({
  currentMonth,
  selectedDate,
  setSelectedDate,
  daysInMonth,
}) => {
  const [appointments, setAppointments] = useState<FormattedAppointment[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const data = await getBarberAppointments(GINO_UUID, selectedDate);
        setAppointments(data);
      } catch (error) {
        console.error('Failed to load Gino appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [selectedDate]);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Calendario - Gino</h2>
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

      {/* Appointment rendering */}
      <div className="space-y-2">
        {loading ? (
          <p className="text-sm text-gray-500">Caricamento appuntamenti...</p>
        ) : appointments.length === 0 ? (
          <p className="text-sm text-gray-400">Nessun appuntamento per oggi.</p>
        ) : (
          appointments.map((appt) => (
            <div key={appt.id} className="bg-black text-white p-2 rounded-md shadow text-sm">
              <p className="font-semibold">{appt.customer}</p>
              <p>{appt.treatment}</p>
              <p>
                {appt.start} – {appt.end} · {appt.duration} min · €{appt.price}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CalendarGino;