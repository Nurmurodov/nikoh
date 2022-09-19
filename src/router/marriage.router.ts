import express from 'express'
import { checkToken } from '../middleware/checkToken'
import { checkAccess } from '../middleware/checkAccess'
import { Role } from '../enums/Role'
import { validate } from '../middleware/validate'
import { marriageSchema } from '../schema/marriage.schema'
import {
  cancelMarriageHandler,
  createMarriageHandler,
  getMarriagesListHandler,
  getOneMarriageHandler,
} from '../controller/marriage.controller'

const router = express.Router()

router.use(checkToken)
router.use(checkAccess([Role.IMOM, Role.NOIB]))

router
  .route('/')
  .get(getMarriagesListHandler)
  .post(validate(marriageSchema), createMarriageHandler)

router.route('/:id').get(getOneMarriageHandler).patch(cancelMarriageHandler)

export default router
