const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const travelerEndpoints = {
    newTraveler: `${apiUrl}/travelers/newTraveler`,
    getTraveler: (travelerId: string) => `${apiUrl}/travelers/getTraveler?idDocument=${travelerId}`,
    getTravelers: (page: number) => `${apiUrl}/travelers/getTravelers?page=${page}`,
    editTraveler: `${apiUrl}/travelers/editTraveler`,
    deleteTraveler: (travelerId: string) => `${apiUrl}/travelers/deleteTraveler?idDocument=${travelerId}`,
  };

  export const tripsEndpoints = {
    getTrips: () => `${apiUrl}/trips/getTrips`,
  };
