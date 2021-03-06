const pool = require('../lib/utils/pool');
// const twilio = require('twilio');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn()
  }
}));

describe('03_separation-of-concerns-demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a new order in our database and sends a text message', () => {
    return request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 })
      .then(res => {
        // expect(createMessage).toHaveBeenCalledTimes(1);
        expect(res.body).toEqual({
          id: '1',
          quantity: 10
        });
      });
  });

  it('should GET all orders', async() => {
    await request(app).post('/api/v1/orders').send({ quantity: 10 });
    return request(app)
      .get('/api/v1/orders')
      .then((res) => {
        expect(res.body).toEqual([
          {
            id: '1',
            quantity: 10,
          },
        ]);
      });
  });

  it('should GET an order by id', async() => {
    await request(app).post('/api/v1/orders').send({ quantity: 10 });
    return request(app)
      .get('/api/v1/orders/1')
      .then(res => {
        expect(res.body).toEqual(
          {
            id: '1',
            quantity: 10
          }
        );
      });
  });
  
  it('should PATCH an order by id & return updated order', async() => {
    await request(app).post('/api/v1/orders').send({ quantity: 10 });
    return request(app)
      .patch('/api/v1/orders/1')
      .send({ quantity: 9 })
      .then((res) => {
        expect(res.body).toEqual(
          {
            id: '1',
            quantity: 9,
          }
        );
      });
  });
  it('should DELETE an order', async() => {
    await request(app).post('/api/v1/orders').send({ quantity: 10 });
    return request(app)
      .delete('/api/v1/orders/1')
      .then(res => {
        expect(res.body).toEqual(
          {
            id: '1',
            quantity: 10
          }
        );
      });
  });
});
