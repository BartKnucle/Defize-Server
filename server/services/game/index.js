const hunts = require('./hunts')
const steps = require('./steps')

module.exports = function (app) {
  app.configure(hunts)
  app.configure(steps)
}
