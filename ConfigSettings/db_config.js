const Sequelize=require('sequelize');
const sequelize=new Sequelize(`mysql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);

sequelize
.authenticate()
.then(()=>{
    console.log("Connection establish sucessfully.");
})
.catch(()=>{
    console.log("Issue occured while connecting Database.")
})

const db = {}

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports=db;