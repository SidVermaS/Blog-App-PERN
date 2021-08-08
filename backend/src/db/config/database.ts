import { Sequelize } from "sequelize";
import config from './config.json'
import { DialectT } from "../../utils/types";
const { username, password, database, host, port, dialect }=config.development

const sequelize=new Sequelize(database, username, password, {
    host,
    port,
    dialect: dialect as DialectT,
    pool: {
        min: 0,
        max: 50,
        idle: 9999
    }
})

export default sequelize