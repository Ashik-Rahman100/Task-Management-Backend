import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { TasksController } from './task.controller';
import { TaskValidation } from './task.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(TaskValidation.createTaskZodSchema),
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  TasksController.createTask,
);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  TasksController.getSingleTask,
);
router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  TasksController.getAllTasks,
);
router.patch(
  '/:id',
  validateRequest(TaskValidation.updateTaskZodSchema),
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  TasksController.updateTask,
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  TasksController.deleteTask,
);

export const TaskRoutes = router;
