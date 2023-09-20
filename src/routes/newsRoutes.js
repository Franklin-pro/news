import express from 'express'
import newsController from '../controller/newsController'

const router = express.Router()

router.post("/",newsController.newsletter)
router.get("/",newsController.getAllNews)
router.delete("/",newsController.deleteAllNews)
router.patch("/:id",newsController.updateNews)
router.get("/:id",newsController.getOneNews)
router.delete("/:id",newsController.deleteOneNews)
router.put("/like/:id",newsController.likes)
router.put("/unlike/:id",newsController.unlikes)
export default router