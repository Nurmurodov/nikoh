import express from 'express'
import { checkToken } from '../middleware/checkToken'
import { checkAccess } from '../middleware/checkAccess'
import { Role } from '../enums/Role'
import { validate } from '../middleware/validate'
import { createPersonSchema, editPersonSchema } from '../schema/person.schema'
import {
  createWomanHandler,
  getWomenHandler,
  getWomenForMarriageHandler,
  deleteWomanHandler,
  updateWomanHandler,
  getWomanHandler,
  getMarriageOneWoman,
} from '../controller/women.controller'

const router = express.Router()

router.use(checkToken)
router.use(checkAccess([Role.IMOM, Role.NOIB]))

router
  .route('/')
  .get(getWomenHandler)
  .post(validate(createPersonSchema), createWomanHandler)

router.route('/marriage').get(getWomenForMarriageHandler)

router
  .route('/:id')
  .get(getWomanHandler)
  .patch(validate(editPersonSchema), updateWomanHandler)
  .delete(deleteWomanHandler)

router.route('/marriage/:id').get(getMarriageOneWoman)

export default router
