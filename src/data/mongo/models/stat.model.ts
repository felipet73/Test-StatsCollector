import mongoose from "mongoose";

const statSchema = new mongoose.Schema({
    message: {
        type: String,
        require: true,
    },
    origin: {
        type: String,
    },
    time: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

export const StatModel = mongoose.model('Stat', statSchema);
