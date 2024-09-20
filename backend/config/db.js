import mongoose from "mongoose";

const DbConnect = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URL}`
    );
    console.log(`DB is connected - HOST::`, connectionInstance.connection.host);
  } catch (error) {
    console.log("Error while connecting database", error);
    process.exit(1);
  }
};

export default DbConnect;
