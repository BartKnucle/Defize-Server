import {
  feathersClient,
  makeServicePlugin,
  BaseModel
} from '../../plugins/feather'

const serviceName = '/api/game/steps'

// Extend the base class
class Steps extends BaseModel {
  static modelName = serviceName
}

const servicePlugin = makeServicePlugin({
  Model: Steps,
  service: feathersClient.service(serviceName),
  serviceName
})

// Optionally add service-level hooks, here:
feathersClient.service(serviceName).hooks({
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },
  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },
  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
})

export default servicePlugin
