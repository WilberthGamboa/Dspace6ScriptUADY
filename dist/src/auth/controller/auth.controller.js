"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../service/auth.service");
class AuthController {
    authService;
    constructor(authService = new auth_service_1.AuthService()) {
        this.authService = authService;
    }
    loginDspace = async () => {
        await this.authService.loginDspace();
    };
}
exports.AuthController = AuthController;
