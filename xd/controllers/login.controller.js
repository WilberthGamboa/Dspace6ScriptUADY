import { LoginService } from "../service/login.service.js";


export class LoginController {
    constructor(){
        this.loginService = new LoginService();
    }

    async loginController(){
      return await this.loginService.loginDspace();
    }


}