const router = require("express").Router()
const sellerRouter = require("./sellerRoute")
const buyerRouter = require("./buyerRoute")
const CredentialController = require("../controllers/credentialsController")
const {authentication} = require("../middlewares/authorization")
const ScheduleController = require("../controllers/scheduleController")


router.get("/age", ScheduleController.ageDemo)

router.post("/register", CredentialController.Register)
router.post("/login", CredentialController.Login)

router.use("/buyer", buyerRouter)
router.use(authentication)

router.use("/seller", sellerRouter)

module.exports = router