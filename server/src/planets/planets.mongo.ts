import { model, Schema } from "mongoose";

const PlanetDb = model(
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

export default PlanetDb;