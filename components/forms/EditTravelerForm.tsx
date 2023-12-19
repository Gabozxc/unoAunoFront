"use client"

import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { IGetTraveler } from "@/utils/interfaces/travelers";
import { travelerEndpoints } from "@/utils/endpoints/index"
import Modal from '../assets/Modal';
import { ITrips } from '@/utils/interfaces/trips';
import TripsTable from '../tablets/TripsTable';

const EditTravelerForm = ({ travelerGet, trips }: { travelerGet: IGetTraveler, trips: ITrips[] }) => {

    const [traveler, setTraveler] = useState<IGetTraveler | null>(travelerGet);
    const [loading, SetLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTrips, setSelectedTrips] = useState<string[]>(travelerGet.trips.map(trip => trip.id));

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setTraveler(prevState => {
            if (prevState) {
                return { ...prevState, [name]: value };
            }
            return null;
        });
    };

    const handleTripSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        setSelectedTrips(prevState => {
            if (checked) {
                return [...prevState, value];
            } else {
                return prevState.filter(tripId => tripId !== value);
            }
        });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        SetLoading(true)
        if (traveler) {

            const editedTraveler = {
                ...traveler,
                date_of_birth: new Date(traveler.date_of_birth),
                trips: selectedTrips
            };

            try {
                const res = await fetch(travelerEndpoints.editTraveler, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(editedTraveler),
                });

                if (res.ok) {
                    toast.success('Traveler details updated successfully');
                } else {
                    toast.error('Failed to update traveler details');
                }

            } catch (err) {
                console.log(err)
            } finally {
                SetLoading(false)
            }
        }
    };

    const openModal = () => {
        if(trips.length  <= 0){
            toast.error("No available trips");
            return;
        }

        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    if (!traveler) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <div className='text-center text-3xl'>Loading...</div>
            </div>
        );
    }

    const dob = new Date(traveler.date_of_birth);
    const year = dob.getUTCFullYear();
    const month = String(dob.getUTCMonth() + 1).padStart(2, '0');
    const day = String(dob.getUTCDate()).padStart(2, '0');

    return (<form onSubmit={handleSubmit} className="space-y-4 text-black">
        <label>
            Name:
            <input type="text" name="name" value={traveler.name} onChange={handleInputChange} placeholder="Name" required className="w-full py-2 px-4 border border-gray-300 rounded-md placeholder-gray-500" />
        </label>
        <label>
            Document:
            <input type="text" name="document" value={traveler.document} onChange={handleInputChange} placeholder="Document" required className="w-full py-2 px-4 border border-gray-300 rounded-md placeholder-gray-500" />
        </label>
        <label>
            Date of birth:
            <input type="date" name="date_of_birth" value={`${year}-${month}-${day}`} onChange={handleInputChange} placeholder="Date of Birth" required className="w-full py-2 px-4 border border-gray-300 rounded-md placeholder-gray-500 text-black" />

        </label>
        <label>
            Phone:
            <input type="tel" name="phone" value={traveler.phone} onChange={handleInputChange} placeholder="Phone" required className="w-full py-2 px-4 border border-gray-300 rounded-md placeholder-gray-500" />
        </label>
        <p onClick={openModal} className="w-full py-2 px-4 bg-green-500 hover:bg-green-700 text-white font-bold rounded text-center">
            {loading ? "Loading..." : "Edit trip"}
        </p>
        <button type="submit" className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded" disabled={loading}>
            {loading ? "Loading..." : "Update Traveler"}
        </button>
        <Modal isOpen={isModalOpen} handleClose={closeModal}>
            <h1>Viajes disponibles:</h1>
            <TripsTable trips={trips} selectedTrips={selectedTrips} handleTripSelection={handleTripSelection}/>
        </Modal>

        <Toaster />

    </form>);
}

export default EditTravelerForm;