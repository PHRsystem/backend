const mongoose = require("mongoose");
const fs = require("fs");
const url =
  "mongodb+srv://roshaninavdiya:VZ0NgOTVABOL7kwu@closter0.ag1ruc7.mongodb.net/";

const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["doctor", "patient", "attendant", "admin"],
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Others"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", User);
async function getDoctorIds() {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    const doctors = await UserModel.find({ role: "attendant" });
    const doctorIds = doctors.map((doctor) => doctor._id);
    console.log(doctorIds);
    fs.writeFileSync("attendantIds.json", JSON.stringify(doctorIds));
  } catch (error) {
    console.error(error);
  }
}

getDoctorIds();
