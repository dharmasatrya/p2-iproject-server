const { User, Item, Wishlist } = require("../models/index");
const { checkPassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const steamKey = "042BC8DE9027E37C1D8D62D59CD9FE73";
const axios = require("axios")

class CredentialController{
    static async Register(req, res, next) {
        const { email, password, steamId, role } = req.body;
        try {
          if (email == undefined || password == undefined) {
            throw { name: "Bad Request", code: 400 };
          }
    
          const fetchSteam = await axios({
            method: "get",
            url: `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${steamKey}&steamids=${steamId}`,
          });
    
          const steamURL = fetchSteam.data.response.players[0].profileurl;
          const avatar = fetchSteam.data.response.players[0].avatarmedium;
    
          const result = await User.create({
            email,
            password,
            steamId,
            steamURL,
            avatar,
            role,
          });
          res
            .status(201)
            .json({ id: result.id, email: result.email, role: result.role });
        } catch (error) {
          next(error);
          console.log(error);
        }
      }
    
      static async Login(req, res, next) {
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
              res.status(200).json({
                  role: result.role,
                  access_token
              });
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
}

module.exports = CredentialController