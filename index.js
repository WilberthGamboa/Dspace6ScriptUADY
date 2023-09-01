// Analizando 
import { categoryModel } from './src/models/category.model.js';
import axios from 'axios';
import exceljs from 'exceljs';
import { excelCategory } from './src/models/excelCategory.model.js';
const { Workbook } = exceljs;
excelCategory
let objetoConJSON = {
  metadata: [
      
  ]
};
//const ExcelJS = require('exceljs');
async function main() {

    const workbook = new Workbook();
    const excel = await workbook.xlsx.readFile('datosexcel.xlsx');
   const worksheet= excel.getWorksheet('TABLA')
   let count = 0;
   const startingColumnIndex = 1;
  worksheet.eachRow({ includeEmpty: true }, function(row, rowNumber) {
    if (rowNumber===4) {
      row.eachCell((cell,collnumber)=>{

       
 
          const title = worksheet.getCell(1,collnumber).value;
          for (const key in excelCategory) {
            if (excelCategory.hasOwnProperty(key)) {
              
              const excelValue = excelCategory[key].excel;
              const dspaceValue = excelCategory[key].dspace;
              if (title===excelValue) {
              
                if (cell.value==='x') {
                  const cambiox = worksheet.getCell(2,collnumber).value;
                  objetoConJSON.metadata.push({key:dspaceValue,value:cambiox})
                  
                  
                } else {
                  if (cell.value.richText) {
                 //   console.log(cell.value.richText)
              
                    const richText =cell.value.richText
                    let text = '';
                    richText.forEach(element => {
                      text = text + element.text
                    });
                    objetoConJSON.metadata.push({key:dspaceValue,value:text.toString()})
                  }else{
                    objetoConJSON.metadata.push({key:dspaceValue,value:cell.value})
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
  console.log(objetoConJSON)
}
async function login() {
  const url = 'http://148.209.67.83/rest/login';
  const data = {
    email: 'dspace',
    password: 'dspace'
  };

  try {
    const response = await axios.post(url, `email=${data.email}&password=${data.password}`);
    console.log('Respuesta del servidor:', response.data);
    console.log('Cookies:', response.headers['set-cookie']); // JSESSIONID cookie
  } catch (error) {
    console.error('Error en la solicitud:', error);
  }
  

}
login();
//main()
 