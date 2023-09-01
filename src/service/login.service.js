import colors from 'colors'; // Import colors package
import axios from 'axios';
export class LoginService {
    constructor() {
         this.url = 'http://148.209.67.83:8080/rest/login';
         this.data = {
            email: 'dspace@localhost',
            password: 'dspace'
        };
    }


     loginDspace = async () => {
        try {
            console.log(colors.yellow(`Inicando login en ${this.url}`))
            const response = await axios.post(this.url, `email=${this.data.email}&password=${this.data.password}`);
            //console.log('Respuesta del servidor:', response.data);
            console.log(colors.yellow('Cookies:', response.headers['set-cookie'])); // JSESSIONID cookie
            return response.headers['set-cookie'];
          } catch (error) {
            console.error(colors.red('Error en la solicitud:', error));
          }
    }



}
