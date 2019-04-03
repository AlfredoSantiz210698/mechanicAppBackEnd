'use strict'

const User = use('App/Models/User')


class UserController {

    async signup({ request, auth, response }) {

        let userData = {
            name: request.input('name'),
            user_type: request.input('user_type'),
            firsname: request.input('firsname'),
            lastname: request.input('lastname'),
            email: request.input('email'),
            password: request.input('password'),
            phone: request.input('phone'),

        }


        try {
            let requestIsOk = this.requestIsOk(userData)
            if (!requestIsOk.status) {
                return response.status(400).json({
                    status: 'error',
                    msg: 'Uno o más campos son requeridos',
                    data: requestIsOk.data
                })
            }

            console.log("Nuevo usuario: ", userData)

            if (userData.user_type == "admin" || userData.user_type == "user") {
                const user = await User.create(userData)
                const token = await auth.generate(user)
                return response.status(201).json({
                    status: 'success',
                    token: token.token,
                    email: user.$attributes.email,
                    user_id: user.$attributes.id,
                })
            }

            return response.status(400).json({
                status: 'error',
                msg: "Se espera que el usuario (user_type) sea del tipo 'admin' o 'user'",
                data: userData
            })



        } catch (error) {
            console.log(error)
            let sqlMessage = error.sqlMessage || error || ''
            return response.status(400).json({
                status: 'error',
                message: 'Ha ocurrido un problema para crear el usuario',
                sqlMessage: sqlMessage
            })
        }
    }


    requestIsOk(userData) {
        let requestIsOk = true

        for (var k in userData) {
            if (userData[k] === undefined) {
                requestIsOk = false
                userData[k] = "¡REQUERIDO!"
            }
        }
        return {
            status: requestIsOk,
            data: userData
        }
    }





    async login({ request, auth, response }) {
        try {

            const token = await auth.attempt(
                request.input('email'),
                request.input('password')
            )

            // const user = auth.current.user

            return response.status(202).json({
                status: 'success',
                data: token
            })
        } catch (error) {
            response.status(400).json({
                status: 'error',
                essage: 'Email o password incorrecto'
            })
        }
    }


    async getProfile({ auth, response }) {
        try {
            const user = auth.current.user
            return response.status(200).json({
                status: 'success',
                message: 'Usario encontrado!',
                data: user
            })
        } catch (error) {
            console.log(error)
            return response.status(400).json({
                status: 'error',
                message: 'Hubo un problema al recuperar los datos'
            })
        }
    }



    async updateProfile({ request, auth, response }) {
        try {

            const user = auth.current.user
            console.log("update")
            user.name = request.input('name')
            user.firsname = request.input('firsname')
            user.lastname = request.input('lastname')
            user.password = request.input('password')
            user.phone = request.input('phone')
            await user.save()

            return response.json({
                status: 'success',
                message: 'Perfil actualizado',
                data: user
            })
        } catch (error) {
            console.log(error)
            return response.status(400).json({
                status: 'error',
                message: 'There was a problem updating profile, please try again later.'
            })
        }
    }
}


module.exports = UserController
