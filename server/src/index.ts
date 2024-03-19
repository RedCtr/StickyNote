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
    credentials: true
}))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(compression())


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


app.listen(port, () =>
    console.log(`Server is running on port ${port} `)
)

