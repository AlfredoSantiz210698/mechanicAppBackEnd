'use strict'


class MapsController {

  constructor({ socket }) {
    this.socket = socket
    
    this.socket.on('sendPosition', data=>{
      console.log("nueva posición: ", data)
      this.sendPosition(data)
    })

  }

  async sendPosition(data){
    this.socket.broadcastToAll('getPosition', data)
    // this.socket.emit('getPosition', data)
  }
}

module.exports = MapsController
