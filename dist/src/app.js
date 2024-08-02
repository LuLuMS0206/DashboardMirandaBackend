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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const bookingControllers_1 = __importDefault(require("./controllers/bookingControllers"));
require("dotenv/config");
const roomController_1 = __importDefault(require("./controllers/roomController"));
const userContoller_1 = __importDefault(require("./controllers/userContoller"));
const contactController_1 = __importDefault(require("./controllers/contactController"));
const loginController_1 = __importDefault(require("./controllers/loginController"));
const auth_1 = require("./middleware/auth");
const mongoose_1 = __importDefault(require("mongoose"));
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect("mongodb+srv://luciamacho00:wtNqhbB03R7ZFY2w@cluster0.qavfymp.mongodb.net/mirandaMongo");
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
});
start();
process.env.TOKEN_SECRET;
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use('/', (_req, res) => {
    return res.send('Lucia');
});
exports.app.use('/auth', loginController_1.default);
exports.app.use('/bookings', auth_1.authenticateTokenMiddleware, bookingControllers_1.default);
exports.app.use('/rooms', auth_1.authenticateTokenMiddleware, roomController_1.default);
exports.app.use('/users', auth_1.authenticateTokenMiddleware, userContoller_1.default);
exports.app.use('/contacts', auth_1.authenticateTokenMiddleware, contactController_1.default);
exports.app.use((err, _req, res, _next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Unexpected error occurred' });
});
