// AppointmentCard.tsx
import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { FormattedAppointment } from '@/lib/appointments';

interface Props {
  appt: FormattedAppointment;
  offsetTop: number;
  height: number;
  onEdit?: (appointment: FormattedAppointment) => void;
  onPay?: (appointment: FormattedAppointment) => void;
  isEditing?: boolean;
}

const AppointmentCard: React.FC<Props> = ({
  appt,
  offsetTop,
  height,
  onEdit,
  onPay,
  isEditing = false,
}) => {
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
    position: 'absolute' as const,
    left: '70px',
    right: '12px',
    zIndex: isDragging ? 50 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative rounded-lg bg-black/90 px-3 py-2 text-white shadow-md transition-opacity ${
        isDragging ? 'opacity-50 cursor-grabbing' : 'cursor-default'
      }`}
      {...attributes} // only accessibility attributes
    >
      {/* Drag Handle */}
      <div
        {...listeners}
        className="absolute top-1 left-1 cursor-grab text-xs text-white select-none"
      >
        ⠿
      </div>

      {/* Main Content */}
      <div className="text-sm font-semibold">{appt.customer}</div>
      <div className="text-xs text-gray-300">{appt.treatment}</div>
      <div className="text-xs text-gray-400">
        {appt.start} - {appt.end} ({appt.duration} min)
      </div>

      {/* Pay Button */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          if (onPay) {
            requestAnimationFrame(() => {
              onPay(appt);
            });
          }
        }}
        style={{
          backgroundColor: '#16a34a',
          color: 'white',
          padding: '4px',
          fontSize: '12px',
          position: 'absolute',
          bottom: '6px',
          left: '6px',
          zIndex: 100,
          cursor: 'pointer',
        }}
      >
        💵
      </div>

      {/* Edit Button */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          if (onEdit) {
            requestAnimationFrame(() => {
              onEdit(appt);
            });
          }
        }}
        style={{
          backgroundColor: 'red',
          color: 'white',
          padding: '4px',
          fontSize: '12px',
          position: 'absolute',
          bottom: '6px',
          right: '6px',
          zIndex: 100,
          cursor: 'pointer',
        }}
      >
        ✏️ Edit
      </div>
    </div>
  );
};

export default AppointmentCard;
