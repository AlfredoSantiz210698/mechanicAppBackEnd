'use strict'

const axios = require('axios');



class PictureController {



    async createPicture({ request, auth, response }) {
        try {
            let data = {
                workshop_service_id : request.input('id'),
                picture:  request.input('picture')
            }

            // let inf = await axios.get('http://asterank.com/api/mpc')
            // console.log(inf)
            return response.status(200).send("await axios.get('http://asterank.com/api/mpc')'")

        } catch (error) {
            console.log(error)
            return response.status(400).json({
                status: 'error'
            })
        }
    }



}

module.exports = PictureController
