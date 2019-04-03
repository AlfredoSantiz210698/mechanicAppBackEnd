'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GeolocationSchema extends Schema {
  up () {
    this.create('geolocations', (table) => {
      table.increments()
      table.integer('workshop_id').unsigned().references('id').inTable('workshops')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('latitude').notNullable()
      table.integer('longitude').notNullable()
      table.string('topic_code', 80)
      table.timestamps()
    })
  }

  down () {
    this.drop('geolocations')
  }
}

module.exports = GeolocationSchema
