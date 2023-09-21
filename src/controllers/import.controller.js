import { ImportService } from "../service/import.service.js";

export class ImportController{
    constructor(){
        this.importService = new ImportService();
    }

     async importController(sessionCookie){
    
        await this.importService.importExcel(sessionCookie);
    }

}