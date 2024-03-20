import { Request, Response } from "express"
import { getUserByEmail } from "../db/users"

export const getUser = async (req: Request, res: Response) => {
    try {
        //@ts-ignore user object set by the middleware function
        const userData = req.user
        const currentUser = await getUserByEmail(userData?.email)

        return res.status(200).json(currentUser)

    } catch (error) {
        return res.sendStatus(500)
    }
}