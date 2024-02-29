import mongoose from 'mongoose'

mongoose.set('strictQuery', false)

export const connectDB = async () => {
  const uri = process.env.MONGO_URI
  if (!uri) {
    throw new Error('MongoDB URI is not defined')
  }
  try {
    await mongoose.connect(uri)
    console.log('MongoDB connected')
  } catch (error: any) {
    console.error(error.message)
    process.exit(1)
  }
}
