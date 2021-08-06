import sequelize from "sequelize";
const config = require('./config.json')

const { username, password, database, host, port, dialect }=config.development