
import NewTravelerForm from "@/components/forms/NewTravelerForm";

export default function Page() {
    return (
        <div className="flex flex-col items-center  min-h-screen py-6 sm:pt-20">
            <div className="max-w-2xl w-full mx-auto shadow-md rounded-lg overflow-hidden">
                <div className="p-4 bg-indigo-800 rounded-t-lg bg-opacity-30">
                    <h1 className="text-2xl text-white font-bold mb-3">New Traveler</h1>
                    <a href="/" className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Back
                    </a>
                </div>
                <div className="p-6">
                    <NewTravelerForm />
                </div>
            </div>
        </div>
    );
}
