'use strict'
const Geolocation = use('App/Models/Geolocation')


class GeolocationController {
    async setPosition({ request, auth, response }) {
        try {
            let data = {
                latitude: request.input('latitude'),
                longitude: request.input('longitude'),
                topic_code: request.input('topic_code')
            }

            let requestIsOk = this.requestIsOk(data)
            if (!requestIsOk.status) {
                return response.status(400).json({
                    status: 'error',
                    msg: 'Uno o más campos son requeridos',
                    data: requestIsOk.data
                })
            }


            const workshop = await Workshop.query()
                .where('topic_code', request.input('topic_code') )
                .fetch()
            const geolocation = await Geolocation.find(workshop.toJSON()[0].id)

            geolocation.latitude = request.input('latitude')
            geolocation.longitude = request.input('longitude')
            await geolocation.save()

            return response.status(201).json({
                status: 'success',
                data: notification || [],
                geolocation: geolocation
            })

        } catch (error) {
            console.log(error)
            return response.status(400).json({
                status: 'error',
                msg: 'Error al aceptar la solicitud'
            })
        }
    }





    async getPosition({ request, response }) {
        try {
            let topic_code = request.input('topic_code')
            if (!topic_code) {
                return response.status(400).json({
                    status: 'error',
                    msg: 'Se esperaba el canal para obtener las coordenadas',
                    topic_code: '¡REQUERIDO!'
                })
            }


            const geolocation = await Geolocation.query()
                .where('topic_code', request.input('topic_code') )
                .fetch()

            return response.status(201).json({
                status: 'success',
                data: geolocation || []
            })

        } catch (error) {
            console.log(error)
            return response.status(400).json({
                status: 'error',
                msg: 'Error al aceptar la solicitud'
            })
        }
    }




    requestIsOk(data) {
        let requestIsOk = true

        for (var k in data) {
            if (data[k] === undefined) {
                requestIsOk = false
                data[k] = "¡REQUERIDO!"
            }
        }
        return {
            status: requestIsOk,
            data: data
        }
    }






}

module.exports = GeolocationController
