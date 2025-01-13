import mongoose from "mongoose";
import { CONST } from "@/constants";

export const dbConnect = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${CONST.DB_NAME}`
    );

    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log(
        `MongoDB Connected Successfully !! DB HOST: ${connectionInstance.connection.host}`
      );
    });

    connection.on("error", (err) => {
      console.log(
        `MongoDB connection error, please make sure database is up and running: ${err}`
      );
      process.exit(1);
    });
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    throw new Error(`MongoDB Connection Error: ${error}`);
  }
};
