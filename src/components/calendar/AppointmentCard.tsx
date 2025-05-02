import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { FormattedAppointment } from '@/lib/appointments';

interface Props {
  appt: FormattedAppointment;
  offsetTop: number;
  height: number;
}

const AppointmentCard: React.FC<Props> = ({ appt, offsetTop, height }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: appt.id,
    data: {
      duration: appt.duration,
    },
  });

  const style = {
    height: `${height}px`,
    top: `${offsetTop}px`,
    transform: CSS.Translate.toString(transform),
    position: 'absolute',
    left: '70px',
    right: '12px',
    zIndex: isDragging ? 50 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`rounded-lg bg-black/90 px-3 py-2 text-white shadow-md transition-opacity ${
        isDragging ? 'opacity-50 cursor-grabbing' : 'cursor-grab'
      }`}
      {...attributes}
      {...listeners}
    >
      <div className="text-sm font-semibold">{appt.customer}</div>
      <div className="text-xs text-gray-300">{appt.treatment}</div>
      <div className="text-xs text-gray-400">
        {appt.start} - {appt.end} ({appt.duration} min)
      </div>
    </div>
  );
};

export default AppointmentCard;