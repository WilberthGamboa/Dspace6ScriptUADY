import { ImportService } from "../service/import.service.js";

export class ImportController{
    constructor(){
        this.importService = new ImportService();
    }

    importController(sessionCookie){
    
       this.importService.excelToDspace(sessionCookie);
    }

}