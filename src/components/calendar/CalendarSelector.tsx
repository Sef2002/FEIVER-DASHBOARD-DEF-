import React from 'react';
import { format, startOfMonth, endOfMonth, isSameMonth, isSameDay } from 'date-fns';
import { it } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../ui/Button';

interface Props {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

const CalendarSelector: React.FC<Props> = ({ selectedDate, setSelectedDate }) => {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  const generateCalendarDays = (month: Date) => {
    const start = startOfMonth(month);
    const end = endOfMonth(month);
    const days: Date[] = [];

    const startWeekDay = (start.getDay() + 6) % 7;
    for (let i = 0; i < startWeekDay; i++) {
      days.push(new Date(start.getTime() - (startWeekDay - i) * 86400000));
    }

    for (let d = start; d <= end; d = new Date(d.getTime() + 86400000)) {
      days.push(new Date(d));
    }

    return days;
  };

  const daysInMonth = generateCalendarDays(currentMonth);

  return (
    <div className="w-full p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold">
          {format(currentMonth, 'MMMM yyyy', { locale: it })}
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() =>
            setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
          }>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" onClick={() =>
            setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
          }>
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'].map((day) => (
          <div key={day} className="h-10 flex items-center justify-center font-medium text-gray-500">
            {day}
          </div>
        ))}
        {daysInMonth.map((date, i) => (
          <button
            key={i}
            onClick={() => setSelectedDate(date)}
            className={`h-10 w-10 rounded-full flex items-center justify-center transition-all ${
              !isSameMonth(date, currentMonth)
                ? 'text-gray-300'
                : isSameDay(date, selectedDate)
                ? 'bg-black text-white hover:bg-gray-800 transform scale-110'
                : 'hover:bg-gray-100'
            }`}
          >
            {format(date, 'd')}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CalendarSelector;