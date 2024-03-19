import express, { Express } from "express"
import cors from "cors"
import compression from "compression"
import dotenv from "dotenv"

dotenv.config()


const app: Express = express()

app.use(cors({
    credentials: true
}))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(compression())

const port = process.env.PORT || 4000


app.listen(port, () =>
    console.log(`Server is running on port ${port} `)
)


