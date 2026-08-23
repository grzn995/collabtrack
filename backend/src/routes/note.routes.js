import { Router } from "express";
import { validate } from "../middlewares/validator.middleware.js";
import { validateProjectPermission, verifyJWT } from "../middlewares/auth.middleware.js";
import { AvailableUserRole, UserRolesEnum } from "../utils/constants.js";
import { createNote, deleteNote, getNoteById, getNotes, updateNote } from "../controllers/note.controllers.js";
import { createNoteValidator, updateNoteValidator } from "../validators/index.js";


const noteRouter = Router()
noteRouter.use(verifyJWT)

noteRouter.route("/:projectId").get(validateProjectPermission(AvailableUserRole),getNotes)
  .post(validateProjectPermission([UserRolesEnum.ADMIN]),createNoteValidator(),validate,createNote)

noteRouter.route("/:projectId/n/:noteId").get(validateProjectPermission(AvailableUserRole),getNoteById)
  .put(validateProjectPermission([UserRolesEnum.ADMIN]),updateNoteValidator(),validate,updateNote)
  .delete(validateProjectPermission([UserRolesEnum.ADMIN]),deleteNote)


export {noteRouter}
