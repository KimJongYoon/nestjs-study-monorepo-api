export default () => ({
  port: parseInt(process.env.ADMIN_PORT, 10) || 3102,
  database: {
    host: process.env.DATABASE_HOST || 'mongodb://root:1234@localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 27017,
  },
});
