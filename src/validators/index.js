import {body} from "express-validator"



export const userRegisterValidator = () => {
  return [
    body("email").trim().notEmpty().withMessage("Email is required").isEmail().withMessage("Email is invalid"),
    body("username").trim()
      .notEmpty()
      .withMessage("Username is required")
      .isLowercase()
      .withMessage("Username must be in lowercase")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long"),
    body("password").trim().notEmpty().withMessage("Password is required"),
    body("fullName").optional().trim()
  ]
}

export const userLoginValidator = () => {
  return [
    body("email").optional().isEmail().withMessage("Email is invalid"),
    body("password").notEmpty().withMessage("Password is required")
  ]
}


export const userChangeCurrentPasswordValidator = () => {
  return [
    body("oldPassword").notEmpty().withMessage("Old password cannot be empty"),
    body("newPassword").notEmpty().withMessage("New password cannot be empty")
  ]



}


export const userForgotPasswordValidator = () => {

  return [
    body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Email is invalid")
  ]

}


export const userResetForgotPasswordValidator = () => {
  return [
    body("newPassword").notEmpty().withMessage("New password cannot be empty")
  ]
}

