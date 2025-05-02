import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import CalendarsOverview from './pages/CalendarsOverview'; // ✅ Renamed
import CassaPage from './pages/CassaPage';
import RubricaPage from './pages/RubricaPage';
import TrattamentiPage from './pages/TrattamentiPage';
import StatistichePage from './pages/StatistichePage';
import MagazzinoPage from './pages/MagazzinoPage';
import StaffPage from './pages/StaffPage';
import SpesePage from './pages/SpesePage';
import PromozioniPage from './pages/PromozioniPage';
import RecensioniPage from './pages/RecensioniPage';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<CalendarsOverview />} />
          <Route path="/agenda" element={<CalendarsOverview />} />
          <Route path="/cassa" element={<CassaPage />} />
          <Route path="/rubrica" element={<RubricaPage />} />
          <Route path="/trattamenti" element={<TrattamentiPage />} />
          <Route path="/statistiche" element={<StatistichePage />} />
          <Route path="/magazzino" element={<MagazzinoPage />} />
          <Route path="/staff" element={<StaffPage />} />
          <Route path="/spese" element={<SpesePage />} />
          <Route path="/promozioni" element={<PromozioniPage />} />
          <Route path="/recensioni" element={<RecensioniPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;