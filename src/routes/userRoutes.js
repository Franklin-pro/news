import express  from "express";
import usercontroller from "../controller/usercontroller";
import dataChequer from "../middlewares/dataChequer";
import validator from "../middlewares/validator";
import verifyAccess from "../middlewares/verifyAccess";
const router = express.Router()

router.post(
    "/",
  dataChequer.userRegisterIsEmpty,
    dataChequer.emailExist,
    validator.userAccount(),
 validator.inputValidator,
usercontroller.createUser)
router.get("/",usercontroller.getAllUsers)
router.get("/:id",usercontroller.getOneuser)
router.delete("/",verifyAccess("user"),usercontroller.deleteAllUsers)
router.delete("/:id",usercontroller.deleteOneUser)
router.patch("/:id",usercontroller.userUpdate)
router.post("/login", usercontroller.login);

export default router