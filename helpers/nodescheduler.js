const schedule = require('node-schedule');

const job = schedule.scheduleJob({hour: 23}, async function(){
    try {
        const result = await Item.findAll({ where: { status: "pending" } });
        result.forEach(async (data) => {
          if (data.dataValues.readyIn - 1 === 0) {
            const readyIn = data.dataValues.readyIn - 1;
            const status = (data.dataValues.status = "available");
  
            //save
            await Item.update({ readyIn, status }, { where: { id: data.id } });
  
            //findWishlist
            const Wishlists = await Wishlist.findAll({
              where: {itemId = data.dataValues.id},
              attributes: { include: ["id"] },
              include: {
                model: User,
              },
            });
  
            //loop per items wishlisted
            Wishlists.forEach(async el => {
              //nodemailer
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
            })
            
            
  
          } else {
            const readyIn = data.dataValues.readyIn - 1;
            const status = (data.dataValues.status = "pending");
            await Item.update({ readyIn, status }, { where: { id: data.id } });
          }
        });
        res.status(200).json("done");
      } catch (error) {
        next(error);
      }
  });