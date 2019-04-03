'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Geolocation extends Model {
    workshops() {
        return this.hasOne('App/Models/Workshop')
    }
}

module.exports = Geolocation
