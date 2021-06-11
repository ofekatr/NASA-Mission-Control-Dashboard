import serverConfig from '@infra/config';
import logger from '@infra/logs/logger';
import mongoose from 'mongoose';

async function loadDbConnection() {
    const CONNECTION_STRING = `mongodb+srv://${serverConfig.db.user}:${serverConfig.db.password}@nasa.gnmt3.mongodb.net/nasa?retryWrites=true&w=majority`;

    mongoose.connection
        .once("open", () => logger.info("DB connection ready."))
        .on("error", (err) => logger.error(err));

    await mongoose.connect(CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    });
}

export default loadDbConnection;