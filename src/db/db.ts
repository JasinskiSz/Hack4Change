import mongoose from 'mongoose';
export async function dbConnect() {
  // sprawdzamy, czy jesteśmy już połączeni
  if (mongoose.connection.readyState >= 1) {
    console.log("connected already.")
    return;
  }

  return mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

export async function testConnection() {
  try {
      await dbConnect();
      console.log('Successfully connected to MongoDB!');
  } catch (error) {
      console.error('Failed to connect to MongoDB:', error);
  } finally {
      mongoose.connection.close();
  }
}

