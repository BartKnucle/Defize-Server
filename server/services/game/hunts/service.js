const createModel = require('./model')
const { Hunts } = require('./class')
const hooks = require('./hooks')

module.exports = (app) => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  }

  app.use('/api/game/hunt', new Hunts(options, app))
  const service = app.service('/api/game/hunt')

  service.hooks(hooks)
}
