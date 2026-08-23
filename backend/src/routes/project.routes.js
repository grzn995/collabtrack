import { Router } from "express";
import { validate } from "../middlewares/validator.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getProject,getProjectById,createProject,updateProject,deleteProject,addMembersToProject,getProjectMembers,updateMemberRole,deleteMember} from "../controllers/project.controllers.js"
import { validateProjectPermission } from "../middlewares/auth.middleware.js";
import { addMemberToProjectValidator,createProjectValidator } from "../validators/index.js";
import { AvailableUserRole, UserRolesEnum } from "../utils/constants.js";
const projectRouter = Router()


projectRouter.use(verifyJWT)

projectRouter.route("/").get(getProject).post(createProjectValidator(),validate,createProject)



projectRouter.route("/:projectId").get(validateProjectPermission(AvailableUserRole),getProjectById)
  .put(validateProjectPermission([UserRolesEnum.ADMIN]),createProjectValidator(),validate, updateProject)
  .delete(validateProjectPermission([UserRolesEnum.ADMIN]),deleteProject)




projectRouter.route("/:projectId/members").get(validateProjectPermission(AvailableUserRole),getProjectMembers).post(validateProjectPermission([UserRolesEnum.ADMIN]),addMemberToProjectValidator(),validate,addMembersToProject)

projectRouter.route("/:projectId/members/:userId").put(validateProjectPermission([UserRolesEnum.ADMIN]),updateMemberRole).delete(validateProjectPermission([UserRolesEnum.ADMIN]),deleteMember)







export {projectRouter}
