import { Hospital } from "./hospitals.model.js";

export const createHospital = async (hospitalData) => {
  const { name } = hospitalData;

  const hospital = await new Hospital({ name }).save();

  return { ...hospital._doc };
};

export const readHospitals = async () => {
  const hospitals = await Hospital.find();

  return hospitals;
};
