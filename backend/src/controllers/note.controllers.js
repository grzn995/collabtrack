import { ProjectNote } from "../models/note.models.js"
import { ApiResponse } from "../utils/api-response.js"
import {ApiError } from "../utils/api-error.js"
import { asyncHandler } from "../utils/asynchandler.js"
import {Project} from "../models/project.models.js"

const getNotes = asyncHandler(async(req,res)=>{
  const{projectId} = req.params

  const project = await Project.findById(projectId)

  if(!project) throw new ApiError(404,"Project not found ")

  const projectNote = await ProjectNote.find({
    project : projectId
  }).populate("createdBy","username fullName avatar")


  return res.status(200).json(new ApiResponse(200,projectNote,"Project notes fetched successfully"))


})
const getNoteById = asyncHandler(async(req,res)=>{
  const {projectId,noteId} = req.params
  const projectNote = await ProjectNote.findById(noteId).populate("createdBy", "username fullName avatar")

  

  if(!projectNote) throw new ApiError(404,"Project note not found")
  if(projectNote.project.toString() != projectId) throw new ApiError(404,"Project note doesnt match projectId")

  return res.status(200).json(new ApiResponse(200,projectNote,"Project note fetched successfully"))
  

})
const createNote = asyncHandler(async(req,res)=>{
  const {content} = req.body
  const {projectId} = req.params
  const project = await Project.findById(projectId)

  if(!project) throw new ApiError(404,"Project not found")

  const projectNote = await ProjectNote.create({project : projectId,createdBy: req.user._id, content})


  return res.status(201).json(new ApiResponse(201,projectNote,"Project note created successfully"))

})
const updateNote = asyncHandler(async(req,res)=>{
  const {noteId} = req.params
  const {content} = req.body
  let projectNote = await ProjectNote.findById(noteId)
  if(!projectNote) throw new ApiError(404,"Project note not found")
  projectNote.content = content
  await projectNote.save()
  return res.status(200).json(new ApiResponse(200,projectNote,"Project note updated successfully"))
})
const deleteNote = asyncHandler(async(req,res)=>{
  const {noteId} = req.params

  const projectNote = await ProjectNote.findById(noteId)

  if(!projectNote) throw new ApiError(404,"Project note not found")
  
  await ProjectNote.findByIdAndDelete(noteId)

  return res.status(200).json(new ApiResponse(200,projectNote,"Project note deleted successfully"))


})

export {getNotes,getNoteById,createNote,updateNote,deleteNote}
