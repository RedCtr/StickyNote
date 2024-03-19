import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET!

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies["AuthToken"]

        if (!token) {
            return res.sendStatus(401)
        }

        jwt.verify(token, JWT_SECRET, (error: any, user: any) => {
            if (error) return res.sendStatus(403)

            // we set our user to req object
            //@ts-ignore
            req.user = user
        })
    } catch (error) {
        return res.sendStatus(500)
    }

}