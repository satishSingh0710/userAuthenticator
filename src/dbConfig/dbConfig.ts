import mongoose from "mongoose";

export async function connectToDatabase() {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`);

    const connect = mongoose.connection;

    connect.on("connected", () => {
      console.log("Connected to the database!");
    });

    connect.on("error", (error) => {
      console.error("Failed to connect to the database!");
      console.error(error);
    });
  } catch (error) {
    console.error("Something went wrong while connecting to the database!");
    console.error(error);
    process.exit(1); // Exit the process with an error code
  }
}
