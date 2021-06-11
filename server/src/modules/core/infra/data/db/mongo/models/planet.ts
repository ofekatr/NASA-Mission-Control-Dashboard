import { model, Schema } from "mongoose";

const PlanetMongo = model(
    'Planet',
    new Schema(
        {
            keplerName: {
                type: String,
                required: true,
            }
        }
    )
);

export default PlanetMongo;