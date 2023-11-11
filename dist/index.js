"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("./src/auth/controller/auth.controller");
const main = async () => {
    const authController = new auth_controller_1.AuthController();
    await authController.loginDspace();
};
main();
