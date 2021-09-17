const createModel = require('./model')
const { Steps } = require('./class')
const hooks = require('./hooks')

module.exports = (app) => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  }

  app.use('/api/game/steps', new Steps(options, app))
  const service = app.service('/api/game/steps')

  service.hooks(hooks)
}
