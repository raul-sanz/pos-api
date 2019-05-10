'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments()
      table.integer('category_id').unsigned().references('id').inTable('categories')
      table.string('name')
      table.decimal('price')
      table.integer('code')
      table.integer('stock')
      table.string('description')
      table.string('type')
      table.integer('max_stock')
      table.integer('min_stock')
      table.timestamps()
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductSchema
