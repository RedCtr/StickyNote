import { Router } from "express"
import authentication from "./authentication"
import users from "./users"
import notes from "./notes"

const router = Router()

export default (): Router => {
    authentication(router)
    users(router)
    notes(router)
    return router
}