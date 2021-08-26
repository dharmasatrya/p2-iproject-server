"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = 
    [
      {
        name:"Blades of Voth Domosh",
        price: 325000,
        imageUrl: "https://i.postimg.cc/1z53Zf2N/Blades-Of-Voth-Domosh.png",
        status: "available",
        sellerId: 1,
        readyIn: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:"Demon Eater",
        price: 320000,
        imageUrl: "https://i.postimg.cc/nrvJmJNJ/Demon-Eater.png",
        status: "available",
        sellerId: 1,
        readyIn: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:"Demon Eater",
        price: 330000,
        imageUrl: "https://i.postimg.cc/nrvJmJNJ/Demon-Eater.png",
        status: "available",
        sellerId: 1,
        readyIn: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:"Feast of Abcession",
        price: 320000,
        imageUrl: "https://i.postimg.cc/bN35Brx5/Feast-Of-Abcession.png",
        status: "pending",
        sellerId: 1,
        readyIn: 15,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:"Feast of Abcession",
        price: 315000,
        imageUrl: "https://i.postimg.cc/bN35Brx5/Feast-Of-Abcession.png",
        status: "sold",
        sellerId: 1,
        readyIn: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:"Fiery Soul of the Slayer",
        price: 250000,
        imageUrl: "https://i.postimg.cc/fTGdZjfS/Fiery-Soul-Of-The-Slayer.png",
        status: "available",
        sellerId: 1,
        readyIn: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:"Fiery Soul of the Slayer",
        price: 250000,
        imageUrl: "https://i.postimg.cc/fTGdZjfS/Fiery-Soul-Of-The-Slayer.png",
        status: "sold",
        sellerId: 1,
        readyIn: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:"Fractal Horns of Inner Abysm",
        price: 340000,
        imageUrl: "https://i.postimg.cc/XvHdMMH4/Fractal-Horns-Of-Inner-Abysm.png",
        status: "available",
        sellerId: 1,
        readyIn: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:"Fractal Horns of Inner Abysm",
        price: 340000,
        imageUrl: "https://i.postimg.cc/XvHdMMH4/Fractal-Horns-Of-Inner-Abysm.png",
        status: "pending",
        sellerId: 1,
        readyIn: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:"Fractal Horns of Inner Abysm",
        price: 340000,
        imageUrl: "https://i.postimg.cc/XvHdMMH4/Fractal-Horns-Of-Inner-Abysm.png",
        status: "pending",
        sellerId: 1,
        readyIn: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:"Frost Avalance",
        price: 310000,
        imageUrl: "https://i.postimg.cc/8zyjcRhb/Frost-Avalance.png",
        status: "available",
        sellerId: 1,
        readyIn: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:"Frost Avalance",
        price: 300000,
        imageUrl: "https://i.postimg.cc/8zyjcRhb/Frost-Avalance.png",
        status: "sold",
        sellerId: 1,
        readyIn: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:"Great Sage Reckoning",
        price: 300000,
        imageUrl: "https://i.postimg.cc/rpByRQz5/Great-Sage-Reckoning.png",
        status: "pending",
        sellerId: 1,
        readyIn: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:"Great Sage Reckoning",
        price: 350000,
        imageUrl: "https://i.postimg.cc/rpByRQz5/Great-Sage-Reckoning.png",
        status: "available",
        sellerId: 1,
        readyIn: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:"Manifold Paradox",
        price: 340000,
        imageUrl: "https://i.postimg.cc/Twc829bd/Manifold-Paradox.png",
        status: "available",
        sellerId: 1,
        readyIn: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:"Manifold Paradox",
        price: 345000,
        imageUrl: "https://i.postimg.cc/Twc829bd/Manifold-Paradox.png",
        status: "available",
        sellerId: 1,
        readyIn: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:"Manifold Paradox",
        price: 345000,
        imageUrl: "https://i.postimg.cc/Twc829bd/Manifold-Paradox.png",
        status: "pending",
        sellerId: 1,
        readyIn: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:"Whispering Dead",
        price: 9999999,
        imageUrl: "https://i.postimg.cc/wBbK1VTg/whispering-dead.png",
        status: "available",
        sellerId: 1,
        readyIn: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ];

    await queryInterface.bulkInsert('Items', data, {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Items', null, {});
  },
};
