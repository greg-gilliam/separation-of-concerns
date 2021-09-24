const { Router } = require('express');
// const Order = require('../models/Order');
const OrderService = require('../services/OrderService');

module.exports = Router()
  .post('/', async(req, res, next) => {
    try {
      const order = await OrderService.createOrder(req.body);
      res.send(order);
    } catch(err) {
      next(err);
    }
  })
  .get('/', async(req, res, next) => {
    try {
      const order = await OrderService.getAllOrders();
      // console.log('controller working', order);
      res.send(order);
    } catch(error) {
      next(error);
    }
  })
  
  .get('/:id', async(req, res, next) => {
    // console.log(req.params);
    try {
      const order = await OrderService.getById(req.params.id);
      res.send(order);
    } catch(error) {
      next(error);
    }
  })

  .patch('/:id', async(req, res, next) => {
    try {
      const id = req.params.id;
      const quantity = req.body.quantity;
      console.log(quantity);
      const order = await OrderService.updateOrder(id, quantity);
      res.send(order);
    } catch(error) {
      next(error);
    }
  })

  .delete('/:id', async(req, res, next) => {
    try {
      const id = req.params.id;
      const deleteOrder = await OrderService.deleteOrder(id);
      res.send(deleteOrder);
    } catch(error) {
      next(error);
    }
  });
