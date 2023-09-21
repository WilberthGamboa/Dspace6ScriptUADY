import colors from 'colors'; // Import colors package
import axios from 'axios';
import exceljs from 'exceljs';
import { excelCategory } from '../models/excelCategory.model.js';
import { LoginController } from '../controllers/login.controller.js';
import { collectionId } from '../models/collection.model.js';
const { Workbook } = exceljs;
import 'dotenv/config';
export class ImportService {
  constructor() {
    this.filePath = process.env.EXCEL_NAME;
    this.tableName = process.env.EXCEL_TABLE_NAME;
    this.serverURL = process.env.URLSERVIDOR;
  }
  //
   uploadItems = async(metadata, idCollection, sessionid) => {
  // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const x = sessionid[0]
    const headers = {
      'Content-Type': 'application/json',
      'Cookie': x
    };
    
 try {
//console.log(idCollection)
  const response = await axios.post(`${this.serverURL}/rest/collections/${idCollection}/items`, metadata, { headers });
  //await delay(10000);
  //console.log(response.status)
 } catch (error) {
  //console.log(error)
 }

  }
  excelToJson = async () => {
    let cantidad = 0; 
    // Se instancia el excel, se obtiene de que archivo y tabla se sacará la información
    const workbook = new Workbook();
    const excel = await workbook.xlsx.readFile(this.filePath);
    const worksheet = excel.getWorksheet(this.tableName)
    const excelToJson = [];
  
    console.log(colors.yellow('Inicando subida información'));
  

    //Se hace un bucle que recorra todas las lineas de nuestro documento (por filas)
    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      // Obtener los nombre


      // el rowNumber es tal cual el número de fila en el excel
      if (rowNumber > 2) {
        let idCollection
        let estadoExcel;
        let coleccionExcel;
        // Objeto el cual se crea para mandar al servidor
        let objetoConJSON = {
          metadata: [

          ],
          idCollection:undefined
        };


        /*
          El row nos devuelvo un arreglo las celdas, por lo que
          utilizamos el siguiente bucle para recorrer dicho arreglo
        */
        row.eachCell((cell, collnumber) => {

          // Obtenemos el título de la celda actual 
          const titleWorksheet = worksheet.getCell(1, collnumber).value;

          // Iteramos el objeto de categorias, para obtener cada objeto del mapeo
          for (const key in excelCategory) {
            if (excelCategory.hasOwnProperty(key)) {
              const categoriaActual = excelCategory[key];
              const excelValue = categoriaActual.excel;
              const dspaceValue = categoriaActual.dspace;
              let excelValuesToDspace;
              // Vemos si el titulo de la celda coincide con el mapeo
              if (titleWorksheet === excelValue) {
                /*
                Dado que en los valores de las celdas del excel en vez de venir el valor de que deseamos
                este viene marcado por una X por lo que requerimos obtener el valor de los títulos
                */
                if (cell.value === 'x') {
                  const clasificacion = worksheet.getCell(2, collnumber).value;
                  objetoConJSON.metadata.push({ key: dspaceValue, value: clasificacion })
                } else {
                  /*En este caso solamente se agrega el valor al objeto, verificando casos especiales
                  para texto el cual tiene un formato especial 
                  */
                  if (cell.value.richText) {
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
                //Obtenemos el estado de la categoria 
                if (worksheet.getCell(1, collnumber).value === 'Entidad') {
                  estadoExcel = cell.value;
                }

              }
            }
          }
          // Guardamos la categoria correspondiente a esta fila
          if (worksheet.getCell(1, collnumber).value === 'Categoria actual') {
            coleccionExcel = worksheet.getCell(2, collnumber).value;

          }
        })

        for (const key in collectionId) {
          if (Object.hasOwnProperty.call(collectionId, key)) {
            const element = collectionId[key];
            const { nombreExcel } = element
            //console.log(estadoExcel);
            // console.log(nombreExcel+ '---'+ estadoExcel)
            //  console.log(estadoExcel === nombreExcel)
            if (estadoExcel === nombreExcel) {
              const { categorias } = element;
              for (const element of categorias) {
                if (element.itemExcelName === coleccionExcel) {
                  //console.log(idCollection)
                  idCollection = element.idDspace;
                }
                
              }
             

            }

          }
          if (idCollection!=undefined) {
            objetoConJSON.idCollection=idCollection;
            excelToJson.push(objetoConJSON);
            idCollection=undefined;
          }
        }


    

      }

    });
  
   // console.log(excelToJson.length)
    return excelToJson;
  }

  
  
  importExcel = async (sesionCookie) => {

    const excelToJson = await this.excelToJson(); 
    for (const iterator of excelToJson) {
        const {idCollection,...metadata} = iterator;
     await this.uploadItems(metadata,idCollection,sesionCookie)
    }
   
  }

}