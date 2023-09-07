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
 try {
  const response = await axios.post(`http://148.209.67.83:8080/rest/collections/${idCollection}/items`, metadata, { headers });
  console.log(response.status)
 } catch (error) {
  //console.log(error)
 }

  }

  excelToDspace = async () => {

    // Se instancia el excel, se obtiene de que archivo y tabla se sacará la información
    const workbook = new Workbook();
    const excel = await workbook.xlsx.readFile('datosexcel.xlsx');
    const worksheet = excel.getWorksheet('TABLA')
    //Se llama al funcion para el idsession
    const loginController = new LoginController();
    const sesionCookie = await loginController.loginController();

   
    const uploadItems = this.uploadItems;
    //Se hace un bucle que recorra todas las lineas de nuestro documento (por filas)
    worksheet.eachRow({ includeEmpty: false }, function (row, rowNumber) {
       // Obtener los nombre
    

      // el rowNumber es tal cual el número de fila en el excel
      if (rowNumber > 2) {
    let idCollection
    let estadoExcel;
    let coleccionExcel;
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
              categorias.forEach(element => {
                //console.log(element.itemExcelName+ '---'+ coleccionExcel)
                if (element.itemExcelName === coleccionExcel) {
                  //console.log(idCollection)
                  idCollection = element.idDspace;
                }
              });

            }

          }
        }
        if (idCollection) {
          uploadItems(objetoConJSON,idCollection,sesionCookie)
        }
       
      }

    });

    //  return objetoConJSON;
  }



}