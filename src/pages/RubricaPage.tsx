import React from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Search, UserPlus, Phone, Mail, Calendar } from 'lucide-react';

const RubricaPage = () => {
  const clients = [
    {
      id: 1,
      name: 'Marco Rossi',
      phone: '+39 333 1234567',
      email: 'marco.rossi@email.com',
      lastVisit: '15/02/2024',
      nextAppointment: '22/03/2024',
    },
    {
      id: 2,
      name: 'Luca Bianchi',
      phone: '+39 334 7654321',
      email: 'luca.bianchi@email.com',
      lastVisit: '20/02/2024',
      nextAppointment: null,
    },
    {
      id: 3,
      name: 'Giuseppe Verdi',
      phone: '+39 335 9876543',
      email: 'giuseppe.verdi@email.com',
      lastVisit: '18/02/2024',
      nextAppointment: '25/03/2024',
    },
  ];

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
          <Button className="flex items-center gap-2">
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
                    <div className="font-medium">{client.name}</div>
                  </td>
                  <td className="py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Phone size={16} />
                        {client.phone}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Mail size={16} />
                        {client.email}
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar size={16} />
                      {client.lastVisit}
                    </div>
                  </td>
                  <td className="py-4">
                    {client.nextAppointment ? (
                      <div className="flex items-center gap-2 text-sm text-green-600">
                        <Calendar size={16} />
                        {client.nextAppointment}
                      </div>
                    ) : (
                      <Button variant="outline" size="sm">
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
    </div>
  );
};

export default RubricaPage;