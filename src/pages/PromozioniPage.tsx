import React from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Plus, Calendar, Users, Percent } from 'lucide-react';

const PromozioniPage = () => {
  const promotions = [
    {
      id: 1,
      title: 'Sconto Studenti',
      description: '20% di sconto su tutti i servizi per studenti',
      discount: 20,
      validFrom: '2024-03-01',
      validTo: '2024-05-31',
      usageCount: 45,
      status: 'active',
    },
    {
      id: 2,
      title: 'Pacchetto Padre e Figlio',
      description: 'Taglio per due persone a prezzo speciale',
      discount: 15,
      validFrom: '2024-03-15',
      validTo: '2024-04-15',
      usageCount: 12,
      status: 'active',
    },
    {
      id: 3,
      title: 'Happy Hour Mattino',
      description: '10% di sconto su tutti i servizi prima delle 11:00',
      discount: 10,
      validFrom: '2024-03-01',
      validTo: '2024-06-30',
      usageCount: 28,
      status: 'active',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-black">Promozioni</h1>
          <p className="text-base text-gray-500">
            Gestisci le offerte speciali del tuo salone
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus size={20} />
          <span>Nuova Promozione</span>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <div className="flex items-center">
            <div className="mr-4 rounded-full bg-purple-100 p-3">
              <Percent className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Promozioni Attive</p>
              <p className="text-2xl font-bold">3</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="mr-4 rounded-full bg-blue-100 p-3">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Utilizzi Totali</p>
              <p className="text-2xl font-bold">85</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="mr-4 rounded-full bg-green-100 p-3">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Prossima Scadenza</p>
              <p className="text-2xl font-bold">15/04</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {promotions.map((promo) => (
          <Card key={promo.id}>
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold">{promo.title}</h3>
                <p className="mt-1 text-sm text-gray-500">{promo.description}</p>
              </div>
              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-600">
                {promo.status}
              </span>
            </div>
            
            <div className="mb-6 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Sconto</span>
                <span className="font-medium">{promo.discount}%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Periodo</span>
                <span className="font-medium">
                  {promo.validFrom} - {promo.validTo}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Utilizzi</span>
                <span className="font-medium">{promo.usageCount}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                Modifica
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                Disattiva
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PromozioniPage;