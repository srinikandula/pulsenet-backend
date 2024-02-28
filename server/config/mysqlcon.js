import Sequelize from "sequelize";


const sequelize = new Sequelize(process.env.DB_NAME, process.env.USERNAME, process.env.PASSWORD, {
    host: process.env.HOST_NAME,
    dialect:'mysql'
});

// const sequelize = new Sequelize('logipulse', 'root', 'tiger', {
//     host: 'localhost',
//     dialect:'mysql'
// });
// const sequelize = new Sequelize(`mysql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`)

sequelize
.authenticate()
.then(() => {
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