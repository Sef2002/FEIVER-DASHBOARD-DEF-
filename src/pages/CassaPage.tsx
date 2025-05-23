import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Euro, Receipt, CreditCard, Wallet } from 'lucide-react';

const CassaPage = () => {
  const transactions = [
    { id: 1, client: 'Marco Rossi', service: 'Taglio + Barba', amount: 35, method: 'Carta', time: '10:30' },
    { id: 2, client: 'Luca Bianchi', service: 'Taglio Capelli', amount: 25, method: 'Contanti', time: '11:15' },
    { id: 3, client: 'Giuseppe Verdi', service: 'Barba', amount: 15, method: 'Carta', time: '12:00' },
  ];

  const rows = [
    { label: 'Alket', total: 250, count: 9, card: 160, cash: 90, percentage: 52.6 },
    { label: 'Gino', total: 225, count: 9, card: 125, cash: 100, percentage: 47.4 },
    { label: 'Totale', total: 475, count: 18, card: 285, cash: 190, percentage: 100 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 text-3xl font-bold text-black">Cassa</h1>
        <p className="text-base text-gray-500">
          Gestisci le transazioni e monitora gli incassi giornalieri
        </p>
      </div>

      {rows.map((row) => (
        <div key={row.label} className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          <Card>
            <div className="flex items-center">
              <div className="mr-4 rounded-full bg-green-100 p-3">
                <Euro className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Incasso Giornaliero ({row.label})</p>
                <p className="text-2xl font-bold">€{row.total},00</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center">
              <div className="mr-4 rounded-full bg-blue-100 p-3">
                <Receipt className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Transazioni</p>
                <p className="text-2xl font-bold">{row.count}</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center">
              <div className="mr-4 rounded-full bg-purple-100 p-3">
                <CreditCard className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Pagamenti Carta</p>
                <p className="text-2xl font-bold">€{row.card},00</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center">
              <div className="mr-4 rounded-full bg-yellow-100 p-3">
                <Wallet className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Contanti</p>
                <p className="text-2xl font-bold">€{row.cash},00</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-4">
              <p className="text-sm text-gray-500">Percentuale del totale</p>
              <p className="text-2xl font-bold text-green-600">{row.percentage}%</p>
            </div>
          </Card>
        </div>
      ))}

      <Card>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Ultime Transazioni</h2>
          <Button variant="outline" size="sm">Tutte le transazioni</Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left">
                <th className="pb-3 text-sm font-medium text-gray-500">Orario</th>
                <th className="pb-3 text-sm font-medium text-gray-500">Cliente</th>
                <th className="pb-3 text-sm font-medium text-gray-500">Servizio</th>
                <th className="pb-3 text-sm font-medium text-gray-500">Importo</th>
                <th className="pb-3 text-sm font-medium text-gray-500">Metodo</th>
                <th className="pb-3 text-sm font-medium text-gray-500"></th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b">
                  <td className="py-4 text-sm">{transaction.time}</td>
                  <td className="py-4 text-sm font-medium">{transaction.client}</td>
                  <td className="py-4 text-sm text-gray-500">{transaction.service}</td>
                  <td className="py-4 text-sm font-medium">€{transaction.amount},00</td>
                  <td className="py-4 text-sm text-gray-500">{transaction.method}</td>
                  <td className="py-4 text-right">
                    <Button variant="ghost" size="sm">Dettagli</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button className="mt-4">Registra Pagamento</Button>
      </div>
    </div>
  );
};

export default CassaPage;
