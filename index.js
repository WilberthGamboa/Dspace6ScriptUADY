// Analizando
import { excelCategory } from './src/models/excelCategory.model.js';
import { LoginController } from './src/controllers/login.controller.js';
import { ImportController } from './src/controllers/import.controller.js';

async function main() {
 try {
    const loginController = new LoginController();
    const sesionCookie = await loginController.loginController();
   
        const importController = new ImportController();
        importController.importController(sesionCookie);
 
    
 } catch (error) {
    
 }
    
}

main();
