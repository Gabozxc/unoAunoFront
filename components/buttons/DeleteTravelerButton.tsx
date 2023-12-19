'use client'
import { useState } from 'react';

import { travelerEndpoints } from '@/utils/endpoints';
import toast from 'react-hot-toast';
import dynamic from 'next/dynamic';

type RequerimentToDeleteTraveler = {
  id: string;
};

const DeleteTravelerButton: React.FC<RequerimentToDeleteTraveler> = ({ id }) => {
  const [isLoading, setIsLoading] = useState(false);

  const deleteTraveler = async () => {
    setIsLoading(true);
    const endpoint = travelerEndpoints.deleteTraveler(id);
    try {
      const res = await fetch(endpoint, { method: 'DELETE' });
      if (!res.ok) {
        throw new Error('Error deleting traveler');
      }
      toast.success('Deleting traveler was successfully, redirecting in three seconds');
      setTimeout(() => {
        window.location.href = '/';
      }, 3000);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button onClick={deleteTraveler} disabled={isLoading}  className="mb-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
      {isLoading ? 'Eliminando...' : 'Eliminar viajero'}
    </button>
  );
};

export default dynamic(() => Promise.resolve(DeleteTravelerButton), { ssr: false });

