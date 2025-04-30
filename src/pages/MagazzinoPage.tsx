import React from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Plus, Search, AlertTriangle } from 'lucide-react';

const MagazzinoPage = () => {
  const products = [
    {
      id: 1,
      name: 'Shampoo Professionale',
      brand: 'BarberPro',
      category: 'Shampoo',
      quantity: 15,
      minQuantity: 5,
      price: 18.90,
    },
    {
      id: 2,
      name: 'Gel Modellante',
      brand: 'StyleMaster',
      category: 'Styling',
      quantity: 3,
      minQuantity: 8,
      price: 12.50,
    },
    {
      id: 3,
      name: 'Olio da Barba',
      brand: 'BeardKing',
      category: 'Barba',
      quantity: 10,
      minQuantity: 4,
      price: 22.00,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-black">Magazzino</h1>
          <p className="text-base text-gray-500">
            Gestisci il tuo inventario di prodotti
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus size={20} />
          <span>Nuovo Prodotto</span>
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <Card>
          <div className="mb-6 flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cerca prodotto..."
                className="w-full rounded-md border border-gray-300 pl-10 pr-4 py-2 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>
            <select className="rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:outline-none focus:ring-1 focus:ring-black">
              <option value="">Tutte le categorie</option>
              <option value="shampoo">Shampoo</option>
              <option value="styling">Styling</option>
              <option value="barba">Barba</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-3 text-sm font-medium text-gray-500">Prodotto</th>
                  <th className="pb-3 text-sm font-medium text-gray-500">Categoria</th>
                  <th className="pb-3 text-sm font-medium text-gray-500">Quantità</th>
                  <th className="pb-3 text-sm font-medium text-gray-500">Prezzo</th>
                  <th className="pb-3 text-sm font-medium text-gray-500"></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b">
                    <td className="py-4">
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.brand}</div>
                      </div>
                    </td>
                    <td className="py-4 text-sm">{product.category}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <span className={`font-medium ${
                          product.quantity <= product.minQuantity ? 'text-red-600' : ''
                        }`}>
                          {product.quantity}
                        </span>
                        {product.quantity <= product.minQuantity && (
                          <AlertTriangle size={16} className="text-red-600" />
                        )}
                      </div>
                    </td>
                    <td className="py-4 font-medium">€{product.price.toFixed(2)}</td>
                    <td className="py-4 text-right">
                      <Button variant="ghost" size="sm">
                        Modifica
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <h2 className="mb-6 text-xl font-semibold">Scorte in Esaurimento</h2>
          <div className="space-y-4">
            {products
              .filter((product) => product.quantity <= product.minQuantity)
              .map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between rounded-lg border border-red-100 bg-red-50 p-4"
                >
                  <div>
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-gray-600">
                      Quantità: {product.quantity}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Ordina
                  </Button>
                </div>
              ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MagazzinoPage;