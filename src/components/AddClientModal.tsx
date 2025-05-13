import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabase';

interface AddClientModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddClientModal: React.FC<AddClientModalProps> = ({ open, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_phone: '',
    customer_email: '',
    customer_birthdate: '', // stored as YYYY-MM-DD
    customer_birthdate_ui: '', // displayed as DD/MM/YYYY
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'customer_birthdate') {
      const numeric = value.replace(/\D/g, '').slice(0, 8);

      const formattedUI = numeric.replace(/(\d{2})(\d{2})(\d{0,4})/, (_, d, m, y) =>
        [d, m, y].filter(Boolean).join('/')
      );

      const formattedDB = numeric.length === 8
        ? `${numeric.slice(4)}-${numeric.slice(2, 4)}-${numeric.slice(0, 2)}`
        : '';

      setFormData((prev) => ({
        ...prev,
        customer_birthdate_ui: formattedUI,
        customer_birthdate: formattedDB,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    const { error } = await supabase.from('rubrica').insert([
      {
        customer_name: formData.customer_name,
        customer_phone: formData.customer_phone,
        customer_email: formData.customer_email,
        customer_birthdate: formData.customer_birthdate || null,
        created_from: 'rubrica',
      },
    ]);

    setLoading(false);

    if (error) {
      alert('Errore: ' + error.message);
    } else {
      onSuccess();
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Dialog.Panel className="bg-white rounded-xl p-6 w-full max-w-md space-y-4">
        <Dialog.Title className="text-lg font-bold text-black">Nuovo Cliente</Dialog.Title>

        <Input
          name="customer_name"
          placeholder="Nome"
          value={formData.customer_name}
          onChange={handleChange}
        />
        <Input
          name="customer_phone"
          placeholder="Telefono"
          value={formData.customer_phone}
          onChange={handleChange}
        />
        <Input
          name="customer_email"
          placeholder="Email"
          value={formData.customer_email}
          onChange={handleChange}
        />
        <Input
          name="customer_birthdate"
          placeholder="Data di nascita (DD/MM/YYYY)"
          value={formData.customer_birthdate_ui}
          onChange={handleChange}
        />

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="ghost" onClick={onClose}>
            Annulla
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Salvataggio...' : 'Salva'}
          </Button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default AddClientModal;