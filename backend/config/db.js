import mongoose from "mongoose";

const connect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MONGODB-CONNECTED ${conn.connection.host}`);
  } catch (error) {
    console.log("Erro connecting MONGODB---------->", error.message);
    process.exit(1);
  }
};

export default connect;
