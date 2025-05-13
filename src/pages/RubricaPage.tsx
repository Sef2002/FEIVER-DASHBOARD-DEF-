import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, UserPlus, Phone, Mail, Calendar } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import AddClientModal from '@/components/AddClientModal';
import BookingModal from '@/components/BookingModal';

const RubricaPage = () => {
  const [clients, setClients] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [bookingClient, setBookingClient] = useState<any>(null);

  const fetchClients = async () => {
    const { data: clientsData } = await supabase.from('rubrica').select('*');
    const today = new Date().toISOString().split('T')[0];

    const { data: pastAppointments } = await supabase
      .from('appointments')
      .select('customer_email, appointment_date')
      .lt('appointment_date', today);

    const latestAppointments: Record<string, string> = {};
    pastAppointments?.forEach((appt) => {
      const email = appt.customer_email;
      const date = appt.appointment_date;
      if (!latestAppointments[email] || date > latestAppointments[email]) {
        latestAppointments[email] = date;
      }
    });

    const { data: futureAppointments } = await supabase
      .from('appointments')
      .select('customer_email, appointment_date')
      .gte('appointment_date', today);

    const nextAppointments: Record<string, string> = {};
    futureAppointments?.forEach((appt) => {
      const email = appt.customer_email;
      const date = appt.appointment_date;
      if (!nextAppointments[email] || date < nextAppointments[email]) {
        nextAppointments[email] = date;
      }
    });

    const enrichedClients = (clientsData || []).map((client) => ({
      ...client,
      lastVisit: latestAppointments[client.customer_email] || null,
      nextVisit: nextAppointments[client.customer_email] || null,
    }));

    setClients(enrichedClients);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 text-3xl font-bold text-black">Rubrica</h1>
        <p className="text-base text-gray-500">
          Gestisci i tuoi clienti e i loro appuntamenti
        </p>
      </div>

      <Card>
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cerca cliente..."
              className="w-full rounded-md border border-gray-300 pl-10 pr-4 py-2 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>
          <Button className="flex items-center gap-2" onClick={() => setModalOpen(true)}>
            <UserPlus size={20} />
            <span>Nuovo Cliente</span>
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left">
                <th className="pb-3 text-sm font-medium text-gray-500">Cliente</th>
                <th className="pb-3 text-sm font-medium text-gray-500">Contatti</th>
                <th className="pb-3 text-sm font-medium text-gray-500">Ultima Visita</th>
                <th className="pb-3 text-sm font-medium text-gray-500">Prossimo Appuntamento</th>
                <th className="pb-3 text-sm font-medium text-gray-500"></th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id} className="border-b">
                  <td className="py-4">
                    <div className="font-medium">{client.customer_name}</div>
                  </td>
                  <td className="py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Phone size={16} />
                        {client.customer_phone}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Mail size={16} />
                        {client.customer_email}
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar size={16} />
                      {client.lastVisit
                        ? new Date(client.lastVisit).toLocaleDateString("it-IT")
                        : "—"}
                    </div>
                  </td>
                  <td className="py-4">
                    {client.nextVisit ? (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar size={16} />
                        {new Date(client.nextVisit).toLocaleDateString("it-IT")}
                      </div>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setBookingClient(client)}
                      >
                        Prenota
                      </Button>
                    )}
                  </td>
                  <td className="py-4 text-right">
                    <Button variant="ghost" size="sm">
                      Dettagli
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <AddClientModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={fetchClients}
      />

      {bookingClient && (
        <BookingModal
          client={bookingClient}
          onClose={() => setBookingClient(null)}
          onSuccess={() => {
            setBookingClient(null);
            fetchClients();
          }}
        />
      )}
    </div>
  );
};

export default RubricaPage;
