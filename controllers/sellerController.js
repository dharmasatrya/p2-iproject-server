const { User, Item, Wishlist } = require("../models/index");
const axios = require("axios");
const { checkPassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const Steamkey = "042BC8DE9027E37C1D8D62D59CD9FE73";
const nodemailer = require("nodemailer");

class sellerController {
  static async sellerRegister(req, res, next) {
    const { email, password, steamId } = req.body;
    try {
      if (email == undefined || password == undefined) {
        throw { name: "Bad Request", code: 400 };
      }

      const fetchSteam = await axios({
        method: "get",
        url: `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${Steamkey}&steamids=${steamId}`,
      });

      const steamURL = fetchSteam.data.response.players[0].profileurl;
      const avatar = fetchSteam.data.response.players[0].avatarmedium;

      const result = await User.create({
        email,
        password,
        steamId,
        steamURL,
        avatar,
        role: "seller",
      });
      res
        .status(201)
        .json({ id: result.id, email: result.email, role: result.role });
    } catch (error) {
      // next(console.log);
      console.log(error);
    }
  }

  static async sellerLogin(req, res, next) {
    const { email, password } = req.body;
    try {
      const result = await User.findOne({ where: { email } });
      if (result) {
        if (checkPassword(password, result.password)) {
          const access_token = signToken({
            id: result.id,
            email: result.email,
            role: result.role,
            avatar: result.avatar,
            steamURL: result.steamURL,
          });
          res.status(200).json(access_token);
        } else {
          throw { name: "Unauthorized", code: 401 };
        }
      } else {
        throw { name: "Bad Request", code: 400 };
      }
    } catch (error) {
      next(error);
    }
  }

  static async sellerGetAll(req, res, next) {
    const sellerId = req.user.id;
    try {
      const result = await Item.findAll({ where: { sellerId } });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async sellerGetById(req, res, next) {
    try {
    } catch (error) {}
  }

  static async sellerPost(req, res, next) {
    try {
      const { name, price, imageUrl } = req.body;
      const sellerId = req.user.id;

      const result = await Item.create({
        name,
        price,
        imageUrl,
        sellerId,
        status: "pending",
        readyIn: 30,
      });

      res.status(201).json(result);
    } catch (error) {
      res.status(500).json(error);
      next(error);
      console.log("error");
    }
  }

  // static async readyItem(req, res, next) {
  //   try {
  //     const result = await Item.findAll({ where: { status: "pending" } });
  //     // console.log(result.dataValues)
  //     result.forEach(async (data) => {
  //       if (data.dataValues.readyIn - 1 === 0) {
  //         const readyIn = data.dataValues.readyIn - 1;
  //         const status = (data.dataValues.status = "available");

  //         //save
  //         await Item.update({ readyIn, status }, { where: { id: data.id } });

  //         //findWishlist
  //         const Wishlists = await Wishlist.findAll({
  //           where: {itemId = data.dataValues.id},
  //           attributes: { include: ["id"] },
  //           include: {
  //             model: User,
  //           },
  //         });

  //         //loop per items wishlisted
  //         Wishlists.forEach(async el => {
  //           //nodemailer
  //         let testAccount = await nodemailer.createTestAccount();

  //         let transporter = nodemailer.createTransport({
  //           host: "smtp.ethereal.email",
  //           port: 587,
  //           secure: false, // true for 465, false for other ports
  //           auth: {
  //             user: testAccount.user, // generated ethereal user
  //             pass: testAccount.pass, // generated ethereal password
  //           },
  //         });
  //         await transporter.sendMail({
  //           from: '"Fred Foo 👻" <foo@example.com>', // sender address
  //           to: `Wishlist`, // list of receivers
  //           subject: "Your Item is now Available", // Subject line
  //           text: "The item in your wishlist is now ready to purchase", // plain text body
  //           html: "<b>Hello world?</b>", // html body
  //         });
  //         })

  //         //notify user with nodemailer
          

  //       } else {
  //         const readyIn = data.dataValues.readyIn - 1;
  //         const status = (data.dataValues.status = "pending");
  //         await Item.update({ readyIn, status }, { where: { id: data.id } });
  //       }
  //     });
  //     res.status(200).json("done");
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  static async sayHello(req, res, next){
    console.log("a minute has passed")
  }

  static async sendMail(req, res, next){
    try {
      const smptTransport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "itemshop.phase2@gmail.com",
          pass: "dharma123!"
        }
      })

      let sendResult = await smptTransport.sendMail({
        from: "dharmasatrya@gmail.com",
        to: "dharmasatrya10@gmail.com",
        subject: "test",
        text: "hello"
      })
      res.status(200).json(sendResult)
    } catch (error) {
      res.status(500).json(error)
    }
  }


  static async sellerDelete(req, res, next) {
    try {
      const id = req.params.id;
      const find = await Item.findByPk(id);
      console.log(find);
      if (find) {
        await Item.destroy({ where: { id } });
        res.status(200).json({ message: "successfully deleted" });
      } else {
        throw { name: "NotFound", code: 404 };
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = sellerController;
