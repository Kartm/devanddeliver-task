module.exports = {
  host: process.env.DATABASE_HOST || "127.0.0.1",
  user: "root",
  password: "123",
  database: "CHIRINOS",
  port: 3306,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
