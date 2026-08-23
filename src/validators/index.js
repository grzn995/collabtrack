import {body} from "express-validator"
import { AvailableUserRole, AvailableTaskStatus } from "../utils/constants.js"


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
    body("newPassword").notEmpty().withMessage("New password cannot be empty").trim()
  ]
}


export const createProjectValidator = () => {
  return [
    body("name").notEmpty().withMessage("Name is required"),
    body("description").optional()
  ]
}


export const addMemberToProjectValidator = () => {
  return [
    body("email").trim().notEmpty().withMessage("Email is required").isEmail().withMessage("Email is Invalid"),
    body("role").notEmpty().withMessage("Role is required").isIn(AvailableUserRole).withMessage("Role is invalid")
  ]
}


export const createTaskValidator = () => {
  return [
    body("title").trim().notEmpty().withMessage("Title is required"),
    body("description").optional().trim(),
    body("assignedTo").optional().isMongoId().withMessage("Assigned to must be a valid user id"),
    body("status").optional().isIn(AvailableTaskStatus).withMessage("Status is invalid")
  ]
}


export const updateTaskValidator = () => {
  return [
    body("title").optional().trim().notEmpty().withMessage("Title cannot be empty"),
    body("description").optional().trim(),
    body("assignedTo").optional().isMongoId().withMessage("Assigned to must be a valid user id"),
    body("status").optional().isIn(AvailableTaskStatus).withMessage("Status is invalid")
  ]
}


export const createSubtaskValidator = () => {
  return [
    body("title").trim().notEmpty().withMessage("Title is required")
  ]
}


export const updateSubtaskValidator = () => {
  return [
    body("title").optional().trim().notEmpty().withMessage("Title cannot be empty"),
    body("isCompleted").optional().isBoolean().withMessage("isCompleted must be a boolean")
  ]
}

