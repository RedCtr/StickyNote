import crypto from "crypto"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config()

const SECRET = process.env.SECRET!
const JWT_SECRET = process.env.JWT_SECRET!
export const random = () => crypto.randomBytes(128).toString("base64")

export const authentication = (salt: string, password: string) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex')
}

export const generateToken = (payload: Record<string, any>) => {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: '2 days'
    })
}