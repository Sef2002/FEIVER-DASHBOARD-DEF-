import React from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const TrattamentiPage = () => {
  const services = [
    {
      id: 1,
      name: 'Taglio Capelli',
      duration: '30 min',
      price: 25,
      description: 'Taglio classico con sfumatura',
      image: 'https://images.pexels.com/photos/1570807/pexels-photo-1570807.jpeg',
    },
    {
      id: 2,
      name: 'Barba',
      duration: '20 min',
      price: 15,
      description: 'Rasatura completa con prodotti premium',
      image: 'https://images.pexels.com/photos/1319461/pexels-photo-1319461.jpeg',
    },
    {
      id: 3,
      name: 'Taglio + Barba',
      duration: '45 min',
      price: 35,
      description: 'Combinazione di taglio capelli e barba',
      image: 'https://images.pexels.com/photos/1805600/pexels-photo-1805600.jpeg',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-black">Trattamenti</h1>
          <p className="text-base text-gray-500">
            Gestisci i servizi offerti dal tuo salone
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus size={20} />
          <span>Nuovo Trattamento</span>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Card key={service.id} className="overflow-hidden">
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={service.image}
                alt={service.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-xl font-semibold">{service.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{service.description}</p>
              </div>
              <div className="mb-6 flex items-center justify-between">
                <div className="text-sm text-gray-500">Durata: {service.duration}</div>
                <div className="text-lg font-semibold">€{service.price}</div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit2 size={16} className="mr-2" />
                  Modifica
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Trash2 size={16} className="mr-2" />
                  Elimina
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TrattamentiPage;