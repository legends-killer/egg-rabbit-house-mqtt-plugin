# egg-rabbit-house-mqtt-plugin

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-rabbit-house-mqtt-plugin.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-rabbit-house-mqtt-plugin
[travis-image]: https://img.shields.io/travis/eggjs/egg-rabbit-house-mqtt-plugin.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-rabbit-house-mqtt-plugin
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-rabbit-house-mqtt-plugin.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-rabbit-house-mqtt-plugin?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-rabbit-house-mqtt-plugin.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-rabbit-house-mqtt-plugin
[snyk-image]: https://snyk.io/test/npm/egg-rabbit-house-mqtt-plugin/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-rabbit-house-mqtt-plugin
[download-image]: https://img.shields.io/npm/dm/egg-rabbit-house-mqtt-plugin.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-rabbit-house-mqtt-plugin

<!--
Description here.
-->

## Install

```bash
$ npm i egg-rabbit-house-mqtt-plugin --save
$ yarn add egg-rabbit-house-mqtt-plugin
```

## Usage

```js
// {app_root}/config/plugin.js
exports.rabbitHouseMqttPlugin = {
  enable: true,
  package: 'egg-rabbit-house-mqtt-plugin',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.rabbitHouseMqttPlugin = {
  port: 1883,
  username: 'user',
  password: '123456',
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

<!-- example here -->

## Questions & Suggestions

Please open an issue [here](https://github.com/legends-killer/egg-rabbit-house-mqtt-plugin/issues).

## License

[MIT](LICENSE)
