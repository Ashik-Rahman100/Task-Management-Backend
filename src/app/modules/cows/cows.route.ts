import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CowsController } from './cows.controller';
import { CowsValidation } from './cows.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(CowsValidation.createCowsZodSchema),
  auth(ENUM_USER_ROLE.SELLER),
  CowsController.createCow,
);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  CowsController.getSingleCow,
);
router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  CowsController.getAllCows,
);
router.patch(
  '/:id',
  validateRequest(CowsValidation.updateCowsZodSchema),
  auth(ENUM_USER_ROLE.SELLER),
  CowsController.updateCows,
);
router.delete('/:id', auth(ENUM_USER_ROLE.SELLER), CowsController.deleteCows);

export const CowsRoutes = router;
