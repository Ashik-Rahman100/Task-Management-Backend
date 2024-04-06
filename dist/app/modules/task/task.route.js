"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const task_controller_1 = require("./task.controller");
const task_validation_1 = require("./task.validation");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(task_validation_1.TaskValidation.createTaskZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.ADMIN), task_controller_1.TasksController.createTask);
router.get('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.USER), task_controller_1.TasksController.getSingleTask);
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.USER), task_controller_1.TasksController.getAllTasks);
router.patch('/:id', (0, validateRequest_1.default)(task_validation_1.TaskValidation.updateTaskZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.ADMIN), task_controller_1.TasksController.updateTask);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.ADMIN), task_controller_1.TasksController.deleteTask);
exports.TaskRoutes = router;
