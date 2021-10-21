const quests = require('./quests')
const quest_players = require('./quest_players')
const quest_paths = require('./quest_paths')
const steps = require('./steps')

module.exports = function (app) {
  app.configure(quests)
  app.configure(quest_players)
  app.configure(quest_paths)
  app.configure(steps)
}
