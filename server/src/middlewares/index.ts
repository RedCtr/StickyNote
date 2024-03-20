import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { getUserByEmail } from "../db/users"

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET!

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorization = req.headers.authorization

        if (!authorization) {
            return res.status(403).json({ message: "Missing auth header" })
        }
        const token = authorization?.split(" ")[1]

        if (!token) {
            return res.sendStatus(401)
        }

        jwt.verify(token, JWT_SECRET, (error: any, user: any) => {
            if (error) return res.sendStatus(403)

            // we set our user to req object
            //@ts-ignore
            req.user = user

            next()
        })
    } catch (error) {
        return res.sendStatus(500)
    }
}

export const getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //@ts-ignore
        const { email } = req.user

        const currentUser = await getUserByEmail(email)

        if (!currentUser) {
            return res.status(404).json({ message: "User not found" })
        }

        // we reset our user the currentUser
        //@ts-ignore
        req.user = currentUser

        next()

    } catch (error) {
        return res.sendStatus(500)
    }
}