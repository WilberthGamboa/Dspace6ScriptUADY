// Analizando
import { LoginController } from './src/controllers/login.controller.js';
import { ImportController } from './src/controllers/import.controller.js';
import { DeleteService } from './src/service/delete.service.js';
import readline from 'readline'

async function main() {


 try {
  
    const loginController = new LoginController();
    const sesionCookie = await loginController.loginController();
        
        const importController = new ImportController();
     await importController.importController(sesionCookie); 
        //
        const deleteService = new DeleteService();
      //
   //deleteService.deleteItem(sesionCookie);
       
 
 
 } catch (error) {
    
 }
    
}

main();
