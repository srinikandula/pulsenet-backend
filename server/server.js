import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import loginRoutes from "./routes/loginRoutes.js"
import rolesRoutes from "./routes/rolesRoutes.js"
import dataEntryRoutes from "./routes/dataEntryRoutes.js"
import setTargetRoutes from "./routes/setTargetRoutes.js"
import getKPIDetailsReportRoutes from "./routes/getKPIDetailsReportRoutes.js"
import masterRoutes from "./routes/masterRoutes.js";
import { restrictToLoggedInUser } from "./middleware/restrictToLoggedIn.js";
import cors from "cors";
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
app.use(cookieParser());

let corsAllow = {
    credentials: true,
    methods: "PUT, GET, POST, PATCH, DELETE, HEAD"
}

app.use(cors(corsAllow));

const port = process.env.APP_PORT;

app.listen(port, () => console.log(`app listing on port ${port} !!`));
app.use(express.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use('/api/login', loginRoutes)
app.use('/api/list',restrictToLoggedInUser, rolesRoutes)
app.use('/api/data',restrictToLoggedInUser, dataEntryRoutes)
app.use('/api/settarget',restrictToLoggedInUser, setTargetRoutes);
app.use('/api/getkpidetailsreports',restrictToLoggedInUser, getKPIDetailsReportRoutes);
app.use('/api/masters',restrictToLoggedInUser, masterRoutes);

app.get('/check', (req, res) => {
    res.send("working!")
})

app.get('/', (req, res) => {
    res.send("logipulse backend!")
})
