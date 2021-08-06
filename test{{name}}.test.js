'use strict';

const mock = require('egg-mock');

describe('test/rabbit-house-mqtt-plugin.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/rabbit-house-mqtt-plugin-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, rabbitHouseMqttPlugin')
      .expect(200);
  });
});
