import mongoose from "mongoose";
import { conf } from "@/config/conf";
import { CONST } from "@/constants";

export const dbConnect = async () => {
  try {
    const connectionString = `${conf.dbCredentials.databaseUri}/${CONST.DB_NAME}`;
    const connectionInstance = await mongoose.connect(connectionString);
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
    throw new Error(
      error instanceof Error ? error.message : "Failed to connect to MongoDB"
    );
  }
};
