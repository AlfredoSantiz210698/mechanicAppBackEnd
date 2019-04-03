'use strict'

const Workshop = use('App/Models/Workshop')


class WorkshopController {

    async getWorkshops({ auth, response }) {
        try {
            const workshops = await Workshop.all()

            return response.status(200).json({
                status: 'success',
                data: workshops || []
            })
        } catch (error) {
            console.log(error)
            return response.status(400).json({
                status: 'error',
                msg: 'Error al obtener los talleres'
            })
        }
    }

    async getWorkshopsServices({ request, response }) {
        try {

            let workshop_id = request.input('workshop_id')
            if (!workshop_id) {
                return response.status(400).json({
                    status: 'error',
                    msg: 'Se esperaba el ID del taller',
                    workshop_id: '¡REQUERIDO!'
                })
            }


            const workshop = await Workshop.query()
                .where('id', workshop_id)
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
                msg: 'Error al obtener los del taller'
            })
        }
    }

    async getWorkshopByMechanic({ auth, response }) {
        try {
            const workshop = await Workshop.query()
                .where('user_id', auth.current.user.id)
                .fetch()
            return response.status(200).json({
                status: 'success',
                data: workshop
            })
        } catch (error) {
            console.log(error)
            let sqlMessage = error.sqlMessage || ''
            return response.status(400).json({
                status: 'error',
                msg: sqlMessage
            })
        }
    }





    async createWorkshop({ request, auth, response }) {
        const user = auth.current.user
        let workshopData = {
            user_id: user.id,
            name: request.input('name'),
            location: request.input('location'),
            phone: request.input('phone'),
            description: request.input('description'),
            stars: '0'
        }

        try {
            let requestIsOk = this.requestIsOk(workshopData)
            if (!requestIsOk.status) {
                return response.status(400).json({
                    status: 'error',
                    msg: 'Uno o más campos son requeridos',
                    data: requestIsOk.data
                })
            }

            let workshop = await Workshop.create(workshopData)
            console.log("create workshop:", workshopData)
            return response.status(200).json({
                status: 'success',
                data: workshop
            })
        } catch (error) {
            console.log(error)
            let sqlMessage = error.sqlMessage || ''
            return response.status(400).json({
                status: 'error',
                message: 'Ha ocurrido un problema para crear el taller',
                sqlMessage: sqlMessage
            })
        }
    }


    requestIsOk(workshopData) {
        let requestIsOk = true
        for (var k in workshopData) {
            if (workshopData[k] === undefined) {
                requestIsOk = false
                workshopData[k] = "¡REQUERIDO!"
            }
        }
        return {
            status: requestIsOk,
            data: workshopData
        }
    }



}

module.exports = WorkshopController
