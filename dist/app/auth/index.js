var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "express-jwt", "jwt-rsa"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.authService = void 0;
    var express_jwt_1 = __importDefault(require("express-jwt"));
    var jwt_rsa_1 = __importDefault(require("jwt-rsa"));
    var authService = function (app) {
        var jwtCheck = express_jwt_1["default"]({
            secret: jwt_rsa_1["default"].expressJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: 'https://dev-manga.us.auth0.com/.well-known/jwks.json'
            }),
            audience: 'http://localhost:3001',
            issuer: 'https://dev-manga.us.auth0.com/',
            algorithms: ['RS256']
        });
        app.use(jwtCheck);
        app.get('/authorized', function (req, res) {
            res.send('Secured Resource');
        });
    };
    exports.authService = authService;
});
