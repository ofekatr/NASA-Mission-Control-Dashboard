export interface AddNewLaunchDTO {
    mission: string;
    rocket: string;
    launchDate: string | Date | number;
    target: string;
}