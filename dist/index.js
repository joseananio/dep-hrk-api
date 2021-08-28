var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@7speck/logger", "cors", "express", "morgan", "./socket"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var logger_1 = require("@7speck/logger");
    var cors_1 = __importDefault(require("cors"));
    var express_1 = __importDefault(require("express"));
    var morgan_1 = __importDefault(require("morgan"));
    var socket_1 = require("./socket");
    var https = require('https');
    var http = require('http');
    var fs = require('fs');
    require('dotenv').config();
    // const key = fs.readFileSync(String(__dirname + '/keys/selfsigned.key'));
    // const cert = fs.readFileSync(String(__dirname + '//keys/selfsigned.crt'));
    // const options = {
    //   key: key,
    //   cert: cert,
    // };
    var app = express_1["default"]();
    /**
     * Middlewares
     */
    app.use(morgan_1["default"]('tiny'));
    app.use(cors_1["default"]());
    app.get('/', function (req, res) {
        res.json({ started: true });
    });
    // const server_s = https.createServer(options, app);
    // server_s.listen(Number(process.env.PORT_S), String(process.env.HOST), () => {
    //  logger.imp(`HTTPS Server started on ${process.env.PORT_S}`);
    //});
    var port = process.env.PORT || 80;
    var host = String(process.env.HOST) || '0.0.0.0';
    var server = http.createServer({}, app);
    server.listen(port, host, function () {
        logger_1.logger.info("HTTP Server started on " + port);
    });
    try {
        //  initializeSocket(server_s);
        socket_1.initializeSocket(server);
    }
    catch (error) {
        console.log('soc err:', error);
    }
});
