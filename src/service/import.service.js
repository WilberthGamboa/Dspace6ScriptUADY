import colors from 'colors'; // Import colors package
import axios from 'axios';
import exceljs from 'exceljs';
import { excelCategory } from '../models/excelCategory.model.js';
import { LoginController } from '../controllers/login.controller.js';

const { Workbook } = exceljs;
export class ImportService {
    constructor() {
        this.filePath = 'datosexcel.xlsx';
        this.tableName = 'TABLA';
         
        

    }

    excelToDspace = async () => {
        let objetoConJSON = {
            metadata: [
                
            ]
          };
        // Se instancia el excel, se obtiene de que archivo y tabla se sacará la información
        const workbook = new Workbook();
        const excel = await workbook.xlsx.readFile('datosexcel.xlsx');
        const worksheet = excel.getWorksheet('TABLA')
        worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
            if (rowNumber === 4) {
                row.eachCell((cell, collnumber) => {
                    const title = worksheet.getCell(1, collnumber).value;
                    for (const key in excelCategory) {
                        if (excelCategory.hasOwnProperty(key)) {

                            const excelValue = excelCategory[key].excel;
                            const dspaceValue = excelCategory[key].dspace;
                            if (title === excelValue) {

                                if (cell.value === 'x') {
                                    const cambiox = worksheet.getCell(2, collnumber).value;
                                    objetoConJSON.metadata.push({ key: dspaceValue, value: cambiox })


                                } else {
                                    if (cell.value.richText) {
                                        //   console.log(cell.value.richText)

                                        const richText = cell.value.richText
                                        let text = '';
                                        richText.forEach(element => {
                                            text = text + element.text
                                        });
                                        objetoConJSON.metadata.push({ key: dspaceValue, value: text.toString() })
                                    } else {
                                        objetoConJSON.metadata.push({ key: dspaceValue, value: cell.value })
                                    }


                                }


                                // console.log(`Clave: ${key}, Valor Excel: ${excelValue}, Valor DSpace: ${dspaceValue}`);
                            }
                        }
                    }
                })
                /*
                const x = Array.from(row.values);
                x.forEach((element,index) => {
                 
                });
                /*
                for (const key in excelCategory) {
                  if (excelCategory.hasOwnProperty(key)) {
                    
                    const excelValue = excelCategory[key].excel;
                    const dspaceValue = excelCategory[key].dspace;
                   // console.log(`Clave: ${key}, Valor Excel: ${excelValue}, Valor DSpace: ${dspaceValue}`);
                  }
                }
                /*
                  console.log(rowNumber)
                  const x = Array.from(row.values);
                  const nueva = x.map((element,index) => {
                    if (element) {
                     
                      const celdaData= worksheet.getCell(1,index).value;
                      console.log(String(celdaData))
                    }
                      //if (element==='x') {
                        //const celdaData= worksheet.getCell(1,index).value;
                        //if (celdaData!=undefined) {
                         // console.log(String(celdaData))
                       // }
                       // return celdaData;
                          
                     // }
                  
                  });
                  
              */

            }

            /*
            for (let columnIndex = startingColumnIndex; columnIndex <= row.cellCount; columnIndex++) {
                const cell = row.getCell(columnIndex);
                const cellValue = cell.value;
                console.table(`Fila ${rowNumber}, Columna ${columnIndex}: ${cellValue}`);
              }*/
        });
        return objetoConJSON;
    }

    uploadItems = async () =>{
        const data = await this.excelToDspace();
        const loginController = new LoginController();
        const cookies = await loginController.loginController();
        const x = cookies[0]
        const headers = {
            'Content-Type': 'application/json',
            'Cookie': x
          };
          console.log( x)
          const response = await axios.post('http://148.209.67.83:8080/rest/collections/4761ccb0-b001-4993-8c51-f24f3f9b2c30/items', data,{headers});
          console.log(response)
          
    }

}