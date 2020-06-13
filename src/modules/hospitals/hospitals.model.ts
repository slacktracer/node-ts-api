import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema({
  administrators: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
  members: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
  name: {
    default: "",
    required: "Hospital name can not be blank",
    trim: true,
    type: String,
  },
});

const Hospital = mongoose.model("hospitals", hospitalSchema);

export { Hospital };
