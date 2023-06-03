const mongoose = require('mongoose');

async function dbConnect() {
  // jeśli jesteśmy już połączeni, nie trzeba nic robić
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  return mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

export default dbConnect;