import CustomError from '@shared/errors/error-objects/custom-error';
import { createSingletonFactory } from '@shared/utils/singleton.utils';
import { requiredArgument } from '@shared/validators/required-argument';

interface ICreateTargetProps {
    target?: string;
    upcoming: boolean;
}

function createCreateTarget(
    {

    } = {}
) {
    return async function createTarget(
        {
            target,
            upcoming = requiredArgument('upcoming'),
        }: ICreateTargetProps = requiredArgument('createTarget Props')
    ): Promise<string | undefined> {
        if (upcoming && !target)
            throw new CustomError('requiredArgument', 'Target Planet');
        return target;
    }

}

const createTargetFactory = createSingletonFactory(createCreateTarget);

export default createTargetFactory;