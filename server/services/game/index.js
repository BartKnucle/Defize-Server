const hunts = require('./hunts')
const hunts_players = require('./hunts_players')
const steps = require('./steps')

module.exports = function (app) {
  app.configure(hunts)
  app.configure(hunts_players)
  app.configure(steps)
}
