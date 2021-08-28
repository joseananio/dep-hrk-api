"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("@7speck/logger");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const socket_1 = require("./socket");
const https = require('https');
const http = require('http');
const fs = require('fs');
require('dotenv').config();
// const key = fs.readFileSync(String(__dirname + '/keys/selfsigned.key'));
// const cert = fs.readFileSync(String(__dirname + '//keys/selfsigned.crt'));
// const options = {
//   key: key,
//   cert: cert,
// };
const app = express_1.default();
/**
 * Middlewares
 */
app.use(morgan_1.default('tiny'));
app.use(cors_1.default());
app.get('/', (req, res) => {
    res.json({ started: true });
});
// const server_s = https.createServer(options, app);
// server_s.listen(Number(process.env.PORT_S), String(process.env.HOST), () => {
//  logger.imp(`HTTPS Server started on ${process.env.PORT_S}`);
//});
const port = process.env.PORT || 80;
const host = String(process.env.HOST) || '0.0.0.0';
const server = http.createServer({}, app);
server.listen(port, host, () => {
    logger_1.logger.info(`HTTP Server started on ${port}`);
});
try {
    //  initializeSocket(server_s);
    socket_1.initializeSocket(server);
}
catch (error) {
    console.log('soc err:', error);
}
