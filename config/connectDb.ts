import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("Connect success!")
  } catch (error) {
    console.log("Connect failed!")
  }
}