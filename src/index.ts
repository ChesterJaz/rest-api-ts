import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose'
import crypto from 'crypto';
import router from "./routes";

const app = express();

app.use(cors({
    credentials: true,
}))

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

const mongo = "mongodb+srv://chester:chester123@cluster0.9g3fmci.mongodb.net/?retryWrites=true&w=majority"

const server = http.createServer(app)
const port = 8080;

server.listen(port, () =>{
    console.log(`server listening on http://localhost:${port}/`)
})

export const random = () => crypto.randomBytes(128).toString('base64');

mongoose.Promise = Promise;
mongoose.connect(mongo)
mongoose.connection.on('error', (error: Error) => console.log(error))


app.use('/', router());