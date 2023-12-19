import {ITrips} from "../trips"

export interface INewTraveler {
    name: string,
    document: string,
    date_of_birth: string,
    phone: string,
    trips: []
}

export interface IGetTraveler {
    id: string,
    date_of_birth: Date,
    document: string,
    name: string,
    phone: string,
    trips: ITrips[]
}

export interface IGetTravelers {
    travelers: ITraveler[];
    page: string;
    size: number;
    totalPages: number;
}

export interface IEditTraveler extends ITraveler {}

export interface IDeleteTraveler extends ITraveler {}

interface ITraveler {
    id: string;
    date_of_birth: string;
    document: string;
    name: string;
    phone: string;
    trips: string[];
}
