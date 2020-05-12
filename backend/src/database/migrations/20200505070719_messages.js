exports.up = function(knex) {
  return knex.schema.createTable('messages', (table) => {
    table.increments()

    table.string('content').notNullable()
    table.integer('authorFK').unsigned()
    table.integer('contactFK').unsigned()

    table.foreign('authorFK').references('id').inTable('users')
    table.foreign('contactFK').references('id').inTable('users')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('messages')
}
