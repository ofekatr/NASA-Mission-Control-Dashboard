interface ISpaceXDtoRocket {
    name: string;
}

interface ISpaceXDtoPayload {
    customers: string[];
}

interface ISpaceXDto {
    flight_number: string;
    name: string;
    rocket: ISpaceXDtoRocket;
    date_local: string;
    payloads: ISpaceXDtoPayload[];
    upcoming: boolean;
    success: boolean;
}

export default ISpaceXDto;