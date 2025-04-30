import React from 'react';
import Card from '../components/ui/Card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const StatistichePage = () => {
  const monthlyData = [
    { name: 'Gen', incasso: 4200, clienti: 168 },
    { name: 'Feb', incasso: 4800, clienti: 192 },
    { name: 'Mar', incasso: 5100, clienti: 204 },
    { name: 'Apr', incasso: 4900, clienti: 196 },
    { name: 'Mag', incasso: 5300, clienti: 212 },
    { name: 'Giu', incasso: 5600, clienti: 224 },
  ];

  const serviceData = [
    { name: 'Taglio', value: 45 },
    { name: 'Barba', value: 25 },
    { name: 'Taglio + Barba', value: 20 },
    { name: 'Altri Servizi', value: 10 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 text-3xl font-bold text-black">Statistiche</h1>
        <p className="text-base text-gray-500">
          Analisi delle performance del salone
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="mb-6 text-xl font-semibold">Incasso Mensile</h2>
          <LineChart width={500} height={300} data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="incasso"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </Card>

        <Card>
          <h2 className="mb-6 text-xl font-semibold">Clienti per Mese</h2>
          <BarChart width={500} height={300} data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="clienti" fill="#82ca9d" />
          </BarChart>
        </Card>

        <Card>
          <h2 className="mb-6 text-xl font-semibold">Distribuzione Servizi</h2>
          <PieChart width={400} height={300}>
            <Pie
              data={serviceData}
              cx={200}
              cy={150}
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {serviceData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </Card>

        <Card>
          <h2 className="mb-6 text-xl font-semibold">Riepilogo</h2>
          <div className="space-y-4">
            <div className="flex justify-between border-b pb-4">
              <span className="font-medium">Totale Incasso</span>
              <span className="text-xl font-bold">€29.900</span>
            </div>
            <div className="flex justify-between border-b pb-4">
              <span className="font-medium">Totale Clienti</span>
              <span className="text-xl font-bold">1,196</span>
            </div>
            <div className="flex justify-between border-b pb-4">
              <span className="font-medium">Media Giornaliera</span>
              <span className="text-xl font-bold">€498</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Crescita Mensile</span>
              <span className="text-xl font-bold text-green-600">+5.8%</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StatistichePage;