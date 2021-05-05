// Clean all the records associated to a connection

async function clean (context) {
  //  Recmove messages associated to a connection
  await context.app.service('/api/management/messages').remove(null, {
    query: {
      socket: context.id
    }
  })

  // If we gonna remove last connection for given user, remove the movements records
  await context.app.service('/api/management/connections').get(context.id)
    .then((connection) => {
      if (connection.user != null) {
        context.app.service('/api/management/connections').find({
          query: {
            user: connection.user
          }
        })
          .then((connections) => {
            if (connections.total === 1) {
              context.app.service('/api/games/movements').remove(connection.user)
            }
          })
      }
    })

  return context
}

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [clean]
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
}