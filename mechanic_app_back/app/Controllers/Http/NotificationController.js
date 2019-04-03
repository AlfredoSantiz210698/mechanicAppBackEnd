'use strict'
const Notification = use('App/Models/Notification')
const Geolocation = use('App/Models/Geolocation')
const Workshop = use('App/Models/Workshop')




class NotificationController {
    async getNotificationsAdmin({ auth, response }) {
        try {
            const workshop = await Workshop.query()
                .where('user_id', auth.current.user.id)
                .fetch()


            const notifications = await Notification.query()
                .where('notifications.workshop_id', workshop.toJSON()[0].id)
                .innerJoin('workshops', 'notifications.workshop_id', 'workshops.id')
                .innerJoin('services', 'notifications.service_id', 'services.id')
                .innerJoin('users', 'notifications.user_id', 'users.id')
                .select(
                    'notifications.id as notification_id', ' notifications.accepted', 'notifications.seen', 'notifications.topic_code',
                    'workshops.id as workshop_id', 'workshops.name as workshop_name',
                    'services.id as service_id', 'services.name as service_name',
                    'users.id as user_id', 'users.name as user_name', 'users.firsname', 'users.lastname', 'users.email',
                )
                .fetch()

            console.log('Get notification ADMIN: ', notifications.toJSON())

            return response.status(200).json({
                status: 'success',
                data: notifications || []
            })

        } catch (error) {
            console.log(error)
            return response.status(400).json({
                status: 'error',
                msg: 'Error al obtener las notificaciones'
            })
        }
    }








    async getNotificationsUser({ auth, response }) {
        try {
            const notifications = await Notification.query()
                .where('notifications.user_id', auth.current.user.id)
                .innerJoin('workshops', 'notifications.workshop_id', 'workshops.id')
                .innerJoin('services', 'notifications.service_id', 'services.id')
                .innerJoin('users', 'notifications.user_id', 'users.id')
                .select(
                    'notifications.id as notification_id', ' notifications.accepted', 'notifications.seen', 'notifications.topic_code',
                    'workshops.id as workshop_id', 'workshops.name as workshop_name',
                    'services.id as service_id', 'services.name as service_name',
                    'users.id as user_id', 'users.name as user_name', 'users.firsname', 'users.lastname', 'users.email',
                )
                .fetch()

            console.log('Get notification USER: ', notifications.toJSON())

            return response.status(200).json({
                status: 'success',
                data: notifications || []
            })

        } catch (error) {
            console.log(error)
            return response.status(400).json({
                status: 'error',
                msg: 'Error al obtener las notificaciones'
            })
        }
    }





    async requestService({ request, auth, response }) {
        let requestServiceData = {
            workshop_id: request.input('workshop_id'),
            service_id: request.input('service_id'),
            user_id: auth.current.user.id,
            accepted: -1,
            seen: false,
            topic_code: ''
        }

        try {
            let requestIsOk = this.requestIsOk(requestServiceData)
            if (!requestIsOk.status) {
                return response.status(400).json({
                    status: 'error',
                    msg: 'Uno o más campos son requeridos',
                    data: requestIsOk.data
                })
            }

            const newNotification = await Notification.create(requestServiceData)

            const notification = await Notification.query()
                .where('notifications.id', newNotification.id)
                .innerJoin('workshops', 'notifications.workshop_id', 'workshops.id')
                .innerJoin('services', 'notifications.service_id', 'services.id')
                .innerJoin('users', 'notifications.user_id', 'users.id')
                .select(
                    'notifications.id as notification_id', ' notifications.accepted', 'notifications.seen', 'notifications.topic_code',
                    'workshops.id as workshop_id', 'workshops.name as workshop_name',
                    'services.id as service_id', 'services.name as service_name',
                    'users.id as user_id', 'users.name as user_name', 'users.firsname', 'users.lastname', 'users.email',
                )
                .fetch()

            console.log('Nueva soliitud de servicio: ', notification.toJSON()[0])

            return response.status(201).json({
                status: 'success',
                data: notification || []
            })

        } catch (error) {
            console.log(error)
            return response.status(400).json({
                status: 'error',
                msg: 'Error al solicitar ell servicio'
            })
        }
    }






    async requestSeen({ request, auth, response }) {
        try {
            let notification_id = request.input('notification_id')

            if (!notification_id) {
                return response.status(400).json({
                    status: 'error',
                    msg: 'Se esperaba el ID de la notificación',
                    notification_id: '¡REQUERIDO!'
                })
            }

            const notification = await Notification.find(notification_id)
            notification.seen = true
            await notification.save()

            return response.status(201).json({
                status: 'success',
                data: notification || []
            })
        } catch (error) {
            console.log(error)
            return response.status(400).json({
                status: 'error',
                msg: 'Error al marcar como en visto la notificacion'
            })
        }
    }


    async acceptServiceRequest({ request, auth, response }) {
        try {
            let notification_id = request.input('notification_id')
            console.log('Servicio aceptado: ', notification_id)
            if (!notification_id) {
                return response.status(400).json({
                    status: 'error',
                    msg: 'Se esperaba el ID de la notificación',
                    notification_id: '¡REQUERIDO!'
                })
            }
            console.log('------------------------')
            const notification = await Notification.find(notification_id)
            notification.accepted = 1
            notification.seen = true
            notification.topic_code = String(notification.created_at).replace(/\s/g, '') + '_' +
                String(notification.user_id) + '_' +
                String(notification.workshop_id) + '_' +
                String(notification.service_id)
            console.log(notification.toJSON())
            console.log('------------------------')
            await notification.save()

            let geolocationData = {
                workshop_id: notification.workshop_id, //esto se puede borrar
                user_id: notification.user_id, //esto tambien
                latitude: '0',
                longitude: '0',
                topic_code: notification.topic_code

            }
            const geolocation = await Geolocation.create(geolocationData)


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




    async rejectedServiceRequest({ request, auth, response }) {
        try {
            let notification_id = request.input('notification_id')
            console.log('Servicio aceptado: ', notification_id)
            if (!notification_id) {
                return response.status(400).json({
                    status: 'error',
                    msg: 'Se esperaba el ID de la notificación',
                    notification_id: '¡REQUERIDO!'
                })
            }
            const notification = await Notification.find(notification_id)
            notification.accepted = 0
            notification.seen = true
            console.log('Servicio rechazado: ', notification.toJSON())
            await notification.save()

            return response.status(201).json({
                status: 'success',
                data: notification || []
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

module.exports = NotificationController
