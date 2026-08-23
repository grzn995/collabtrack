import { Router } from "express";
import {validateProjectPermission, verifyJWT} from "../middlewares/auth.middleware.js"
import { validate } from "../middlewares/validator.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { UserRolesEnum,AvailableUserRole } from "../utils/constants.js";
import { createTaskValidator, updateTaskValidator, createSubtaskValidator, updateSubtaskValidator } from "../validators/index.js";
import { createTask, createSubtask, deleteSubtask, deleteTask, getTaskById, getTasks, updateSubtask, updateTask } from "../controllers/task.controllers.js";
const taskRouter = Router()
taskRouter.use(verifyJWT)

taskRouter.route("/:projectId").get(validateProjectPermission(AvailableUserRole), getTasks)
taskRouter.route("/:projectId").post(validateProjectPermission([UserRolesEnum.ADMIN, UserRolesEnum.PROJECT_ADMIN]),upload.array("attachments"), createTaskValidator(),validate, createTask)
taskRouter.route("/:projectId/t/:taskId").get(validateProjectPermission(AvailableUserRole),getTaskById)
taskRouter.route("/:projectId/t/:taskId").put(validateProjectPermission([UserRolesEnum.ADMIN,UserRolesEnum.PROJECT_ADMIN]), upload.array("attachments"),updateTaskValidator(),validate,updateTask)
taskRouter.route("/:projectId/t/:taskId").delete(validateProjectPermission([UserRolesEnum.ADMIN,UserRolesEnum.PROJECT_ADMIN]), deleteTask)
taskRouter.route("/:projectId/t/:taskId/subtasks").post(validateProjectPermission([UserRolesEnum.ADMIN,UserRolesEnum.PROJECT_ADMIN]), createSubtaskValidator(),validate,createSubtask)
taskRouter.route("/:projectId/st/:subTaskId").put(validateProjectPermission(AvailableUserRole), updateSubtaskValidator(),validate,updateSubtask)
taskRouter.route("/:projectId/st/:subTaskId").delete(validateProjectPermission([UserRolesEnum.ADMIN,UserRolesEnum.PROJECT_ADMIN]), deleteSubtask)



export default taskRouter
