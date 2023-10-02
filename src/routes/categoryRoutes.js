import express from 'express'
import categoryController from '../controller/categoryController'

const router = express.Router()

router.post("/",categoryController.createCategory)
export default router