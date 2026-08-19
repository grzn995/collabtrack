import {User} from "a../models/user.models.js"
import mongoose from "mongoose"
import { ApiResponse } from "../utils/api-response.js"
import {ApiError } from "../utils/api-error.js"
import { asyncHandler } from "../utils/asynchandler.js"
import { emailVerificationMailgenContent, sendEmail } from "../utils/mail.js"
import {Project} from "../models/project.models.js"
import {ProjectMember} from "../models/projectmember.models.js"
import { UserRolesEnum } from "../utils/constants.js"




const getProject = asyncHandler(async (res,req) => {})
const getProjectById = asyncHandler(async (res,req) => {})
const createProject = asyncHandler(async (res,req) => {
  const {name,description} = req,body
  const project = await Project.create({
    name,
    description,
    createdBy : new mongoose.Types.ObjectId(req.user._id)
  })
  await ProjectMember.create({
    user : new mongoose.Types.ObjectId(req.user._id),
    project : new mongoose.Types.ObjectId(project._id),
    role : UserRolesEnum.ADMIN
  })

  return res.status(201).json(
    new ApiResponse(201,project,"Project created successfully")
  )


})
const updateProject = asyncHandler(async (res,req) => {
  const {name, description} = req.body
  const {projectId} = req.params
  
  const project = await Project.findByIdAndDelete(projectId, {name, description},{new : true})
  if(!project){
    throw new ApiError(404,"Project not found")
  }
  return res.status(200).json(
    new ApiResponse(200, project, "Project updated successfully'")
  )


})
const deleteProject = asyncHandler(async (res,req) => {
  const {projectId} =  req.params
  const project = await Project.findByIdAndDelete(projectId)
  if(!project){
    throw new ApiError(404,"Project not found")
  }
  return res.status(200).json(
    new ApiResponse(200,project,"Project deleted successfully")
  )
  


})
const addMembersToProject= asyncHandler(async (res,req) => {})
const getProjectMembers = asyncHandler(async (res,req) => {})
const updateMemberRole = asyncHandler(async (res,req) => {})
const deleteMember = asyncHandler(async (res,req) => {})


export{ getProject,getProjectById,createProject,updateProject,deleteProject,addMembersToProject,getProjectMembers,updateMemberRole,deleteMember}

