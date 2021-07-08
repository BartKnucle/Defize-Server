const management = require('./management')
const game = require('./game')

module.exports = function (app) {
  app.configure(management)
  app.configure(game)
}
