'use strict'

const Ws = use('Ws')

class ServicesRequestController {
  constructor({ socket, request }) {
    this.socket = socket
    this.request = request
    console.log('nuevo ', this.socket.id)


    this.socket.on('serviceRequest', data => {
      console.log('Socktet>> serviceRequest: ', data)
      this.sendRequestWorkshop(data)
    })

    this.socket.on('serviceAccepted', data => {
      console.log('Socktet>> service Accepted: ', data)
      this.sendServicesAcceptedToUser(data)
    })

    this.socket.on('serviceRejected', data => {
      console.log('Socktet>> service Rejected: ', data)
      this.sendServicesRejectedToUser(data)
    })


  }

  async sendRequestWorkshop(data) {
    let topic = 'services:' + String(data.workshop_id)
    console.log('Socktet>> nueva solicitud: ', topic)
    await Ws.getChannel('services:*')
      .topic(topic)
      .broadcast('getServiceRequest', {
        status: 'success',
        msg: 'Nueva solicitud de servicio',
        data: data
      })
  }



  async sendServicesAcceptedToUser(data) {
    let topic = 'services:' + String(data.user_id)
    console.log('Socktet>> Enviar solicitud aceptado al user: ', topic)
    await Ws.getChannel('services:*')
      .topic(topic)
      .broadcast('getServiceAccepted', {
        status: 'success',
        msg: 'Servicio aceptado',
        data: data
      })
  }




  async sendServicesRejectedToUser(data) {
    let topic = 'services:' + String(data.user_id)
    console.log('Socktet>> Enviar solicitud rechazada al user: ', topic)
    await Ws.getChannel('services:*')
      .topic(topic)
      .broadcast('getServiceRejected', {
        status: 'success',
        msg: 'Servicio rechazado',
        data: data
      })
  }

}

module.exports = ServicesRequestController
