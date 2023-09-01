// Analizando 
import exceljs from 'exceljs';
import { excelCategory } from './src/models/excelCategory.model.js';
import { LoginController } from './src/controllers/login.controller.js';
import { ImportController } from './src/controllers/import.controller.js';

async function main(cookie) {

    
}
async function login() {

const importController = new ImportController();
importController.importController();
  

}
login();
/*
const cookie = await login();
main(cookie)
*/ 