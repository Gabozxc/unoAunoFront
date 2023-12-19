// TripsTable.tsx
import { ITrips } from "@/utils/interfaces/trips";

interface TripsTableProps {
    trips: ITrips[];
    selectedTrips: string[];
    handleTripSelection: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TripsTable: React.FC<TripsTableProps> = ({ trips, selectedTrips, handleTripSelection }) => {
    return (
        <div className="overflow-auto max-h-[50vh]">
            {trips.map((trip: ITrips) => (
                <div key={trip.id} className="border mt-5 rounded-lg p-4 mb-2 sm:mb-0 sm:table-row">
                    <div className="block sm:table-cell">
                        <span className="font-semibold">Código:</span> {trip.code_number}
                    </div>
                    <div className="mt-2 sm:mt-0 sm:table-cell sm:px-4">
                        <span className="font-semibold">Desde:</span> {trip.from}
                    </div>
                    <div className="mt-2 sm:mt-0 sm:table-cell sm:px-4">
                        <span className="font-semibold">Hasta:</span> {trip.to}
                    </div>
                    <div className="mt-2 sm:mt-0 sm:table-cell sm:px-4">
                        <span className="font-semibold">Asientos:</span> {trip.seats}
                    </div>
                    <div className="mt-2 sm:mt-0 sm:table-cell sm:px-4">
                        <span className="font-semibold">Precio:</span> {trip.price}$
                    </div>
                    <div className="mt-2 sm:mt-0 sm:table-cell sm:px-4">
                        <input
                            type="checkbox"
                            value={trip.id}
                            onChange={handleTripSelection}
                            className='mr-2'
                            checked={selectedTrips.includes(trip.id)}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TripsTable;