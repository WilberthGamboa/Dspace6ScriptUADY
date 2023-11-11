"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const axios_1 = __importDefault(require("axios"));
const colors_1 = __importDefault(require("colors"));
require("dotenv/config");
class AuthService {
    url;
    data;
    constructor() {
        this.url = `${process.env.URLSERVIDOR}/rest/login`;
        this.data = {
            email: process.env.DSPACE_EMAIL || 'emailpordefecto',
            password: process.env.DSPACE_PASSWORD || '12345'
        };
    }
    loginDspace = async () => {
        try {
            console.log(colors_1.default.yellow(`Inicando login en ${this.url}`));
            const response = await axios_1.default.post(this.url, `email=${this.data.email}&password=${this.data.password}`);
            //console.log('Respuesta del servidor:', response.data);
            console.log(colors_1.default.yellow(`Cookies:  ${response.headers['set-cookie']}`)); // JSESSIONID cookie
            return response.headers['set-cookie'];
        }
        catch (error) {
            console.log(colors_1.default.red('No se pudo iniciar sesión en el servidor:'));
            console.log(colors_1.default.red(error.cause));
            process.exit(1);
        }
    };
}
exports.AuthService = AuthService;
