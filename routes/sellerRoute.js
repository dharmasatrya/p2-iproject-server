const sellerController = require("../controllers/sellerController")
const upload = require("../middlewares/multer")
const imgKit = require("../middlewares/imgkit")

const router = require("express").Router()

router.get("/items/ready", sellerController.sellerGetReady)
router.get("/items/pending", sellerController.sellerGetPending)
router.get("/items/sold", sellerController.sellerGetSold)
router.post("/items",upload.single("imageUrl"), imgKit, sellerController.sellerPost)
router.delete("/items/:id", sellerController.sellerDelete)


module.exports = router