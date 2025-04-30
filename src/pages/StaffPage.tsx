import React from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Plus, Mail, Phone, Star } from 'lucide-react';

const StaffPage = () => {
  const staff = [
    {
      id: 1,
      name: 'Marco Rossi',
      role: 'Master Barber',
      email: 'marco@barbershop.com',
      phone: '+39 333 1234567',
      image: 'https://images.pexels.com/photos/1804796/pexels-photo-1804796.jpeg',
      rating: 4.8,
    },
    {
      id: 2,
      name: 'Luca Bianchi',
      role: 'Senior Barber',
      email: 'luca@barbershop.com',
      phone: '+39 333 7654321',
      image: 'https://images.pexels.com/photos/1319461/pexels-photo-1319461.jpeg',
      rating: 4.6,
    },
    {
      id: 3,
      name: 'Giuseppe Verdi',
      role: 'Junior Barber',
      email: 'giuseppe@barbershop.com',
      phone: '+39 333 9876543',
      image: 'https://images.pexels.com/photos/1805600/pexels-photo-1805600.jpeg',
      rating: 4.5,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-black">Staff</h1>
          <p className="text-base text-gray-500">
            Gestisci il team del tuo salone
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus size={20} />
          <span>Nuovo Membro</span>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {staff.map((member) => (
          <Card key={member.id} className="overflow-hidden">
            <div className="aspect-square w-full overflow-hidden">
              <img
                src={member.image}
                alt={member.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{member.role}</p>
              </div>
              <div className="mb-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Mail size={16} />
                  {member.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Phone size={16} />
                  {member.phone}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Star size={16} className="text-yellow-400" />
                  <span className="font-medium">{member.rating}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Modifica
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Orari
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StaffPage;