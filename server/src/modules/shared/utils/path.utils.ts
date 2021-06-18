import notFound from '@shared/validators/not-found';
import path from 'path';

function getBasePath() {
    const fileName = require.main?.filename ?? notFound('main.filename');
    return path.join(path.dirname(fileName), '..');
}

export {
    getBasePath,
};
const pathUtils = {
    getBasePath,
}
export default pathUtils;