import { logger } from '@7speck/logger';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { initializeSocket } from './socket';

const https = require('https');
const http = require('http');
const fs = require('fs');

require('dotenv').config();

const key = fs.readFileSync(String(__dirname + '/keys/selfsigned.key'));
const cert = fs.readFileSync(String(__dirname + '/keys/selfsigned.crt'));

const options = {
  key: key,
  cert: cert,
};

const app = express();
/**
 * Middlewares
 */
app.use(morgan('tiny'));
app.use(cors());

app.get('/', (req, res) => {
  res.json({ started: true });
});

const server_s = https.createServer(options, app);

server_s.listen(Number(process.env.PORT_S), String(process.env.HOST), () => {
  logger.imp(`HTTPS Server started on ${process.env.PORT_S}`);
});
const port = process.env.PORT || 80;
const host = String(process.env.HOST) || '0.0.0.0';

const server = http.createServer({}, app);
server.listen(port, host, () => {
  logger.info(`HTTP Server started on ${port}`);
});

try {
  initializeSocket(server_s);
  initializeSocket(server);
} catch (error) {
  console.log('soc err:', error);
}
