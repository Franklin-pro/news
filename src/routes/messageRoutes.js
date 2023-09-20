import express from 'express';

import messageController from '../controller/messageController';
import dataChequer from '../middlewares/dataChequer';

const router = express.Router();

router.post("/",dataChequer.userRegisterIsEmpty,messageController.createMessage)
router.get("/",messageController.getAllMessage)
router.delete("/",messageController.deleteAllMessage)

export default router