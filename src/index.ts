import cookieParser from 'cookie-parser'
import cors from 'cors'
import { config } from 'dotenv'
import express, { type Express } from 'express'
import { connectDB } from './config/DBconnect'
import authRouter from './routes/auth.routes'
import productRouter from './routes/product.routes'
config()

const app: Express = express()

app.use(cookieParser())
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
)

app.use(express.json())

const port = process.env.PORT ?? 4001

app.use('/api/auth', authRouter)
app.use('/api/products', productRouter)

// Start the server after connecting to the database
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
  })
  .catch((error: Error) => {
    console.error('Failed to start the server', error.message)
    process.exit(1)
  })
