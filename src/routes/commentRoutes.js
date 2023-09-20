import express from 'express'
import commentController from '../controller/commentController'

const router = express.Router()

router.post("/:id",commentController.createComment)

export default router