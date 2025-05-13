// src/pages/StaffPage.tsx

import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Plus, Trash2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { BARBER_IDS } from '@/lib/constants';

const WEEKDAY_MAP: Record<string, string> = {
  Monday: 'Lunedì',
  Tuesday: 'Martedì',
  Wednesday: 'Mercoledì',
  Thursday: 'Giovedì',
  Friday: 'Venerdì',
  Saturday: 'Sabato',
  Sunday: 'Domenica'
};

const REVERSE_WEEKDAY_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(WEEKDAY_MAP).map(([en, it]) => [it, en])
);

const DAYS = Object.values(WEEKDAY_MAP);

interface TimeSlot {
  start: string;
  end: string;
}

interface DayAvailability {
  enabled: boolean;
  slots: TimeSlot[];
}

interface BarberData {
  availability: Record<string, DayAvailability>;
}

export default function StaffPage() {
  const [barberData, setBarberData] = useState<Record<string, BarberData>>({});

  useEffect(() => {
    for (const barberId of Object.values(BARBER_IDS)) {
      loadAvailability(barberId);
    }
  }, []);

  const loadAvailability = async (barberId: string) => {
    const initial: Record<string, DayAvailability> = {};
    DAYS.forEach(day => {
      initial[day] = { enabled: false, slots: [] };
    });

    const { data } = await supabase
      .from('barbers_availabilities')
      .select('*')
      .eq('barber_id', barberId);

    data?.forEach(({ weekday, start_time, end_time }) => {
      const dayIT = WEEKDAY_MAP[weekday];
      if (!initial[dayIT]) initial[dayIT] = { enabled: true, slots: [] };
      initial[dayIT].enabled = true;
      initial[dayIT].slots.push({ start: start_time, end: end_time });
    });

    setBarberData(prev => ({
      ...prev,
      [barberId]: { availability: initial }
    }));
  };

  const handleDayToggle = (barberId: string, day: string) => {
    setBarberData(prev => ({
      ...prev,
      [barberId]: {
        availability: {
          ...prev[barberId].availability,
          [day]: {
            ...prev[barberId].availability[day],
            enabled: !prev[barberId].availability[day].enabled
          }
        }
      }
    }));
  };

  const addSlot = (barberId: string, day: string) => {
    setBarberData(prev => ({
      ...prev,
      [barberId]: {
        availability: {
          ...prev[barberId].availability,
          [day]: {
            enabled: true,
            slots: [...prev[barberId].availability[day].slots, { start: '09:00', end: '18:00' }]
          }
        }
      }
    }));
  };

  const updateSlot = (
    barberId: string,
    day: string,
    index: number,
    field: 'start' | 'end',
    value: string
  ) => {
    setBarberData(prev => {
      const slots = prev[barberId].availability[day].slots.map((s, i) =>
        i === index ? { ...s, [field]: value } : s
      );
      return {
        ...prev,
        [barberId]: {
          availability: {
            ...prev[barberId].availability,
            [day]: { ...prev[barberId].availability[day], slots }
          }
        }
      };
    });
  };

  const removeSlot = (barberId: string, day: string, index: number) => {
    setBarberData(prev => {
      const slots = prev[barberId].availability[day].slots.filter((_, i) => i !== index);
      return {
        ...prev,
        [barberId]: {
          availability: {
            ...prev[barberId].availability,
            [day]: { ...prev[barberId].availability[day], slots }
          }
        }
      };
    });
  };

  const saveAvailability = async (barberId: string) => {
    const { availability } = barberData[barberId];

    // Delete old data
    await supabase.from('barbers_availabilities').delete().eq('barber_id', barberId);

    // Insert new
    const inserts = Object.entries(availability)
      .filter(([_, { enabled, slots }]) => enabled && slots.length)
      .flatMap(([itDay, { slots }]) =>
        slots.map(slot => ({
          barber_id: barberId,
          weekday: REVERSE_WEEKDAY_MAP[itDay],
          start_time: slot.start,
          end_time: slot.end
        }))
      );

    await supabase.from('barbers_availabilities').insert(inserts);

    // Refresh this barber only
    loadAvailability(barberId);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gestione orari</h1>
      <div className="flex gap-8">
        {Object.entries(BARBER_IDS).map(([name, id]) => (
          <Card key={id} className="flex-1 space-y-4 p-4">
            <h2 className="text-xl font-semibold">{name}</h2>
            <div className="flex items-center justify-between">
              <p className="font-medium">Disponibilità settimanale</p>
              <Button size="sm" onClick={() => saveAvailability(id)}>Salva</Button>
            </div>
            {DAYS.map(day => (
              <div key={day}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={barberData[id]?.availability[day]?.enabled}
                      onCheckedChange={() => handleDayToggle(id, day)}
                    />
                    <span>{day}</span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => addSlot(id, day)}
                    disabled={!barberData[id]?.availability[day]?.enabled}
                  >
                    <Plus className="w-4 h-4 mr-1" /> Aggiungi
                  </Button>
                </div>
                {barberData[id]?.availability[day]?.enabled && (
                  <div className="space-y-2">
                    {barberData[id].availability[day].slots.map((slot, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="time"
                          value={slot.start}
                          onChange={e => updateSlot(id, day, idx, 'start', e.target.value)}
                          className="border rounded px-2 py-1 text-sm"
                        />
                        <span>-</span>
                        <input
                          type="time"
                          value={slot.end}
                          onChange={e => updateSlot(id, day, idx, 'end', e.target.value)}
                          className="border rounded px-2 py-1 text-sm"
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeSlot(id, day, idx)}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </Card>
        ))}
      </div>
    </div>
  );
}