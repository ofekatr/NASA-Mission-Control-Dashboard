import { CreatePlanetProps } from "@planet/planet.defs";
import { Column, Entity, ObjectIdColumn } from "typeorm";
import { v4 } from "uuid";

@Entity()
export default class Planet {
    @ObjectIdColumn()
    id: string;

    @Column('string')
    keplerName: string;

    private constructor(props: CreatePlanetProps) {
        this.id = v4();
        Object.assign(this, props);
    }

    static createPlanet(props: CreatePlanetProps): Planet {
        return new Planet(props);
    }
}