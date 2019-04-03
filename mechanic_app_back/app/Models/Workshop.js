'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Workshop extends Model {
    users() {
        return this.belongsTo('App/Models/User')
    }


    services() {
        return this.hasMany('App/Models/Service')
    }

    notifications() {
        return this.hasMany('App/Models/Notification')
    }

    geolocations() {
        return this.hasOne('App/Models/Geolocation')
    }

}

module.exports = Workshop
