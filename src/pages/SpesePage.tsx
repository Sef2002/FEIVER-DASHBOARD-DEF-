import React from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Plus, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

const SpesePage = () => {
  const expenses = [
    {
      id: 1,
      description: 'Prodotti per il salone',
      category: 'Forniture',
      amount: 450.00,
      date: '2024-03-15',
      supplier: 'BarberSupplies Inc.',
    },
    {
      id: 2,
      description: 'Utenze - Elettricità',
      category: 'Utenze',
      amount: 180.50,
      date: '2024-03-10',
      supplier: 'EnergiaPro',
    },
    {
      id: 3,
      description: 'Marketing Social Media',
      category: 'Marketing',
      amount: 250.00,
      date: '2024-03-05',
      supplier: 'DigitalAds Agency',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-black">Spese</h1>
          <p className="text-base text-gray-500">
            Gestisci le spese del tuo salone
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus size={20} />
          <span>Nuova Spesa</span>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <div className="flex items-center">
            <div className="mr-4 rounded-full bg-red-100 p-3">
              <TrendingDown className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Spese Mensili</p>
              <p className="text-2xl font-bold">€2,450.00</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="mr-4 rounded-full bg-green-100 p-3">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Budget Rimanente</p>
              <p className="text-2xl font-bold">€1,550.00</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="mr-4 rounded-full bg-blue-100 p-3">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Budget Mensile</p>
              <p className="text-2xl font-bold">€4,000.00</p>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Ultime Spese</h2>
          <div className="flex gap-2">
            <select className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black">
              <option value="">Tutte le categorie</option>
              <option value="forniture">Forniture</option>
              <option value="utenze">Utenze</option>
              <option value="marketing">Marketing</option>
            </select>
            <Button variant="outline" size="sm">Esporta</Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left">
                <th className="pb-3 text-sm font-medium text-gray-500">Data</th>
                <th className="pb-3 text-sm font-medium text-gray-500">Descrizione</th>
                <th className="pb-3 text-sm font-medium text-gray-500">Categoria</th>
                <th className="pb-3 text-sm font-medium text-gray-500">Fornitore</th>
                <th className="pb-3 text-sm font-medium text-gray-500">Importo</th>
                <th className="pb-3 text-sm font-medium text-gray-500"></th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id} className="border-b">
                  <td className="py-4 text-sm">{expense.date}</td>
                  <td className="py-4 text-sm font-medium">{expense.description}</td>
                  <td className="py-4 text-sm text-gray-500">{expense.category}</td>
                  <td className="py-4 text-sm text-gray-500">{expense.supplier}</td>
                  <td className="py-4 text-sm font-medium">€{expense.amount.toFixed(2)}</td>
                  <td className="py-4 text-right">
                    <Button variant="ghost" size="sm">Dettagli</Button>
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

export default SpesePage;