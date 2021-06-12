import config from "@shared/config";
import { ConnectionOptions } from "typeorm";

const rootDir = config.nodeEnv === "production" ?
    "dist" :
    "src";

const ormConfig = {
    type: "mongodb",
    url: config.db.url,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    host: "mongodb+srv://nasa.gnmt3.mongodb.net",
    synchronize: false,
    logging: false,
    entities: [
        `${rootDir}/modules/**/domain/*.{js,ts}`,
    ],
    migrations: [`${rootDir}/migrations/*.{js,ts}`],
    subscribers: [`${rootDir}/subscribers/*.{js,ts}`],
    cli: {
        "migrationsDir": `${rootDir}/migrations`,
        "subscribersDir": `${rootDir}/subscribers`,
    }
} as ConnectionOptions;

export default ormConfig;