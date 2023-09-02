import { ImportService } from "../service/import.service.js";

export class ImportController{
    constructor(){
        this.importService = new ImportService();
    }

    importController(){
       // this.importService.excelToDspace();
       this.importService.excelToDspace();
    }

}