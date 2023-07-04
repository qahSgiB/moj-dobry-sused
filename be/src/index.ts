import express from 'express'
import path from 'path';
import fs from 'fs/promises';

import { offerRouter, userRouter } from './routes';



const staticFolder = path.join(__dirname, '/../static');
fs.mkdir(staticFolder, { recursive: true });
fs.mkdir(path.join(staticFolder, 'offers'), { recursive: true });
fs.mkdir(path.join(staticFolder, 'users'), { recursive: true });


const app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.use('/static', express.static(staticFolder));
app.use('/user', userRouter);
app.use('/offer', offerRouter);


// set the server port number from environment variable (3000 default)
let bePort: number | undefined = undefined;
if (process.env.BE_PORT === undefined) console.log("BE_port je undefined");
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
