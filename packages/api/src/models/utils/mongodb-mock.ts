import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose, { type Mongoose } from "mongoose";

let mongo: MongoMemoryServer;

export const setup = async (): Promise<Mongoose> => {
  mongo = await MongoMemoryServer.create();
  const url = mongo.getUri();

  await mongoose.connect(url);

  return mongoose;
};

export const dropDatabase = async (): Promise<void> => {
  if (mongo) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongo.stop();
  }
};

export const dropCollection = async (): Promise<void> => {
  if (mongo) {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  }
};
