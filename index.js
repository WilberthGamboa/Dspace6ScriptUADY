// Analizando 
const metadata = {
    CREATOR: 'dc.creator',
    
}

async function main() {
    const ExcelJS = require('exceljs');
    const workbook = new ExcelJS.Workbook();
    const excel = await workbook.xlsx.readFile('datosexcel.xlsx');
   const worksheet= excel.getWorksheet('TABLA')
   let count = 0;
   const startingColumnIndex = 3;
  worksheet.eachRow({ includeEmpty: false }, function(row, rowNumber) {
    if (rowNumber===3) {
        console.log(rowNumber)
        const x = row.values;
      console.log(  x.length)
    
        x.forEach((element,index) => {
            if (element==='x') {
              const celdaData= worksheet.getCell(2,index);
              console.log(celdaData.value)
                
            }
        });
   
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
 