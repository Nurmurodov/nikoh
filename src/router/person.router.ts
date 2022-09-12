import express from 'express'
import { checkToken } from '../middleware/checkToken'
import { checkAccess } from '../middleware/checkAccess'
import { Role } from '../enums/Role'
import { validate } from '../middleware/validate'
import { createPersonSchema, editPersonSchema } from '../schema/person.schema'
import {
  createPersonHandler,
  deletePersonHandler,
  editPersonHandler,
  getAllPersonForMarriageHandler,
  getAllPersonHandler,
} from '../controller/person.controller'

const router = express.Router()

router.use(checkToken, checkAccess([Role.SUPER_ADMIN]))

router
  .route('/')
  .get(getAllPersonHandler)
  .post(validate(createPersonSchema), createPersonHandler)

router
  .route('/:id')
  .patch(validate(editPersonSchema), editPersonHandler)
  .delete(deletePersonHandler)

router.route('/all').get(getAllPersonForMarriageHandler)

export default router
