const sendResult = require('../../../hooks/sendResult')
const sendEveryone = require('../../../hooks/sendEveryone')


module.exports = {
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
    find: [sendResult],
    get: [sendResult],
    create: [sendEveryone],
    update: [sendEveryone],
    patch: [sendEveryone],
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
}
