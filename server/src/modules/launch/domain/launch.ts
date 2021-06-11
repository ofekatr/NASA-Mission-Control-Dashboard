import { CreateLaunchProps } from "@launch/launch.defs";
import { Column, Entity, ObjectIdColumn } from "typeorm";

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

    static createLaunch(props: CreateLaunchProps) {
        return new Launch({
            ...props,
            launchDate: new Date(props.launchDate),
        });
    }

    abortLaunch() {
        this.upcoming = false;
        this.success = false;
    }
}