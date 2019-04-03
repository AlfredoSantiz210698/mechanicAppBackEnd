'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Notification extends Model {
    workshops() {
        return this.hasOne('App/Models/Workshop')
    }

    users() {
        return this.hasOne('App/Models/User')
    }

    services() {
        return this.hasMany('App/Models/Service')
    }


}

module.exports = Notification
