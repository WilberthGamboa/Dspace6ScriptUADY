import colors from 'colors'; // Import colors package
import axios from 'axios';
import exceljs from 'exceljs';
import { excelCategory } from '../models/excelCategory.model.js';
import { LoginController } from '../controllers/login.controller.js';
import { collectionId } from '../models/collection.model.js';

const { Workbook } = exceljs;
export class ImportService {
  constructor() {
    this.filePath = 'datosexcel.xlsx';
    this.tableName = 'TABLA';
  }
//
  async uploadItems(metadata, idCollection, sessionid) {
    const x = sessionid[0]
    const headers = {
      'Content-Type': 'application/json',
      'Cookie': x
    };
    // console.log(x)
    const response = await axios.post(`http://148.209.67.83:8080/rest/collections/${idCollection}/items`, metadata, { headers });
      console.log(response)

  }

  excelToDspace = async () => {
    
    // Se instancia el excel, se obtiene de que archivo y tabla se sacará la información
    const workbook = new Workbook();
    const excel = await workbook.xlsx.readFile('datosexcel.xlsx');
    const worksheet = excel.getWorksheet('TABLA')
    //Se llama al funcion para el idsession
    const loginController = new LoginController();
    const sesionCookie = await loginController.loginController();

    // Obtener los nombre
    let idCollection
    let estadoExcel;
    let coleccionExcel;
    const colback = this.uploadItems;
    //Se hace un bucle que recorra todas las lineas de nuestro documento (por filas)
    worksheet.eachRow({ includeEmpty: false }, function (row, rowNumber) {
      

      // el rowNumber es tal cual el número de fila en el excel
      if (rowNumber > 2) {
        // Objeto el cual se crea para mandar al servidor
        let objetoConJSON = {
          metadata: [

          ]
        };


        /*
          El row nos devuelvo un arreglo las celdas, por lo que
          utilizamos el siguiente bucle para recorrer dicho arreglo
        */
        row.eachCell((cell, collnumber) => {

          const titleWorksheet = worksheet.getCell(1, collnumber).value;

          for (const key in excelCategory) {

            if (excelCategory.hasOwnProperty(key)) {
              const excelValue = excelCategory[key].excel;
              const dspaceValue = excelCategory[key].dspace;

              if (titleWorksheet === excelValue) {

                if (cell.value === 'x') {
                  const cambiox = worksheet.getCell(2, collnumber).value;
                  objetoConJSON.metadata.push({ key: dspaceValue, value: cambiox })
                  // Guardamos la categoria
                  if (worksheet.getCell(1, collnumber).value === 'Categoria actual') {
                    coleccionExcel = worksheet.getCell(2, collnumber).value;
                  }

                } else {
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


                // console.log(`Clave: ${key}, Valor Excel: ${excelValue}, Valor DSpace: ${dspaceValue}`);
              }
            }
          }
        })
        // Aqui se debe llamar a la función encargada de subir los files las ROW a dspace

        for (const key in collectionId) {
          if (Object.hasOwnProperty.call(collectionId, key)) {
            const element = collectionId[key];
            const { nombreExcel } = element
            if (estadoExcel === nombreExcel) {
              const { categorias } = element
              categorias.forEach(element => {
                if (element.itemExcelName === coleccionExcel) {
                  idCollection = element.idDspace;
                }
              });

            }

          }
        }
        colback(objetoConJSON,idCollection,sesionCookie)
      }
     
    });

    //  return objetoConJSON;
  }



}