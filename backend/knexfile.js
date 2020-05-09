// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      database: 'graphqlchat',
      user: 'root',
      password: 'majuge123'
    },
    migrations: {
      directory: './src/database/migrations'
    }
  },

  test: {
    client: 'mysql2',
    connection: {
      database: 'graphqlchat_test',
      user: 'root',
      password: 'majuge123'
    },
    migrations: {
      directory: './src/database/migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

}
