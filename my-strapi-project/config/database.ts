const parse = require('pg-connection-string').parse;

module.exports = ({ env }) => {
  if(env('DATABASE_URL')) {
    const config = parse(env('DATABASE_URL'));
    return {
      connection: {
        client: 'postgres',
        connection: {
          host: config.host,
          port: config.port,
          database: config.database,
          user: config.user,
          password: config.password,
          ssl: { rejectUnauthorized: false },
        },
        debug: false,
      },
    };
  }
  
  return {
    connection: {
      client: 'sqlite',
      connection: {
        filename: env('DATABASE_FILENAME', '.tmp/data.db'),
      },
      useNullAsDefault: true,
    },
  };
};