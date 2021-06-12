import { requiredArgument } from "@shared/validators/required-argument";
import { Column, Entity, ObjectIdColumn } from "typeorm";

export interface CreateLaunchProps {
    flightNumber: string;
    mission: string;
    rocket: string;
    launchDate: Date;
    target: string;
}

function extractCreateLaunchProps({
    flightNumber = requiredArgument("flightNumber"),
    launchDate = requiredArgument("launchDate"),
    mission = requiredArgument("mission"),
    rocket = requiredArgument("rocket"),
    target = requiredArgument("target"),
}: CreateLaunchProps = requiredArgument("createLaunchProps")) {
    return {
        flightNumber,
        launchDate,
        mission,
        rocket,
        target,
    }
}

@Entity()
export default class Launch {
    @ObjectIdColumn()
    flightNumber: string;

    @Column()
    mission: string;

    @Column()
    target: string;

    @Column()
    rocket: string;

    @Column()
    launchDate: Date;

    @Column("boolean", { default: true })
    upcoming: boolean = true;

    @Column("boolean", { default: true })
    success: boolean = true;

    @Column("string", { array: true, nullable: true })
    customers?: string[];

    private constructor(props: CreateLaunchProps) {
        Object.assign(this, props);
    }

    static createLaunch(
        props: CreateLaunchProps = requiredArgument("createLaunchProps")
    ) {
        return new Launch({
            ...extractCreateLaunchProps(props),
        });
    }

    abortLaunch() {
        this.upcoming = false;
        this.success = false;
    }
}