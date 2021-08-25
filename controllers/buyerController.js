const { User, Item, Wishlist } = require("../models/index");
const { Op } = require("sequelize");
const Xendit = require("xendit-node");
const x = new Xendit({
  secretKey:
    "xnd_development_TccY10pM4gyHNC9EGZOgED1ftJKnEwhL6XZwKIbJh5iZvanGXpyzL5bg3wHW4T",
});
const { Invoice } = x;
const i = new Invoice({});

class buyerController {
  static async createInvoice(req, res, next) {
    const { name, price, id } = req.body;
    console.log(req.body)
    try {
      let invoice = await i.createInvoice({
        externalID: name,
        payerEmail: "dharmasatrya10@gmail.com",
        description: name,
        amount: price,
        shouldSendEmail: true,
        successRedirectURL: `http://localhost:3000/buyer/buy/${id}`,
      });
      res.status(200).json(invoice);
    } catch (error) {
      console.log(error);
    }
  }

  static async getAvailableItems(req, res, next) {
    try {
      const { search, page } = req.query;
      let queries = {
        status: "available",
      };
      const limitedTo = 6;

      if (search) {
        queries.name = { [Op.like]: `%${search}` };
      }

      let skip = limitedTo * Number(page);

      const result = await Item.findAndCountAll({
        where: queries,
        limit: limitedTo,
        offset: skip,
      });

      res.status(200).json({
        page: page,
        size: limitedTo,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getPendingItems(req, res, next) {
    try {
      const { search, page } = req.query;
      let queries = {
        status: "pending",
      };
      const limitedTo = 6;

      if (search) {
        queries.name = { [Op.like]: `%${search}` };
      }

      let skip = limitedTo * Number(page);

      const result = await Item.findAndCountAll({
        where: queries,
        limit: limitedTo,
        offset: skip,
      });

      res.status(200).json({
        page: page,
        size: limitedTo,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async buyItem(req, res, next) {
    const id = req.params.id;
    try {
      const find = await Item.findByPk(id);
      if (find) {
        const created = await Item.findByPk(id);

        if (created) {
          const patch = await Item.update(
            { status: "sold" },
            { where: { id }, returning: true }
          );
          res.status(200).json({ message: "data updated" });
        }
      } else {
        throw { name: "NotFound", code: 404 };
      }
    } catch (error) {
      next(error);
    }
  }

  static async addWishlist(req, res, next) {
    const buyerId = req.user.id;
    const itemId = req.params.id;
    try {
      await Wishlist.create({ buyerId, itemId });
      res.status(201).json("added");
    } catch (error) {
      next(error);
    }
  }

  static async getWishlist(req, res, next) {
    const buyerId = req.user.id;
    try {
      const { search, page } = req.query;
      const limitedTo = 6;

      if (search) {
        queries.name = { [Op.like]: `%${search}` };
      }

      let skip = limitedTo * Number(page);


      const result = await Wishlist.findAndCountAll({
        where: { buyerId },
        attributes: { include: ["id"] },
        include: [{ model: User }, { model: Item }],
      });
      res.status(200).json({
        page: page,
        size: limitedTo,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteWishlist(req, res, next) {
    const id = req.params.id;
    try {
      await Wishlist.destroy({where: {id}});
      res.status(200).json("msg: deleted");
    } catch (error) {
      console.log(error)
      next(error);
    }
  }
}
module.exports = buyerController;
