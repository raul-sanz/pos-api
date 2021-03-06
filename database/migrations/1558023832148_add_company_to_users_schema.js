'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddCompanyToUsersSchema extends Schema {
  up () {
    this.table('users', (table) => {
      table.integer('company_id').unsigned().references('id').inTable('companies')
    })
  }

  down () {
    this.table('users', (table) => {
      // reverse alternations
    })
  }
}

module.exports = AddCompanyToUsersSchema
