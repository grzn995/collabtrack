import { Router } from "express";
import { login, registerUser } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validator.middleware.js";
import {userLoginValidator, userRegisterValidator} from "../validators/index.js"


const authRouter = Router()

authRouter.route("/register").post(userRegisterValidator() , validate, registerUser)
authRouter.route("/login").post(userLoginValidator(), validate, login)

export {authRouter}
