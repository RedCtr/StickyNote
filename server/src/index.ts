import express, { Express } from "express"
import compression from "compression"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import mongoose from "mongoose"
import router from "./router"

dotenv.config()


const app: Express = express()

app.use(cors({
    origin: ['https://sticky-note-lac.vercel.app', 'http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(compression())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


// setup mongo db connection
mongoose.Promise = Promise
mongoose.connect(process.env.DATABASE_URL!)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => console.error(err))

mongoose.connection.on("error", (error) => {
    console.log("Mongo Error", error)
})


const port = process.env.PORT || 4000

app.use('/', router())

app.get('/test', (req, res) => {
    return res.status(200).json({ status: "APIs is up and running" })
})


app.listen(port, () =>
    console.log(`Server is running on port ${port} `)
)

export default app

