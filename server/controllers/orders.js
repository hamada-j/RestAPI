const mongoose = require("mongoose");
const Order = require("../model/order");
const Product = require("../model/product");

exports.ordersGetAll = (req, res, next) => {
  Order.find()
    .select("product quantity _id")
    .exec()
    .then(allOrders => {
      res.status(200).json({
        count: allOrders.length,
        orders: allOrders.map(order => {
          return {
            _id: order.id,
            product: order.product,
            quantity: order.quantity,
            request: {
              type: "GET",
              url: "http://localhost/orders/" + order._id
            }
          };
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.orderPost = (req, res, next) => {
  Product.findById(req.body.productId)
    .then(product => {
      if (!product) {
        return res.status(404).json({
          message: "No produc in Data Base"
        });
      }
      const order = new Order({
        _id: mongoose.Types.ObjectId(),
        // quantity: req.body.quantity - Product.quantity,
        quantity: req.body.quantity,
        product: req.body.productId
        //product: req.body.name ((((((aqui nombre))))))
      });
      return order.save();
    })
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Order stored correctly",
        createdOrder: {
          id: result._id,
          product: result.product,
          quantity: result.quantity
        },
        request: {
          type: "GET",
          url: "http://localhost:3000/orders/" + result._id
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "Product not found",
        error: err
      });
    });
};

exports.orderById = (req, res, next) => {
  // res.status(200).json({
  //   message: "get order with id",
  //   orderId: req.params.orderId
  // });

  Order.findById(req.params.orderId)
    .exec()
    .then(order => {
      if (!order) {
        return res.status(404).json({
          message: "Order not here"
        });
      }
      res.status(200).json({
        order: order,
        request: {
          type: "GET",
          url: "http://localhost:3000/orders"
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.orderDelete = (req, res, next) => {
  // const orderId = req.params.orderId;
  // res.status(200).json({
  //   message: "order deleted ",
  //   orderId: orderId
  // });
  Order.remove({ _Id: req.params.orderId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Order Deleted Correctly",
        request: {
          type: "POST",
          url: "http://localhost:3000/orders",
          body: {
            productId: "Id",
            quantity: "Number"
          }
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};
