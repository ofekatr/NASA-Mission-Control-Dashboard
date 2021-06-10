import serverConfig from '@configs';
import logger from '@logs/logger';
import mongoose from 'mongoose';


async function loadDbConnection() {
    const CONNECTION_STRING = `mongodb+srv://${serverConfig.db.user}:${serverConfig.db.password}@nasa.gnmt3.mongodb.net/nasa?retryWrites=true&w=majority`;
    await mongoose.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
    logger.info("Successfully connected to database.");
}

export default loadDbConnection;