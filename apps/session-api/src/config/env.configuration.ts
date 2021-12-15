export default () => ({
  port: parseInt(process.env.SESSION_PORT, 10) || 3101,
  database: {
    host: process.env.DATABASE_HOST || 'mongodb://root:1234@localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 27017,
  },
  secret_salt: process.env.SECRET_SALT || '1234',
  jwt_secret: process.env.JWT_SECRET || '1234',
  jwt_refres_secret: process.env.JWT_REFRESH_SECRET || 'abcd1234',
  jwt_refresh_expires: process.env.JWT_REFRESH_EXPIRES || '30d',
});
