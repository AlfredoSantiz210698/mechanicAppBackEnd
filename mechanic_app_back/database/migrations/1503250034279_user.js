'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('user_type', 15).notNullable() 
      table.string('name', 100).notNullable()
      table.string('firsname', 100).notNullable()
      table.string('lastname', 100).notNullable()
      table.string('email', 100).notNullable().unique()
      table.string('password', 100).notNullable()
      table.integer('phone').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
