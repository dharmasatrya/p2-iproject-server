const { User, Item, Wishlist } = require("../models/index");
const nodemailer = require("nodemailer");

class ScheduleController {
  static async ageItem(req, res, next) {
    try {
      const result = await Item.findAll({ where: { status: "pending" } });
      if (result.length !== 0) {
        result.forEach(async (data) => {
          if (data.dataValues.readyIn - 1 === 0) {
            const readyIn = data.dataValues.readyIn - 1;
            const status = (data.dataValues.status = "available");

            //save
            await Item.update({ readyIn, status }, { where: { id: data.id } });

            // findWishlist
            const Wishlists = await Wishlist.findAll({
              where: { itemId: data.dataValues.id },
              attributes: { include: ["id"] },
              include: [{ model: User }, { model: Item }],
            });

            // loop per items wishlisted
            if (Wishlists) {
              Wishlists.forEach(async (el) => {
                //nodemailer
                const itemName = el.dataValues.Item.dataValues.name;
                const email = el.dataValues.User.dataValues.email;
                const smptTransport = nodemailer.createTransport({
                  service: "gmail",
                  auth: {
                    user: "itemshop.phase2@gmail.com",
                    pass: "dharma123!",
                  },
                });

                let sendResult = await smptTransport.sendMail({
                  from: "itemshop.phase2@gmail.com",
                  to: email,
                  subject: "Your desired Item is now available!",
                  text: `hello ${itemName} is now available for purchase!`,
                });
              });
            }
          } else {
            const readyIn = data.dataValues.readyIn - 1;
            const status = (data.dataValues.status = "pending");
            await Item.update({ readyIn, status }, { where: { id: data.id } });
          }
        });
        res.status(200).json("done");
        console.log("done ageing")
      } else {
        res.status(200).json({ msg: "nothing to age" });
        console.log("done with nothing to age")
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async sayHello(req, res, next){
      try {
          await console.log("hello")
      } catch (error) {
          console.log(error)
      }
  }
}

module.exports = ScheduleController;
