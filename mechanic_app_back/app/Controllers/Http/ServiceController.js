'use strict'

const Workshop = use('App/Models/Workshop')
const Service = use('App/Models/Service')



class ServiceController {

    async getServices({ auth, response }) {
        try {
            const services = await Service.all()
            return response.status(200).json({
                status: 'success',
                data: services || []
            })
        } catch (error) {
            console.log(error)
            return response.status(400).json({
                status: 'error',
                msg: 'Error al obtener los servicios'
            })
        }
    }


    async getServicesByWorkshop({ auth, response }) {
        try {
            const workshop = await Workshop.query()
                .where('user_id', auth.current.user.id)
                .with('services')
                .fetch()
            return response.status(200).json({
                status: 'success',
                data: workshop || []
            })
        } catch (error) {
            console.log(error)
            return response.status(400).json({
                status: 'error',
                msg: 'Error al obtener los servicios'
            })
        }
    }


    async createService({ request, auth, response }) {
        const workshop = await Workshop.query()
            .where('user_id', auth.current.user.id)
            .fetch()
        let serviceData = {
            workshop_id: workshop.toJSON()[0].id,
            name: request.input('name'),
            description: request.input('description'),
            price: request.input('price'),
        }

        try {
            let requestIsOk = this.requestIsOk(serviceData)
            if (!requestIsOk.status) {
                return response.status(400).json({
                    status: 'error',
                    msg: 'Uno o más campos son requeridos',
                    data: requestIsOk.data
                })
            }

            const service = await Service.create(serviceData)

            return response.status(201).json({
                status: 'success',
                data: service || []
            })

        } catch (error) {
            console.log(error)
            return response.status(400).json({
                status: 'error',
                msg: 'Error al obtener los servicios'
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

module.exports = ServiceController
