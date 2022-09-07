import express from 'express'
import { validate } from '../middleware/validate'
import { loginSchema } from '../schema/auth.schema'
import { loginHandler, refreshHandler } from '../controller/auth.controller'

const router = express.Router()

router.post('/login', validate(loginSchema), loginHandler)

router.get('/refresh', refreshHandler)

export default router
