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
const models_1 = __importDefault(require("./models"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get("/netflix", (_request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const netflix = yield models_1.default.find({});
    try {
        response.send(netflix);
    }
    catch (error) {
        response.status(500).send(error);
    }
}));
exports.default = app;
//# sourceMappingURL=routes.js.map