const ServiceClass = require('../../service.class')

exports.Connections = class Connections extends ServiceClass {
  setup (app) {
    this.app = app
    this.app.connections = []

    app.gameServer.on('connection', (socket, req) => {
      //  Create the socket
      this.app.connections.push(socket)

      this.create({
        startedAt: Date.now(),
        user: '',
        type: 'game'
      })
        .then((data) => {
          socket._id = data._id
        })

      socket.on('message', (data) => {
        //  Create the message
        const msg = JSON.parse(Buffer.from(data).toString())
        msg.direction = 'incoming'
        msg.receiveAt = new Date().getTime()
        msg.socket = socket._id
        this.app.service('/api/management/messages').create(msg)
      })

      socket.on('close', () => {
        // Delete the socket
        this.remove(socket._id)
        this.app.connections = this.app.connections.filter(s => s !== socket)
      })
    })

    //  Bind web connections events
    app.on('connection', this.onConnect.bind(this))
    app.on('disconnect', this.onDisconnect.bind(this))
  }

  // On web connection
  onConnect (connection) {
    this.app.service('/api/management/connections').create({
      _id: connection.headers['sec-websocket-key'],
      startedAt: Date.now(),
      type: 'web'
    })
  }

  //  On user diconnection
  onDisconnect (connection) {
    this.app.service('/api/management/connections').remove(connection.headers['sec-websocket-key'])
  }
}
