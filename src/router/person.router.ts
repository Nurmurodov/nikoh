import express from 'express'
import { checkToken } from '../middleware/checkToken'
import { checkAccess } from '../middleware/checkAccess'
import { Role } from '../enums/Role'

const router = express.Router()

router.use(checkToken, checkAccess([Role.SUPER_ADMIN]))

router.route('/').get().post().patch()
