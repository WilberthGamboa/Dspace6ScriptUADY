import { AuthService } from "../service/auth.service";

export class AuthController{
 
    constructor(
        private authService = new AuthService()
    ){
       
    }

    loginDspace = async() =>{
        await this.authService.loginDspace()
    }
}