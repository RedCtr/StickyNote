import { Request, Response } from "express"
import { User } from "../types"
import { validateUserInput } from "../utils/UserInput"
import { createUser, getUserByEmail } from "../db/users"
import { authentication, generateToken, random } from "../utils/helpers"

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

        const token = generateToken({
            id: newUser._id.toString(),
            email
        })

        return res.status(201).json({ ...newUser, token })
    } catch (error) {
        console.log(error);
        return res.sendStatus(500)
    }
}


export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body as User
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" })
        }

        // check if user exist
        // we also explicitly select the user authentication data bc we need it in this case
        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password')
        if (!user) {
            return res.status(401).json({ message: "You need to be logged in first" })
        }

        const { authentication: authenticationData } = user

        // autheticate user using hash password comparison
        const expectedHash = authentication(authenticationData?.salt!, password)

        if (expectedHash !== authenticationData?.password) {
            return res.status(401).json({ message: "Incorrect password" })
        }


        const token = generateToken({
            id: user._id.toString(),
            email
        })

        // since we're using different domains the browser will block this cookie since it third party cookie

        // const expireTime = 2 * 24 * 60 * 60 * 1000  // 2day
        // res.cookie("AUTH-TOKEN", token, {
        //     httpOnly: true,
        //     expires: new Date(Date.now() + expireTime),
        //     secure: true,
        //     sameSite: 'none',
        // })

        // return token with req and set it as cookie in the frontend 
        // bc the browser will block the third party cookie
        return res.status(200).json({ ...user, token })
    } catch (error) {
        console.log(error);
        return res.sendStatus(500)
    }
}