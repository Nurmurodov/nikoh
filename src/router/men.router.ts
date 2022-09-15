import express from 'express'
import { checkToken } from '../middleware/checkToken'
import { checkAccess } from '../middleware/checkAccess'
import { Role } from '../enums/Role'
import { validate } from '../middleware/validate'
import { createPersonSchema, editPersonSchema } from '../schema/person.schema'
import {
  createManHandler,
  deleteManHandler,
  getManHandler,
  getMenForMarriageHandler,
  getMenHandler,
  updateManHandler,
} from '../controller/men.controller'

const router = express.Router()

router.use(checkToken)
router.use(checkAccess([Role.IMOM, Role.NOIB]))

router
  .route('/')
  .get(getMenHandler)
  .post(validate(createPersonSchema), createManHandler)

router.route('/marriage').get(getMenForMarriageHandler)

router
  .route('/:id')
  .get(getManHandler)
  .patch(validate(editPersonSchema), updateManHandler)
  .delete(deleteManHandler)

export default router
