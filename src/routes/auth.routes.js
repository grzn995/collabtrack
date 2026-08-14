import { Router } from "express";
import { login, logout, registerUser } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validator.middleware.js";
import {userLoginValidator, userRegisterValidator} from "../validators/index.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const authRouter = Router()

authRouter.route("/register").post(userRegisterValidator() , validate, registerUser)
authRouter.route("/login").post(userLoginValidator(), validate, login)
authRouter.route("/logout").post(verifyJWT, logout)

export {authRouter}
