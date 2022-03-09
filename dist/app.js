"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv");
var express_1 = __importDefault(require("express"));
var main = function () {
    var app = (0, express_1.default)();
    var port = parseInt(process.env.PORT, 10) || 3000;
    app.get('/', function (req, res) {
        res.send('hello world!');
    });
    app.listen(port, function () {
        console.log("Server running on port ".concat(port));
    });
};
main();
