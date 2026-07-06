import mongoose from "mongoose";

const connectDB = async () => {
  const connString =
    process.env.MONGODB_URI ||
    "mongodb+srv://studyazlan84_db_user:azlan_84@cluster0.gzaqxub.mongodb.net/project?retryWrites=true&w=majority&appName=Cluster0";

  try {
    const conn = await mongoose.connect(connString);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`❌ DB Connection Error: ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;
