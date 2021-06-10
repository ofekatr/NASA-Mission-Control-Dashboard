import { model, Schema } from "mongoose";

const Planet = model(
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

export default Planet;