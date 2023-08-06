import express from 'express'
import path from 'path';
import fs from 'fs/promises';
import { configDotenv } from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import createHttpError from 'http-errors';


import { offerRouter, userRouter } from './routes';


// creates the static folder
const staticFolder = path.join(__dirname, '/../static');
fs.mkdir(staticFolder, { recursive: true });
fs.mkdir(path.join(staticFolder, 'offer'), { recursive: true });
fs.mkdir(path.join(staticFolder, 'user'), { recursive: true });

// reads environment variables from .env file into process.env
configDotenv();


const app = express()
// if request.content = json -> parse it as json
app.use(express.json());
// parse cookie header -> expose the cookie data as the property req.cookies
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

app.use((req, res, next) => {
  next(createHttpError(404, "Page not found"));
})

// app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
//   // Sets HTTP status code
//   res.status(error.status)

//   // Sends response
//   res.json({ message: error.message })
// })

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
const serverName = process.env.BE_HOSTNAME ?? 'localhost';

app.listen(serverPort, serverName, () => {
  console.log(`[moj-dobry-sused server] listening on 'http://${serverName}:${serverPort}'`);
})
