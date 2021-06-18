import IKeplerDto from "@planet/infra/data/kepler/dtos/kepler";
import { requiredArgument } from "@shared/validators/required-argument";

export interface CreateKeplerPlanetProps {
    keplerName: string;
}

const extractCreateKeplerPlanetProps = (
    {
        keplerName = requiredArgument("keplerPlanet"),
    }: CreateKeplerPlanetProps = requiredArgument("createKeplerPlanetProps")
): CreateKeplerPlanetProps => ({
    keplerName
})

export default class KeplerPlanet {
    private constructor(props: CreateKeplerPlanetProps) {
        this.keplerName = props.keplerName;
    }

    keplerName: string;

    static createKeplerPlanet(
        props: CreateKeplerPlanetProps = requiredArgument("createKeplerPlanetProps"),
    ): KeplerPlanet {
        return new KeplerPlanet(
            extractCreateKeplerPlanetProps(props)
        );
    }

    static verifyHabitablePlanetByRawData(planet: IKeplerDto) {
        return planet.koi_disposition === 'CONFIRMED'
            && planet.koi_insol > 0.36 && planet.koi_insol < 1.11
            && planet.koi_prad < 1.6;
    }
}