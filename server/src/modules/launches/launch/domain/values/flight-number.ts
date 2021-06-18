import { createSingletonFactory } from '@shared/utils/singleton.utils';
import assert from 'assert';
import { v4 } from 'uuid';

function createCreateFlightNumber(
    {
        uuid = v4,
    } = {},
) {
    return function createFlightNumber(flightNumber?: string): string {
        if (flightNumber == undefined)
            return uuid();

        assert(typeof flightNumber === 'string', `Invalid flight number - ${flightNumber}`);

        return flightNumber;
    }
}

const createFlightNumberFactory = createSingletonFactory(createCreateFlightNumber);

export default createFlightNumberFactory;