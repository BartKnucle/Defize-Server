const hunts = require('./hunts/service')
const steps = require('./steps/service')

module.exports = function (app) {
  app.configure(hunts)
  app.configure(steps)
}
