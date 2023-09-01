import { LoginService } from "../service/login.service";

export class LoginController {
    constructor(){
        this.loginService = new LoginService();
    }

    loginController(){
        this.loginService.loginDspace();
    }


}