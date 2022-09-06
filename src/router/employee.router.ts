import express from 'express'
import { createEmployeeHandler } from '../controller/employee.controller'
import { validate } from '../middleware/validate'
import { createEmployeeSchema } from '../schema/employee.schema'

const router = express.Router()

router.post('/', validate(createEmployeeSchema), createEmployeeHandler)

export default router
