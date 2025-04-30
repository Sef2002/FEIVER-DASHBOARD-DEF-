import React from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Star, MessageSquare, ThumbsUp, Flag } from 'lucide-react';

const RecensioniPage = () => {
  const reviews = [
    {
      id: 1,
      author: 'Marco Rossi',
      rating: 5,
      date: '2024-03-15',
      comment: 'Servizio eccellente, personale molto professionale. Il miglior taglio che abbia mai avuto!',
      response: 'Grazie mille per la recensione! Siamo felici che sia rimasto soddisfatto del servizio.',
      helpful: 12,
    },
    {
      id: 2,
      author: 'Luca Bianchi',
      rating: 4,
      date: '2024-03-12',
      comment: 'Ottimo servizio e ambiente accogliente. Prezzi un po\' alti ma ne vale la pena.',
      response: null,
      helpful: 8,
    },
    {
      id: 3,
      author: 'Giuseppe Verdi',
      rating: 5,
      date: '2024-03-10',
      comment: 'Taglio perfetto e ottimi consigli per la cura della barba. Tornerò sicuramente!',
      response: 'Grazie Giuseppe! Ti aspettiamo per il prossimo taglio.',
      helpful: 15,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 text-3xl font-bold text-black">Recensioni</h1>
        <p className="text-base text-gray-500">
          Gestisci le recensioni dei tuoi clienti
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <div className="flex items-center">
            <div className="mr-4 rounded-full bg-yellow-100 p-3">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Media Recensioni</p>
              <p className="text-2xl font-bold">4.8</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="mr-4 rounded-full bg-blue-100 p-3">
              <MessageSquare className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Totale Recensioni</p>
              <p className="text-2xl font-bold">156</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="mr-4 rounded-full bg-green-100 p-3">
              <ThumbsUp className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Recensioni Positive</p>
              <p className="text-2xl font-bold">142</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="mr-4 rounded-full bg-red-100 p-3">
              <Flag className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Da Moderare</p>
              <p className="text-2xl font-bold">2</p>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Ultime Recensioni</h2>
          <select className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black">
            <option value="recent">Più recenti</option>
            <option value="rating">Valutazione</option>
            <option value="helpful">Più utili</option>
          </select>
        </div>

        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b pb-6 last:border-0 last:pb-0">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{review.author}</span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < review.rating ? 'text-yellow-400' : 'text-gray-200'}
                          fill={i < review.rating ? 'currentColor' : 'none'}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">{review.date}</p>
                </div>
                <Button variant="ghost" size="sm">
                  <Flag size={16} className="mr-2" />
                  Segnala
                </Button>
              </div>

              <p className="mb-4 text-gray-700">{review.comment}</p>

              {review.response && (
                <div className="mb-4 rounded-lg bg-gray-50 p-4">
                  <p className="mb-1 text-sm font-medium">Risposta del salone:</p>
                  <p className="text-sm text-gray-600">{review.response}</p>
                </div>
              )}

              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm">
                  <ThumbsUp size={16} className="mr-2" />
                  Utile ({review.helpful})
                </Button>
                {!review.response && (
                  <Button variant="outline" size="sm">
                    Rispondi
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default RecensioniPage;