import { AuthController } from "./src/auth/controller/auth.controller";


const main = async () =>{
    const authController = new AuthController();
    await authController.loginDspace();
}

 main();