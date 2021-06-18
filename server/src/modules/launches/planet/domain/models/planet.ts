import { CreatePlanetProps } from '@planet/planet.defs';
import { requiredArgument } from '@shared/validators/required-argument';

const extractAndAssertCreatePlanetProps = ({
    keplerName = requiredArgument('keplerName'),
}: CreatePlanetProps) => ({
    keplerName,
});

export default class Planet {
    keplerName: string;

    private constructor(props: CreatePlanetProps) {
        this.keplerName = props.keplerName;
    }

    static createPlanet(props: CreatePlanetProps): Planet {
        return new Planet(
            extractAndAssertCreatePlanetProps(props)
        );
    }
}