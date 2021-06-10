import { model, Schema } from "mongoose";

const Launch = model(
    'Launch',
    new Schema(
        {
            flightNumber: {
                type: Number,
                required: true,
            },
            target: {
                type: String,
                required: true,
            },
            launchDate: {
                type: Date,
                required: true,
            },
            mission: {
                type: String,
                required: true,
            },
            rocket: {
                type: String,
                required: true,
            },
            upcoming: {
                type: Boolean,
                required: true,
                default: true,
            },
            success: {
                type: Boolean,
                required: true,
                default: true,
            },
            customers: [String],
        }
    )
);

export default Launch;