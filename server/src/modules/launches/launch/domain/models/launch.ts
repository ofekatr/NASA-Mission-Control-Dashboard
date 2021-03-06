import CustomError from '@shared/errors/error-objects/custom-error';
import { requiredArgument } from '@shared/validators/required-argument';

export interface CreateLaunchProps {
    flightNumber: string;
    mission: string;
    rocket: string;
    launchDate: Date;
    target?: string;
    success?: boolean;
    upcoming?: boolean;
    customers?: string[];
}

function extractCreateLaunchProps({
    flightNumber = requiredArgument('flightNumber'),
    launchDate = requiredArgument('launchDate'),
    mission = requiredArgument('mission'),
    rocket = requiredArgument('rocket'),
    success = true,
    upcoming = true,
    customers,
    target,
}: CreateLaunchProps = requiredArgument('createLaunchProps')) {
    return {
        flightNumber,
        launchDate,
        mission,
        rocket,
        target,
        success,
        upcoming,
        customers,
    }
}

export default class Launch {
    flightNumber: string;
    mission: string;
    target?: string;
    rocket: string;
    launchDate: Date;
    upcoming: boolean = true;
    success: boolean = true;
    customers?: string[];

    private constructor(props: CreateLaunchProps) {
        Object.assign(this, props);
    }

    static create(
        props: CreateLaunchProps = requiredArgument('createLaunchProps')
    ) {
        return new Launch({
            ...extractCreateLaunchProps(props),
        });
    }

    static schedule(
        props: CreateLaunchProps = requiredArgument('createLaunchProps')
    ) {
        if (!props.target)
            throw new CustomError('invalidPlanet', 'Missing target planet.');
        return Launch.create(props);
    }

    abortLaunch() {
        this.upcoming = false;
        this.success = false;
    }
}