import React from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Euro, Receipt, CreditCard, Wallet } from 'lucide-react';

const CassaPage = () => {
  const transactions = [
    { id: 1, client: 'Marco Rossi', service: 'Taglio + Barba', amount: 35, method: 'Carta', time: '10:30' },
    { id: 2, client: 'Luca Bianchi', service: 'Taglio Capelli', amount: 25, method: 'Contanti', time: '11:15' },
    { id: 3, client: 'Giuseppe Verdi', service: 'Barba', amount: 15, method: 'Carta', time: '12:00' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 text-3xl font-bold text-black">Cassa</h1>
        <p className="text-base text-gray-500">
          Gestisci le transazioni e monitora gli incassi giornalieri
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <div className="flex items-center">
            <div className="mr-4 rounded-full bg-green-100 p-3">
              <Euro className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Incasso Giornaliero</p>
              <p className="text-2xl font-bold">€475,00</p>
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
              <p className="text-2xl font-bold">18</p>
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
              <p className="text-2xl font-bold">€285,00</p>
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
              <p className="text-2xl font-bold">€190,00</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
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

        <Card>
          <h2 className="mb-6 text-xl font-semibold">Nuova Transazione</h2>
          <form className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Cliente
              </label>
              <input
                type="text"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="Nome cliente"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Servizio
              </label>
              <select className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:outline-none focus:ring-1 focus:ring-black">
                <option>Taglio Capelli</option>
                <option>Barba</option>
                <option>Taglio + Barba</option>
                <option>Shampoo</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Importo
              </label>
              <input
                type="number"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="0,00"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Metodo di Pagamento
              </label>
              <select className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:outline-none focus:ring-1 focus:ring-black">
                <option>Contanti</option>
                <option>Carta di Credito</option>
                <option>Bancomat</option>
              </select>
            </div>
            <Button className="w-full">Registra Pagamento</Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default CassaPage;