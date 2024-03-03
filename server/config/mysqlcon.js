import Sequelize from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize=new Sequelize(`mysql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);

// const sequelize = new Sequelize('logipulse', 'root', 'tiger', {
//     host: 'localhost',
//     dialect:'mysql'
// });
// const sequelize = new Sequelize(`mysql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`)

sequelize
.authenticate()
.then(async () => {
    console.log("connection established successfully");
})
.catch((err) => {
    console.log(err)
    console.log("Issue occured while connecting database")
})

const db = {}

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db;