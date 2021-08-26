const { User, Item, Wishlist } = require("../models/index");
const nodemailer = require("nodemailer");

class ScheduleController {
  static async ageItem() {
    try {
      const result = await Item.findAll({ where: { status: "pending" } });
      if (result.length !== 0) {
        result.forEach(async (data) => {
          if (data.dataValues.readyIn - 1 === 0) {
            const readyIn = data.dataValues.readyIn - 1;
            const status = "available";

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
            const status = "pending"
            await Item.update({ readyIn, status }, { where: { id: data.id } });
          }
        });
        console.log("done ageing")
      } else {
        console.log("done with nothing to age")
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async ageDemo(req,res) {
    try {
      const result = await Item.findAll({ where: { status: "pending" } });
      if (result.length !== 0) {
        result.forEach(async (data) => {
          if (data.dataValues.readyIn - 1 === 0) {
            const readyIn = data.dataValues.readyIn - 1;
            const status = "available";

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
            const status = "pending"
            await Item.update({ readyIn, status }, { where: { id: data.id } });
          }
        });
        console.log("done ageing")
        res.status(200).json("done aging")
      } else {
        res.status(200).json("no pending items found")
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error)
    }
  }
}

module.exports = ScheduleController;
