const Order = require('../models/Order');
const { sendSms } = require('../utils/twilio');

module.exports = class OrderService {
  //send a text and store the order

  static async createOrder({ quantity }) {
    //send text
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `New Order received for ${quantity}`
    );

    //store the order
    const order = await Order.insert({ quantity });

    return order;
  }


  static async getAllOrders() {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      'New Order Received!'
    );
    const order = await Order.getOrders();
    console.log('getALLorders function working', order);
    return order;
  }

  static async getById() {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      'We have an id for your order'
    );
    const id = await Order.getOrderId();
    console.log('getBYid function working');
    return id;
  }
};
