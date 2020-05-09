exports.up = function(knex) {
  return knex.schema.createTable('messages', (table) => {
    table.increments()

    table.string('content').notNullable()
    table.integer('userIDFK').unsigned()

    table.foreign('userIDFK').references('id').inTable('users')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('messages')
}
