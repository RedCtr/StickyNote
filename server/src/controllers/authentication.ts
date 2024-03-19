import { Request, Response } from "express"
import { User } from "../types"
import { validateUserInput } from "../utils/UserInput"
import { createUser, getUserByEmail } from "../db/users"
import { authentication, random } from "../utils/helpers"

export const register = async (req: Request, res: Response) => {
    try {
        const user = req.body as User
        if (!user.firstName || !user.email || !user.password) {
            return res.status(400).json({ message: "Missing Required Fields" })
        }

        const validation = validateUserInput(user)
        if (!validation.isValid) {
            return res.status(400).json({ message: validation.issues })
        }

        // check if the user email alredy exist
        const existingUser = await getUserByEmail(user.email)
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" })
        }

        // create user 
        const { firstName, lastName, email, password } = user
        const salt = random()
        const newUser = await createUser({
            firstName,
            lastName,
            email,
            authentication: {
                salt,
                password: authentication(salt, password)
            }
        })

        return res.status(201).json(newUser)
    } catch (error) {
        console.log(error);
        return res.sendStatus(500)
    }
}