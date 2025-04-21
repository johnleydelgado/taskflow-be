// src/db.ts
import mongoose from 'mongoose';
import ENV from '@src/constants/ENV';

export async function connectDB() {
  if (!ENV.MongoUri)   throw new Error('Missing MONGO_URI');
  if (!ENV.MongoDbName)throw new Error('Missing MONGO_DB_NAME');

  await mongoose.connect(ENV.MongoUri, {
    dbName: ENV.MongoDbName,
  });
  console.log('✓ Mongoose connected to', ENV.MongoDbName);
}
