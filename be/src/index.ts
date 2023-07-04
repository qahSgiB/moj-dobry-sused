import express from 'express'
import path from 'path';
import fs from 'fs/promises';
import { configDotenv } from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors'


import { offerRouter, userRouter } from './routes';


// creates the static folder
const staticFolder = path.join(__dirname, '/../static');
fs.mkdir(staticFolder, { recursive: true });
fs.mkdir(path.join(staticFolder, 'offer'), { recursive: true });
fs.mkdir(path.join(staticFolder, 'user'), { recursive: true });

// reads environment variables from .env file into process.env
configDotenv();


const app = express()
// parse only json requests ???
app.use(express.json());
// parse cookie header and populate req.cookies with an object keyed by the cookie names
app.use(cookieParser());
// allow requests from frontend
app.use(cors({
  origin: [process.env.FE_URL ?? 'http://localhost:5173'],
  methods: ['GET', 'POST'],
  credentials: true,
}));

// delegates incoming requests to specific routers
app.use('/static', express.static(staticFolder));
app.use('/user', userRouter);
app.use('/offer', offerRouter);


// set the server port number from environment variable (3000 default)
let bePort: number | undefined = undefined;
if (process.env.BE_PORT !== undefined) {
  const envPortMaybe = parseInt(process.env.BE_PORT);
  if (!isNaN(envPortMaybe)) {
    bePort = envPortMaybe;
  }
}
const serverPort = bePort === undefined ? 3000 : bePort;

// set the server name from environment variable (localhost default)
const serverName = process.env.BE_HOSTNAME ?? 'localhost';

app.listen(serverPort, serverName, () => {
  console.log(`[moj-dobry-sused server] listening on 'http://${serverName}:${serverPort}'`);
})
