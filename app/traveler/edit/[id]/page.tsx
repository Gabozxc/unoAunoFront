import EditTravelerForm from "@/components/forms/EditTravelerForm";
import { travelerEndpoints, tripsEndpoints } from "@/utils/endpoints";
import { IGetTraveler } from "@/utils/interfaces/travelers";
import { ITrips } from "@/utils/interfaces/trips";

export default async function Page({ params }: { params: { id: string } }) {
    const data = await getData(params.id)
    const trips = await getTrips()

    return (
        <div className="flex flex-col items-center  min-h-screen py-6 sm:pt-20">
            <div className="max-w-2xl w-full mx-auto shadow-md rounded-lg overflow-hidden">
                <div className="p-4 bg-indigo-800 rounded-t-lg bg-opacity-30">
                    <h1 className="text-2xl text-white font-bold mb-3">Edit Traveler</h1>
                    <div className='flex justify-between items-center'>
                        <a href={`/traveler/${params.id}`}
                            className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Back
                        </a>
                    </div>
                </div>
                <div className="p-6">
                    <EditTravelerForm travelerGet={data.travelersData}  trips={trips.tripsData}/>
                </div>
            </div>
        </div>
    );
}

async function getData(id: string) {
    const endpoint = travelerEndpoints.getTraveler(id);
    const res = await fetch(endpoint, { cache: 'no-store' });
    const travelersData: IGetTraveler = await res.json();
    return { travelersData };
}


async function getTrips() {
    const endpoint = tripsEndpoints.getTrips();
    const res = await fetch(endpoint, { cache: 'no-store' });
    const tripsData: ITrips[] = await res.json();
    return { tripsData };
  }