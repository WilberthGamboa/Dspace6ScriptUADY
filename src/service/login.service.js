import * as colors from 'colors';
import axios from 'axios';
export class LoginService {
    constructor() {
         this.url = 'http://148.209.67.83:8080/rest/login';
         this.data = {
            email: 'dspace@localhost',
            password: 'dspace'
        };
    }


    async loginDspace(){
        try {
            console.log(colors.green(`Inicando login en ${this.url}`))
            const response = await axios.post(url, `email=${this.data.email}&password=${this.data.password}`);
            //console.log('Respuesta del servidor:', response.data);
            console.log(colors.yellow('Cookies:', response.headers['set-cookie'])); // JSESSIONID cookie
            return response.headers['set-cookie'];
          } catch (error) {
            console.error(colors.red('Error en la solicitud:', error));
          }
    }



}
