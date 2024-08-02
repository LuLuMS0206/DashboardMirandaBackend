"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = connectDB;
exports.disconnectDB = disconnectDB;
const mongoose = require("mongoose");
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose.connect('mongodb+srv://luciamacho00:wtNqhbB03R7ZFY2w@cluster0.qavfymp.mongodb.net/mirandaMongo');
            console.log('Mongoose connected to database');
        }
        catch (err) {
            console.error('Mongoose connection error:', err);
        }
    });
}
function disconnectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose.disconnect();
            console.log('Mongoose disconnected from database');
        }
        catch (err) {
            console.error('Mongoose disconnection error:', err);
        }
    });
}
