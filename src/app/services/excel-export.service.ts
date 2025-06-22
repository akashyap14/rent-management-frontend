import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
@Injectable({
  providedIn: 'root'
})
export class ExcelExportService {

  constructor() { }

  exportAsExcel(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = {
      Sheets: { 'data' : worksheet},
      SheetNames: ['data']
    }
    const excelBuffer : any = XLSX.write( workbook, 
      {bookType: 'xlsx', type: 'array'}
    );
    const data: Blob = new Blob([excelBuffer], {type: 'application/octet-stream'});
    FileSaver.saveAs(data, excelFileName + '.xlsx');
  }
}
