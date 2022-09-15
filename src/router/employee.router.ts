import express from 'express'
import {
  changeStatusHandler,
  createEmployeeHandler,
  deleteEmployeeHandler,
  editEmployeeHandler,
  getAllEmployeeHandler,
  getEmployeeHandler,
} from '../controller/employee.controller'
import { validate } from '../middleware/validate'
import {
  createEmployeeSchema,
  editEmployeeSchema,
} from '../schema/employee.schema'
import { checkToken } from '../middleware/checkToken'
import { checkAccess } from '../middleware/checkAccess'
import { Role } from '../enums/Role'

const router = express.Router()

router.use(checkToken)
router.use(checkAccess([Role.SUPER_ADMIN]))

router
  .route('/')
  .get(getAllEmployeeHandler)
  .post(validate(createEmployeeSchema), createEmployeeHandler)

router
  .route('/:id')
  .get(getEmployeeHandler)
  .delete(deleteEmployeeHandler)
  .patch(validate(editEmployeeSchema), editEmployeeHandler)

router.route('/change-status/:id').put(changeStatusHandler)

export default router
