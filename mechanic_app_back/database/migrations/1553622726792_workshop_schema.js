'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class WorkshopSchema extends Schema {
  up () {
    this.create('workshops', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('name', 80).notNullable().unique()
      table.string('location', 80).notNullable()
      table.text('description', 80)
      table.integer('phone').notNullable()
      table.integer('stars').defaultTo(0)
      table.timestamps()
    })
  }

  down () {
    this.drop('workshops')
  }
}

module.exports = WorkshopSchema
