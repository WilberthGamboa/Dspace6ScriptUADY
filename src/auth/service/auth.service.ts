import axios from 'axios';
import colors from 'colors';
import 'dotenv/config';
export class AuthService {
    private url: string;
    private data: { email: string; password: string; };
    constructor() {
        this.url = `${process.env.URLSERVIDOR}/rest/login`;
        this.data = {
            email: process.env.DSPACE_EMAIL||'emailpordefecto',
            password: process.env.DSPACE_PASSWORD || '12345'
        };
    }
    loginDspace = async () => {
        try {
            console.log(colors.yellow(`Inicando login en ${this.url}`))
            const response = await axios.post(this.url, `email=${this.data.email}&password=${this.data.password}`);
            //console.log('Respuesta del servidor:', response.data);
                 console.log(colors.yellow(`Cookies:  ${response.headers['set-cookie']}` )); // JSESSIONID cookie
            return response.headers['set-cookie'];
          } catch (error) {
            console.log(colors.red('No se pudo iniciar sesión en el servidor:'))
            console.log(colors.red(error.cause))
            process.exit(1)
          }
    }


}