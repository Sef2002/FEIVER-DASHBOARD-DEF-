import React, { useState } from 'react';
import CalendarSelector from '../components/calendar/CalendarSelector';
import CalendarGrid from '../components/calendar/CalendarGrid';
import Card from '../components/ui/Card';

const CalendarsOverview = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 text-3xl font-bold text-black">Agenda</h1>
        <p className="text-base text-gray-500">
          Seleziona una data e visualizza tutti gli appuntamenti per ogni barber
        </p>
      </div>

      <div className="flex gap-6">
        {/* Left: Date Picker (35% width) */}
        <div className="w-[35%] flex-shrink-0">
          <Card className="aspect-square flex items-center">
            <CalendarSelector
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </Card>
        </div>

        {/* Right: Appointment Columns (65% width) */}
        <div className="w-[65%] grid grid-cols-2 gap-4">
          {/* Alket */}
          <Card className="h-[calc(100vh-220px)] overflow-hidden">
            <CalendarGrid barber="alket" selectedDate={selectedDate} />
          </Card>

          {/* Gino */}
          <Card className="h-[calc(100vh-220px)] overflow-hidden">
            <CalendarGrid barber="gino" selectedDate={selectedDate} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CalendarsOverview;