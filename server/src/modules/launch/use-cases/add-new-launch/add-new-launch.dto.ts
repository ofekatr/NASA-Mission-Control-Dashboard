export interface IAddNewLaunchDto {
    mission: string;
    rocket: string;
    launchDate: string | Date | number;
    target: string;
}