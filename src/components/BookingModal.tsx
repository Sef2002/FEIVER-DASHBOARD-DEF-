import React, { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabase';

interface BookingModalProps {
  client: any;
  onClose: () => void;
  onSuccess: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ client, onClose, onSuccess }) => {
  const [services, setServices] = useState<any[]>([]);
  const [barbers, setBarbers] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    appointment_date: '',
    appointment_time: '',
    service_id: '',
    barber_id: '',
  });

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  ];

  useEffect(() => {
    const fetchData = async () => {
      const { data: servicesData } = await supabase.from('services').select('*');
      setServices(servicesData || []);

      const { data: barbersData } = await supabase.from('barbers').select('*');
      const options = [{ id: 'any', name: 'Qualsiasi Staff' }, ...(barbersData || [])];
      setBarbers(options);
    };

    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { appointment_date, appointment_time, service_id, barber_id } = formData;
    if (!appointment_date || !appointment_time || !service_id || !barber_id) {
      alert('Compila tutti i campi obbligatori.');
      return;
    }

    const { error } = await supabase.from('appointments').insert({
      appointment_date,
      appointment_time,
      service_id,
      barber_id: barber_id === 'any' ? null : barber_id,
      customer_name: client.customer_name,
      customer_email: client.customer_email,
      customer_phone: client.customer_phone,
      appointment_status: 'in attesa',
    });

    if (error) {
      console.error(error);
    } else {
      onSuccess();
    }
  };

  return (
    <Dialog open={true} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <Dialog.Panel className="bg-white p-6 rounded-md w-full max-w-md">
        <Dialog.Title className="text-lg font-medium mb-4">
          Prenota appuntamento per {client.customer_name}
        </Dialog.Title>

        <div className="space-y-3">
          <Input
            type="date"
            name="appointment_date"
            value={formData.appointment_date}
            onChange={handleChange}
          />
          <select
            name="appointment_time"
            value={formData.appointment_time}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value="">Seleziona Orario</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
          <select
            name="service_id"
            value={formData.service_id}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value="">Seleziona Servizio</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>{service.name}</option>
            ))}
          </select>
          <select
            name="barber_id"
            value={formData.barber_id}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value="">Seleziona Barber</option>
            {barbers.map((barber) => (
              <option key={barber.id} value={barber.id}>{barber.name}</option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose}>Annulla</Button>
          <Button onClick={handleSubmit}>Conferma</Button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default BookingModal;