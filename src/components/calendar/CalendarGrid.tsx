import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import {
  FormattedAppointment,
  getBarberAppointments,
  subscribeToAppointments,
  updateAppointment,
} from '@/lib/appointments';
import { ErrorBoundary } from 'react-error-boundary';
import { Loader2 } from 'lucide-react';
import { BARBER_IDS, BARBER_IMAGES } from '@/lib/constants';
import AppointmentCard from './AppointmentCard';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

interface Props {
  barber: 'alket' | 'gino';
  selectedDate: Date;
}

const workingIntervals = Array.from({ length: 33 }, (_, i) => {
  const totalMinutes = 360 + i * 30;
  const hour = Math.floor(totalMinutes / 60).toString().padStart(2, '0');
  const min = (totalMinutes % 60).toString().padStart(2, '0');
  return `${hour}:${min}`;
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
      if (unsubscribe) unsubscribe();
    };
  }, [barber, selectedDate]);

  const computeEndTime = (start: string, duration: number) => {
    const [h, m] = start.split(':').map(Number);
    const startTime = new Date();
    startTime.setHours(h, m, 0, 0);
    const endTime = new Date(startTime.getTime() + duration * 60000);
    return endTime.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, delta } = event;
    const appt = appointments.find((appt) => appt.id === active.id);
    if (!appt) return;

    const minutesMoved = Math.round(delta.y / 4);
    const [startHour, startMin] = appt.start.split(':').map(Number);
    let newTotalMinutes = startHour * 60 + startMin + minutesMoved;

    // Clamp to 06:00 (360) - 22:00 (1320)
    newTotalMinutes = Math.max(360, Math.min(1320, newTotalMinutes));
    const snappedMinutes = Math.round(newTotalMinutes / 30) * 30;

    const newHour = Math.floor(snappedMinutes / 60);
    const newMin = snappedMinutes % 60;
    const newTime = `${String(newHour).padStart(2, '0')}:${String(newMin).padStart(2, '0')}`;

    const newDate = selectedDate.toLocaleDateString('sv-SE');

    try {
      await updateAppointment(appt.id, {
        appointment_time: newTime,
        appointment_date: newDate,
      });

      setAppointments((prev) =>
        prev.map((item) =>
          item.id === appt.id
            ? {
                ...item,
                start: newTime,
                end: computeEndTime(newTime, item.duration),
              }
            : item
        )
      );
      console.log(`🟢 Updated ${appt.customer} to ${newTime} on ${newDate}`);
    } catch (error) {
      console.error('❌ Failed to update appointment:', error);
    }
  };

  const barberId = getBarberUUID(barber);

  if (isLoading) return <LoadingState />;

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

        {/* Time Grid */}
        <div className="flex-1 overflow-y-auto relative" style={{ height: '3840px' }}>
          {workingIntervals.map((time, i) => (
            <div
              key={time}
              className="absolute left-0 w-full border-b border-gray-100 pl-3 pt-1 text-xs text-gray-500"
              style={{ top: `${i * 120}px`, height: '120px' }}
            >
              {time}
            </div>
          ))}

          <DndContext
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis]}
            collisionDetection={closestCenter}
          >
            {appointments.map((appt) => {
              const [startHour, startMin] = appt.start.split(':').map(Number);
              const [endHour, endMin] = appt.end.split(':').map(Number);
              const startMins = startHour * 60 + startMin;
              const endMins = endHour * 60 + endMin;
              const offsetTop = (startMins - 360) * 4;
              const height = (endMins - startMins) * 4;

              return (
                <AppointmentCard
                  key={appt.id}
                  appt={appt}
                  offsetTop={offsetTop}
                  height={height}
                />
              );
            })}
          </DndContext>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default CalendarGrid;
