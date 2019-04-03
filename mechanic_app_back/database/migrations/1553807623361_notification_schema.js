'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NotificationSchema extends Schema {
  up () {
    this.create('notifications', (table) => {
      table.increments()
      table.integer('workshop_id').unsigned().references('id').inTable('workshops')
      table.integer('service_id').unsigned().references('id').inTable('services')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('accepted', 1).defaultTo(-1) //-1 en espera //1 aceptado //0rechazado
      table.boolean('seen').defaultTo(false) //marqie a leido
      table.string('topic_code', 80).defaultTo('')
      table.timestamps()
    })
  }

  down () {
    this.drop('notifications')
  }
}

module.exports = NotificationSchema
