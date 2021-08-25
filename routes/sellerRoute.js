const sellerController = require("../controllers/sellerController")
const upload = require("../middlewares/multer")
const imgKit = require("../middlewares/imgkit")

const router = require("express").Router()

router.get("/items", sellerController.sellerGetAll)
router.post("/items",upload.single("imageUrl"), imgKit, sellerController.sellerPost)
router.delete("/items/:id", sellerController.sellerDelete)

// router.get("/ageItem", sellerController.readyItem)


module.exports = router