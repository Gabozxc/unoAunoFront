'use client'

import { ChangeEvent, FormEvent, useState } from 'react';
import { travelerEndpoints } from '@/utils/endpoints';
import { INewTraveler } from '@/utils/interfaces/travelers';
import toast, { Toaster } from 'react-hot-toast';

const NewTravelerForm = () => {
    const [loading, setLoading] = useState(false);
    const [newTraveler, setNewTraveler] = useState<INewTraveler>({ name: '', document: '', date_of_birth: '', phone: '', trips: [] });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTraveler({ ...newTraveler, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        if (newTraveler.name.trim() === "") {
            toast.error("Name cant be empty");
            return;
        }

        if (newTraveler.document.trim() === "") {
            toast.error("Document cant be empty");
            return;
        }

        if (newTraveler.date_of_birth.trim() === "") {
            toast.error("Date of birth cant be empty");
            return;
        }

        if (newTraveler.phone.trim() === "") {
            toast.error("Phone cant be empty");
            return;
        }

        try {
            const response = await fetch(travelerEndpoints.newTraveler, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTraveler),
            });
            const data = await response.json();

            if(data.message === "The document already exists in the database"){
                toast.error("The document Already exist");
                return;
            }
            
            setNewTraveler({
                name: '',
                document: '',
                date_of_birth: '',
                phone: '',
                trips: []
            });
            toast.success(`The Traveler ${data.name} has been created succesfully`);
            return;
        } catch (err) {
            toast.error("Error to create a new Traveler");
            return;
        }finally {
            setLoading(false);
          }

    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 text-black">
            <input type="text" name="name" value={newTraveler.name} onChange={handleChange} placeholder="Name" required className="w-full py-2 px-4 border border-gray-300 rounded-md placeholder-gray-500" />
            <input type="text" name="document" value={newTraveler.document} onChange={handleChange} placeholder="Document" required className="w-full py-2 px-4 border border-gray-300 rounded-md placeholder-gray-500" />
            <input type="date" name="date_of_birth" value={newTraveler.date_of_birth} onChange={handleChange} placeholder="Date of Birth" required className="w-full py-2 px-4 border border-gray-300 rounded-md placeholder-gray-500 text-black" />
            <input type="tel" name="phone" value={newTraveler.phone} onChange={handleChange} placeholder="Phone" required className="w-full py-2 px-4 border border-gray-300 rounded-md placeholder-gray-500" />
            <button type="submit" className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded" disabled={loading}>
                {loading ? "Loading..." : "Submit"}
            </button>
            <Toaster />
        </form>
    );
}

export default NewTravelerForm;