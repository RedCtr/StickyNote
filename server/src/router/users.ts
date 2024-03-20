import { Router } from "express";
import { verifyToken } from "../middlewares";
import { getUser } from "../controllers/users";

export default (route: Router) => {
    route.get('/user', verifyToken, getUser)
}