require("dotenv").config();
const Transaction = require("../database/index").Transaction;
const User = require("../database/index").User;
const axios = require("axios");
//buy function for ticker
const buy = (ticker, quantity, user, cb) => {
  if (!Number.isInteger(parseFloat(quantity))) {
    cb("Not an integer");
  } else {
    axios
      .get(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${process.env.API_KEY}`
      )
      .then(res => {
        if (res.data["Global Quote"]) {
          const stock = res.data["Global Quote"];
          const stockKeys = Object.keys(stock);
          Transaction.create({
            ticker: stock[stockKeys[0]],
            cost: stock[stockKeys[4]],
            quantity,
            userId: user.id
          })
            .then(transaction => {
              //if transaction was successfully created
              cb(null, transaction);
              User.update(
                {
                  balance:
                    user.balance - transaction.cost * transaction.quantity
                },
                {
                  where: {
                    id: user.id
                  }
                }
              ).catch(err => cb(err));
            })
            .catch(err => {
              cb(err);
            });
        } else {
          //if ticker does not exist
          cb("Ticker does not exist.");
        }
      });
  }
};
//get all transactions for user who is logged in
//select * from transactions where userId={userId}
const get = (userId, cb) => {
  const transactions = Transaction.findAll({
    where: {
      userId
    }
  })
    .then(transactions => {
      cb(null, transactions);
    })
    .catch(err => {
      cb(err);
    });
};
module.exports = {
  buy,
  get
};
