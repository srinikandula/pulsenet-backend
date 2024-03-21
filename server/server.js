import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import loginRoutes from "./routes/loginRoutes.js"
import rolesRoutes from "./routes/rolesRoutes.js"
import dataEntryRoutes from "./routes/dataEntryRoutes.js"
import setTargetRoutes from "./routes/setTargetRoutes.js"
import { restrictToLoggedInUser } from "./middleware/restrictToLoggedIn.js";
import cors from "cors";
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
app.use(cookieParser());
app.use(cors());

const port = process.env.APP_PORT;

app.listen(port, () => console.log(`app listing on port ${port} !!`));
app.use(express.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use('/login', loginRoutes)
app.use('/list', restrictToLoggedInUser, rolesRoutes)
app.use('/data', restrictToLoggedInUser, dataEntryRoutes)
app.use('/settarget', restrictToLoggedInUser, setTargetRoutes);

app.get('/check', (req, res) => {
    res.send("working!")
})