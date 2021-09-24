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
    return order;
  }

  static async getById(id) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      'We have an id for your order'
    );
    const order = await Order.getOrderId(id);
    return order;
  }

  static async updateOrder(id, quantity) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      'We have updated your order'
    );
    const updatedOrder = await Order.patchOrder(id, quantity);
    return updatedOrder;
  }

  static async deleteOrder(id) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      'We have canceled your order'
    );
    const deletedOrder = await Order.deleteUserOrder(id);
    return deletedOrder;
  }
};
