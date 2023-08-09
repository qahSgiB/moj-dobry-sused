import path from 'path';
import fs from 'fs/promises';
import { configDotenv } from 'dotenv';
import express, { Request, Response, NextFunction } from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors'

import { handleBeErrorRespone, handleFeErrorResponse } from './utils/handleResponse';
import { Session } from './types';
import { offerRouter, userRouter } from './routes';



declare module 'express-serve-static-core' {
  export interface Request {
    session?: Session,
  }
}



// creates the static folder
const staticFolder = path.join(__dirname, '../static');

fs.mkdir(staticFolder, { recursive: true });
fs.mkdir(path.join(staticFolder, 'offer'), { recursive: true });
fs.mkdir(path.join(staticFolder, 'user'), { recursive: true });

// reads environment variables from .env file into process.env
configDotenv();


const app = express();

// allow requests from frontend
app.use(cors({
  origin: [process.env.FE_URL ?? 'http://localhost:5173'],
  methods: ['GET', 'POST'],
  credentials: true,
}));
// parse cookie header -> expose the cookie data as the property req.cookies
app.use(cookieParser());
// if request.content = json -> parse it as json
app.use(express.json());

// delegates incoming requests to specific routers
app.use('/static', express.static(staticFolder));
app.use('/user', userRouter);
app.use('/offer', offerRouter);

// if no route is matched respond with 404 error
app.use((req, res) => {
  handleFeErrorResponse(res, {
    message: 'Route not found',
    code: '404',
  }, 404);
});

// handle errors thrown during request handling
app.use((error: unknown, req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof SyntaxError && 'type' in error && error.type === 'entity.parse.failed') {
    handleFeErrorResponse(res, {
      message: 'Invalid JSON',
      code: 'invalid-json',
    });

    return;
  }

  console.log('[moj-dobry-sused be] ----- error during handling request');
  console.log(`[moj-dobry-sused be] ${req.method} ${req.originalUrl}`);
  console.log(error); // [todo] error logging
  handleBeErrorRespone(res, 500);
});


// set the server port number from environment variable (default = 3000)
let bePort: number | undefined = undefined;
if (process.env.BE_PORT !== undefined) {
  const envPortMaybe = parseInt(process.env.BE_PORT);
  if (!isNaN(envPortMaybe)) {
    bePort = envPortMaybe;
  }
}
const serverPort = bePort === undefined ? 3000 : bePort;

// set the server name from environment variable (default = localhost)
const serverHostname = process.env.BE_HOSTNAME ?? 'localhost';

app.listen(serverPort, serverHostname, () => {
  console.log(`[moj-dobry-sused be] listening on 'http://${serverHostname}:${serverPort}'`);
})
