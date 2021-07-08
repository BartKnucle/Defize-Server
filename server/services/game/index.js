const hunts = require('./hunts/service')

module.exports = function (app) {
  app.configure(hunts)
}
