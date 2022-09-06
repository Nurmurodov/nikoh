import express from 'express'
import { validate } from '../middleware/validate'
import { loginSchema } from '../schema/auth.schema'
import { loginHandler } from '../controller/auth.controller'

const router = express.Router()

router.post('/login', validate(loginSchema), loginHandler)

export default router
