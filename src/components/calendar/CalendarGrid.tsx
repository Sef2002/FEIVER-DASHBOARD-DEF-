import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { FormattedAppointment, getBarberAppointments, subscribeToAppointments } from '@/lib/appointments';
import { ErrorBoundary } from 'react-error-boundary';
import { Loader2 } from 'lucide-react';
import { BARBER_IDS, BARBER_IMAGES } from '@/lib/constants';

interface Props {
  barber: 'alket' | 'gino';
  selectedDate: Date;
}

const workingHours = Array.from({ length: 16 }, (_, i) => {
  const hour = 6 + i;
  return `${hour.toString().padStart(2, '0')}:00`;
});

const getBarberUUID = (barber: string): string => {
  switch (barber) {
    case 'alket':
      return BARBER_IDS.ALKET;
    case 'gino':
      return BARBER_IDS.GINO;
    default:
      throw new Error(`Invalid barber: ${barber}`);
  }
};

const ErrorFallback = ({ error }: { error: Error }) => (
  <div className="flex h-full items-center justify-center p-4 text-center">
    <div>
      <p className="text-lg font-semibold text-red-600">Something went wrong:</p>
      <p className="mt-2 text-gray-600">{error.message}</p>
    </div>
  </div>
);

const LoadingState = () => (
  <div className="flex h-full items-center justify-center">
    <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
  </div>
);

const CalendarGrid: React.FC<Props> = ({ barber, selectedDate }) => {
  const [appointments, setAppointments] = useState<FormattedAppointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const fetchAppointments = async () => {
      setIsLoading(true);
      try {
        const barberId = getBarberUUID(barber);
        const data = await getBarberAppointments(barberId, selectedDate);
        setAppointments(data);

        unsubscribe = subscribeToAppointments(barberId, (updatedAppointments) => {
          setAppointments(updatedAppointments);
        });
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [barber, selectedDate]);

  if (isLoading) {
    return <LoadingState />;
  }

  const barberId = getBarberUUID(barber);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex items-center gap-4 border-b p-4 bg-gray-50">
          <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-gray-200">
            <img 
              src={BARBER_IMAGES[barberId]} 
              alt={barber}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold capitalize">{barber}</h2>
            <p className="text-sm text-gray-500">{format(selectedDate, 'EEEE d MMMM')}</p>
          </div>
        </div>

        {/* Time grid */}
        <div className="flex-1 overflow-y-auto">
          <div className="relative min-h-full">
            {workingHours.map((hour, i) => (
              <div
                key={hour}
                className="absolute left-0 w-full border-b border-gray-100 pl-3 pt-1 text-sm text-gray-500"
                style={{ top: `${i * 60}px`, height: '60px' }}
              >
                {hour}
              </div>
            ))}

            {appointments.map((appt) => {
              const [startHour, startMin] = appt.start.split(':').map(Number);
              const [endHour, endMin] = appt.end.split(':').map(Number);

              const startMins = startHour * 60 + startMin;
              const endMins = endHour * 60 + endMin;
              const offsetTop = startMins - 360;
              const height = endMins - startMins;

              return (
                <div
                  key={appt.id}
                  className="absolute left-[70px] right-3 cursor-move rounded-lg bg-black/90 p-3 text-white shadow-lg transition-all hover:bg-black"
                  style={{ top: `${offsetTop}px`, height: `${height}px` }}
                >
                  <div className="flex h-full flex-col justify-between">
                    <div>
                      <div className="text-base font-semibold">{appt.customer}</div>
                      {appt.phone && (
                        <div className="text-sm text-gray-300">📞 {appt.phone}</div>
                      )}
                      <div className="text-sm text-gray-300">{appt.treatment}</div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span>{appt.start} - {appt.end}</span>
                        <span className="text-gray-300">({appt.duration} min)</span>
                      </div>
                      <span className="font-medium">€{appt.price}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default CalendarGrid;