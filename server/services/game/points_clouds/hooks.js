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
    create: [sendResult, sendEveryone],
    update: [sendResult, sendEveryone],
    patch: [sendResult, sendEveryone],
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
