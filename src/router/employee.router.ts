import express from 'express'
import {
  createEmployeeHandler,
  getAllEmployeeHandler,
} from '../controller/employee.controller'
import { validate } from '../middleware/validate'
import { createEmployeeSchema } from '../schema/employee.schema'
import { checkToken } from '../middleware/checkToken'

const router = express.Router()

router.post('/', validate(createEmployeeSchema), createEmployeeHandler)
router.get('/', checkToken, getAllEmployeeHandler)

export default router
