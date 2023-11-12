import colors from 'colors'; // Import colors package
import axios from 'axios';
import exceljs from 'exceljs';
import path from 'node:path'
import fs from 'node:fs/promises'
const { Workbook } = exceljs;

import 'dotenv/config';
import { ExcelDspace } from '../interfaces/itemExcel.interface';
import { excelCategory } from '../model/itemExcel.model';
export class ItemService {
    filePath: string;
    tableName: string;
    serverURL: string;
  constructor() {
    this.filePath = process.env.EXCEL_NAME|| 'test';
    this.tableName = process.env.EXCEL_TABLE_NAME || 'test';
    this.serverURL = process.env.URLSERVIDOR ||'test';
  }
  //
  uploadItems = async (ejemplo, idCollection:string, sessionid:string) => {
   
    const x = sessionid[0]
    const headers = {
      'Content-Type': 'application/json',
      'Cookie': x
    };

    try {
      //console.log(idCollection)
      const { pathCarpeta, ...metadata } = ejemplo;
      //console.log(pathCarpeta)
      const response = await axios.post(`${this.serverURL}/rest/collections/${idCollection}/items`, metadata, { headers });
      //console.log(response.data.link)
      return response;
      //console.log(response.data.link)
    } catch (error) {
      console.log(error.message)

    }


  }
  excelToJson = async () => {
    let cantidad = 0;
    // Se instancia el excel, se obtiene de que archivo y tabla se sacará la información
    const workbook = new Workbook();
    const excel = await workbook.xlsx.readFile(this.filePath);
    const worksheet = excel.getWorksheet(this.tableName)
    const excelToJson: ExcelDspace[] = [];
    
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
          idCollection: undefined
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
          if (worksheet.getCell(1, collnumber).value === 'Imágenes Carpeta') {
            objetoConJSON.pathCarpeta = cell.value;
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
          if (idCollection != undefined) {
            objetoConJSON.idCollection = idCollection;
            excelToJson.push(objetoConJSON);
            idCollection = undefined;
          }
        }




      }

    });

    // console.log(excelToJson.length)
    return excelToJson;
  }



  importExcel = async (sesionCookie) => {
    const excelToJson = await this.excelToJson();
    const totalJson = excelToJson.length;

    
    let itemsSubidos = 0; // Initialize the itemsSubidos variable here

    for (const iterator of excelToJson) {
   
      const { idCollection,pathCarpeta, ...metadata } = iterator;

      try {
        // Upload items and store the response in the data variable
        const respuesta = await this.uploadItems(metadata, idCollection, sesionCookie);
        if (respuesta.status === 200) {
          if (pathCarpeta != undefined) {
           await  this.imageUpload(pathCarpeta,respuesta.data.link,sesionCookie)
          }
        }
        itemsSubidos++;
      } catch (error) {
        console.error('Error uploading items:', error);
      }
    }

    console.log(colors.yellow(`Se subieron ${itemsSubidos} de ${totalJson}`));
  }

  imageUpload = async (pathCarpeta,itemIdUrl,sessionCookie) => {

    const carpeta = path.join(process.cwd(), 'img', pathCarpeta, 'FOTOGRAFIAS');
   
    try {
      const archivos = await fs.readdir(carpeta);
     
      for (const archivo of archivos) {
        const rutaCompleta = path.join(carpeta, archivo);
        try {
          const bitstream = await fs.readFile(rutaCompleta);
        

          // Mandar solicitud
          const x = sessionCookie[0]
          const params = {
            method: 'POST',

            headers: { "Content-Type": "multipart/form-data", "accept": "application/json", 'Cookie': x },
            encoding: null,
            body: bitstream
          }

          const res = await fetch(`${this.serverURL}${itemIdUrl}/bitstreams?name=${archivo}`, params);
        } catch (error) {
          console.error(`Error al leer el archivo ${archivo}:`, error);
        }
      }
    } catch (error) {
      console.log(error);
    }

  }

}