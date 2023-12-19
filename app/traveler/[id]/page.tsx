import { IGetTraveler } from "@/utils/interfaces/travelers";
import { travelerEndpoints } from "@/utils/endpoints/index"
import BlurBackground from "@/components/assets/BlurBackground";

import DeleteTravelerButton from "@/components/buttons/DeleteTravelerButton";
import { Toaster } from 'react-hot-toast';
import Link from "next/link";

export default async function Page({ params }: { params: { id: string } }) {

    const data = await getData(params.id)

    const dob = new Date(data.travelersData.date_of_birth);
    const year = dob.getFullYear();
    const month = dob.getMonth() + 1;
    const day = dob.getDate();

    return (
        <div className="flex flex-col items-center  min-h-screen py-6 sm:pt-20">
            <div className="max-w-2xl w-full mx-auto shadow-md rounded-lg overflow-hidden">
                <div className="p-4 bg-indigo-800 rounded-t-lg bg-opacity-30">
                    <h1 className="text-2xl text-white font-bold mb-3">Traveler Details</h1>
                    <div className='flex justify-between items-center flex-wrap'>
                        <a href="/" className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Back
                        </a>
                        <Link href={`/traveler/edit/${params.id}`} className="mb-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                            Edit Traveler
                        </Link>
                        <DeleteTravelerButton id={params.id} />
                    </div>

                </div>
                <div className="p-6">
                    <p className="mb-4">Name: {data.travelersData.name}</p>
                    <p className="mb-4">Document: {data.travelersData.document}</p>
                    <p className="mb-4">Date of birth: {`${month}/${day}/${year}`}</p>
                    <p className="mb-4">Telefono: {data.travelersData.phone}</p>
                    <h2 className="text-xl font-semibold mt-6">{data.travelersData.trips.length === 0 ? "There are no trips available" : "Trips:"}</h2>
                    <div className="space-y-4">
                        <BlurBackground />
                        {data.travelersData.trips.map((e, index) => (
                            <div key={index} className="border-b">
                                <p className="mb-2">Code number: {e.code_number}</p>
                                <p className="mb-2">From: {e.from}</p>
                                <p className="mb-2">To: {e.to}</p>
                                <p className="mb-2">Price: {e.price}</p>
                                <p className="mb-2">Seats: {e.seats}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Toaster />
        </div>
    );
}

async function getData(id: string) {

    const endpoint = travelerEndpoints.getTraveler(id);

    const res = await fetch(endpoint, { cache: 'no-store' });
    const travelersData: IGetTraveler = await res.json();

    return { travelersData };
}