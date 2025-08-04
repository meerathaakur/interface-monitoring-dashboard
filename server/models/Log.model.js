import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
    interfaceName: { type: String, required: true },
    integrationKey: { type: String, required: true },
    status: { type: String, enum: ["Success", "Failed", "In Progress"], required: true },
    message: String,
    timestamp: { type: Date, default: Date.now },

});

logSchema.index({ timestamp: -1 });
logSchema.index({ status: 1 });
logSchema.index({ interfaceName: 1 });

const logModel = mongoose.model("Log", logSchema);
export default logModel;