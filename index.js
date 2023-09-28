// Analizando
import { LoginController } from './src/controllers/login.controller.js';
import { ImportController } from './src/controllers/import.controller.js';
import { DeleteService } from './src/service/delete.service.js';
import colors from 'colors'; // Import colors package

async function main() {


  try {
    
    const inicio = process.hrtime();

    const loginController = new LoginController();
    const sesionCookie = await loginController.loginController();

    if (process.argv[2]==='delete') {
      const deleteService = new DeleteService();
      await deleteService.deleteItem(sesionCookie);
      
    }else{
      const importController = new ImportController();
        await importController.importController(sesionCookie);
    }
    const fin = process.hrtime(inicio);
    const tiempoDeEjecucionEnNanosegundos = fin[0] * 1e9 + fin[1];
    const tiempoDeEjecucionEnSegundos = tiempoDeEjecucionEnNanosegundos / 1e9;
    console.log(colors.yellow(`El tiempo de ejecución fue de ${tiempoDeEjecucionEnSegundos} segundos.`));
  } catch (error) {
    console.log(error)
  }
}

await main();
