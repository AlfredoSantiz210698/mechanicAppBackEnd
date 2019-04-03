'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Service extends Model {
    workshops() {
        return this.hasOne('App/Models/Workshop')
    }
    
    notifications() {
        return this.hasMany('App/Models/Notification')
    }
}

module.exports = Service
