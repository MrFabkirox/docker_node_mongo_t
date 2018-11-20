const request = require('supertest');
const app = require('../app');

describe('homepage', function() {
  it('welcomes the user', function (done) {
    request(app).get('/')
      .expect(200)
      .expect(/index/, done);
  });
});