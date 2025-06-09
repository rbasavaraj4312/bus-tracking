const mongoose = require("mongoose");

const BusSchema = new mongoose.Schema(
  {
    number: { type: String, required: true, unique: true },
    stop: [
      {
        stopname: { type: String },
        reached: { type: Boolean, default: false },
        latitude: { type: Number, default: 0 },
        longitude: { type: Number, default: 0 },
      },
    ],
    latitude: { type: Number, default: 0 },
    longitude: { type: Number, default: 0 },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const Bus = mongoose.model("Bus", BusSchema);
module.exports = Bus;
