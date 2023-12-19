import Link from "next/link";

import BlurBackground from "../components/assets/BlurBackground";
import TravelerLinkDetails from "../components/nav/TravelerLinkDetails";
import { IGetTravelers } from "../utils/interfaces/travelers";
import { travelerEndpoints } from "../utils/endpoints/index"

export default async function Home() {

  const data = await getData()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <BlurBackground />
      <h1 className="text-3xl mb-5 font-semibold">Travelers:</h1>
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        {
          data.travelersData.travelers.map((e, index) => (
            <TravelerLinkDetails key={index} nombre={e.name} id={e.id} />
          ))
        }
      </div>
      <div className="flex flex-wrap justify-between items-center w-full">
        <Link href="/newTraveler" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">New Traveler</Link>
        <Link href="/newTraveler" className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">New trip</Link>

      </div>
    </main>
  )
}

async function getData() {
  const endpoint = travelerEndpoints.getTravelers(1);
  const res = await fetch(endpoint, { cache: 'no-store' });
  const travelersData: IGetTravelers = await res.json();
  return { travelersData };
}