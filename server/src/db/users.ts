import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, required: true, select: false },
    }
})


export const UserModel = mongoose.model("User", UserSchema)

export const getUserByEmail = (email: string) => UserModel.findOne({ email })
export const getUserById = (id: string) => UserModel.findById(id)
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject())