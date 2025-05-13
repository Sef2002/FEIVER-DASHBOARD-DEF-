import React, { useState } from 'react';
import CalendarSelector from '../components/calendar/CalendarSelector';
import CalendarGrid from '../components/calendar/CalendarGrid';
import { Card } from '@/components/ui/card';

const CalendarsOverview = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="flex h-full flex-col overflow-hidden px-6 pt-6">
      <div className="mb-6 flex-none">
        <h1 className="mb-2 text-3xl font-bold text-black">Agenda</h1>
        <p className="text-base text-gray-500">
          Seleziona una data e visualizza tutti gli appuntamenti per ogni barber
        </p>
      </div>

      <div className="flex flex-1 gap-4 overflow-hidden">
        {/* Left: Date Picker (fixed square size) */}
        <div className="h-[calc(100vh-theme(spacing.48))] aspect-square">
          <Card className="flex h-full items-center justify-center">
            <CalendarSelector
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </Card>
        </div>

        {/* Right: Appointment Columns (fill remaining space) */}
        <div className="grid flex-1 grid-cols-2 gap-4">
          {/* Alket */}
          <Card className="flex h-full w-full overflow-visible relative">
            <CalendarGrid barber="alket" selectedDate={selectedDate} />
          </Card>

          {/* Gino */}
          <Card className="flex h-full w-full overflow-visible relative">
            <CalendarGrid barber="gino" selectedDate={selectedDate} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CalendarsOverview;