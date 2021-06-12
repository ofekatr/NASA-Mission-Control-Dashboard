import { CreatePlanetProps } from "@planet/planet.defs";
import { requiredArgument } from "@shared/validators/required-argument";
import { v4 } from "uuid";

const extractCreatePlanetProps = ({
    id,
    keplerName = requiredArgument("keplerName"),
}: CreatePlanetProps) => ({
    id,
    keplerName,
});

export default class Planet {
    id: string;
    keplerName: string;

    private constructor(props: CreatePlanetProps) {
        this.id = props.id ?? v4();
        Object.assign(this, props);
    }

    static createPlanet(props: CreatePlanetProps): Planet {
        return new Planet(
            extractCreatePlanetProps(props)
        );
    }
}