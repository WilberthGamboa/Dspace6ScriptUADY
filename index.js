// Analizando 
import { categoryModel } from './src/models/category.model.js';

import * as ExcelJS from "exceljs";

//const ExcelJS = require('exceljs');
async function main() {

    const workbook = new ExcelJS.default.Workbook();
    const excel = await workbook.xlsx.readFile('datosexcel.xlsx');
   const worksheet= excel.getWorksheet('TABLA')
   let count = 0;
   const startingColumnIndex = 3;
  worksheet.eachRow({ includeEmpty: false }, function(row, rowNumber) {
    if (rowNumber===3) {
        console.log(rowNumber)
        const x = Array.from(row.values);
      
    
        const nueva = x.map((element,index) => {
            if (element==='x') {
              const celdaData= worksheet.getCell(2,index).value;
              return celdaData;
                
            }
        });
     console.log(nueva)
   
    }
   
    /*
    for (let columnIndex = startingColumnIndex; columnIndex <= row.cellCount; columnIndex++) {
        const cell = row.getCell(columnIndex);
        const cellValue = cell.value;
        console.table(`Fila ${rowNumber}, Columna ${columnIndex}: ${cellValue}`);
      }*/
  });
}
+
main()
 