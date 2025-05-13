// appointments.ts
import { supabase } from './supabase';

export interface Service {
  id: string;
  name: string;
  price: number;
  duration_min: number;
}

export interface Barber {
  id: string;
  name: string;
}

export interface Appointment {
  id: string;
  service_id: string;
  barber_id: string;
  appointment_date: string;
  appointment_time: string;
  duration_min: number;
  customer_name: string | null;
  customer_email: string | null;
  customer_phone: string | null;
  created_at: string;
  updated_at: string;
  services: Service;
  barbers: Barber;
}

export interface FormattedAppointment {
  id: string;
  start: string;
  end: string;
  customer: string | null;
  treatment: string;
  duration: number;
  price: number;
  phone?: string | null;
  barber_id: string;
  barber_name: string;
  service_id: string;
}

export const getBarberAppointments = async (
  barberId: string,
  date: Date
): Promise<FormattedAppointment[]> => {
  try {
    const appointmentDate = date.toLocaleDateString('sv-SE');

    const { data, error } = await supabase
      .from('appointments')
      .select(`
        id,
        appointment_time,
        duration_min,
        customer_name,
        customer_email,
        customer_phone,
        service_id,
        barber_id,
        appointment_date,
        created_at,
        updated_at,
        services (
          id,
          name,
          price,
          duration_min
        ),
        barbers (
          id,
          name
        )
      `)
      .eq('barber_id', barberId)
      .eq('appointment_date', appointmentDate)
      .order('appointment_time', { ascending: true });

    if (error) {
      throw new Error(`Error fetching appointments: ${error.message}`);
    }

    return (data || []).map((appointment: Appointment) => {
      const [hours, minutes] = appointment.appointment_time.split(':').map(Number);
      const startDate = new Date();
      startDate.setHours(hours, minutes, 0, 0);
      const endDate = new Date(startDate.getTime() + appointment.duration_min * 60000);

      return {
        id: appointment.id,
        start: startDate.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }),
        end: endDate.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }),
        customer: appointment.customer_name,
        treatment: appointment.services.name,
        duration: appointment.duration_min,
        price: appointment.services.price,
        phone: appointment.customer_phone,
        barber_id: appointment.barber_id,
        barber_name: appointment.barbers?.name ?? 'Sconosciuto',
        service_id: appointment.service_id,
      };
    });
  } catch (error) {
    console.error('Failed to fetch appointments:', error);
    throw error;
  }
};

export const subscribeToAppointments = (
  barberId: string,
  selectedDate: Date,
  callback: (appointments: FormattedAppointment[]) => void
) => {
  const subscription = supabase
    .channel('appointments')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'appointments',
        filter: `barber_id=eq.${barberId}`,
      },
      async () => {
        try {
          const appointments = await getBarberAppointments(barberId, selectedDate);
          callback(appointments);
        } catch (error) {
          console.error('Error refreshing appointments:', error);
        }
      }
    )
    .subscribe();

  return () => {
    subscription.unsubscribe();
  };
};

export const updateAppointment = async (
  id: string,
  updates: Partial<Appointment>
): Promise<void> => {
  const { error } = await supabase.from('appointments').update(updates).eq('id', id);
  if (error) {
    console.error('Error updating appointment:', error);
    throw new Error(`Failed to update appointment: ${error.message}`);
  }
};