import express, { Express } from "express"
import compression from "compression"
import dotenv from "dotenv"
import cors from "cors"
import Mongoose from "mongoose"

dotenv.config()


const app: Express = express()

app.use(cors({
    credentials: true
}))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(compression())

const port = process.env.PORT || 4000

Mongoose.Promise = Promise
Mongoose.connect(process.env.DATABASE_URL!)
Mongoose.connection.on("error", (error) => {
    console.log("Mongo Error", error);

})

app.listen(port, () =>
    console.log(`Server is running on port ${port} `)
)


