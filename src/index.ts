import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose'
import router from "./routes";
import 'dotenv/config'



require('dotenv').config()

const app = express();

app.use(cors({
    credentials: true,
}))

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

const server = http.createServer(app)

const mongo = process.env.MONGO_URL
const port = process.env.PORT;

server.listen(port, () =>{
    console.log(`server listening on http://localhost:${port}/`)
})



mongoose.Promise = Promise;
mongoose.connect(mongo)
mongoose.connection.on('error', (error: Error) => console.log(error))


app.use('/', router());