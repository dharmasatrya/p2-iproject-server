const buyerController = require("../controllers/buyerController")
const {authentication} = require("../middlewares/authorization")

const router = require("express").Router()

router.get("/items/active", buyerController.getAvailableItems)
router.get("/items/pending", buyerController.getPendingItems)
router.get("/buy/:id", buyerController.buyItem)

router.use(authentication)

router.post("/createInvoice", buyerController.createInvoice)
router.get("/wishlist/:id", buyerController.addWishlist)
router.get("/wishlist", buyerController.getWishlist)
router.delete("/wishlist/:id", buyerController.deleteWishlist)

module.exports = router