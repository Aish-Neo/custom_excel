import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import * as XLSXStyle from 'xlsx-style';
import {HttpClient} from "@angular/common/http";

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class ExcelService {
    apiRoot: string = "http://localhost:8080";
    constructor(private http: HttpClient) { }
    // public exportAsExcelFile(json: any[], excelFileName: string): void {
    //     // const dataSet = {};
    //     // console.log(json.sheetName);
    //     // for(var i = 0; i < json.sheetName.length;i++){
    //     //     // var data = { sheet_name_list : XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[i]]) }
    //     //     dataSet = json.sheetName[]
    //     // }
    //     const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json.data[0]);
    //     this.wrapAndCenterCell(worksheet.B2);
    //     console.log({ Sheets: { 'data': worksheet,  'data2': worksheet });
    //     const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet,  'data2': worksheet }, SheetNames: ['data','data2'] };
    //     // Use XLSXStyle instead of XLSX write function which property writes cell styles.
    //     const excelBuffer: any = XLSXStyle.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    //     this.saveAsExcelFile(excelBuffer, excelFileName);
    // }
    public exportAsExcelFile(json: any, excelFileName: string): void {
        const dataSet = {};
        var ary = [];
        // console.log(json.sheetName);
        for(var i = 0; i < json.sheetName.length;i++){
            let worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json.data[i]);
            dataSet[json.sheetName[i]]  = worksheet;
            ary.push(dataSet);
            //
            // this.wrapAndCenterCell(worksheet.B2);
            // console.log({ Sheets: ary[0], SheetNames: json.sheetName });
            // var data = { sheet_name_list : XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[i]]) }
        }
        console.log({ Sheets: ary[0], SheetNames: json.sheetName });
        const workbook: XLSX.WorkBook = { Sheets: ary[0], SheetNames: json.sheetName };
        // Use XLSXStyle instead of XLSX write function which property writes cell styles.
        const excelBuffer: any = XLSXStyle.write(workbook, { bookType: 'xlsx', type: 'buffer' });
        this.saveAsExcelFile(excelBuffer, excelFileName, workbook);

    }

    private wrapAndCenterCell(cell: XLSX.CellObject) {
        const wrapAndCenterCellStyle = { alignment: { wrapText: true, vertical: 'center', horizontal: 'center' } };
        this.setCellStyle(cell, wrapAndCenterCellStyle);
    }

    private setCellStyle(cell: XLSX.CellObject, style: {}) {
        cell.s = style;
    }

    private saveAsExcelFile(buffer: any, fileName: string, workbook): void {
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        // var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
        // FileSaver.saveAs(blob, "/public/hello world.txt");
        this.saveRecords(workbook);
       // XLSX.writeFile(workbook, 'Master.xlsx');
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    }
    onFileChange(evt: any) {
        /* wire up file reader */

        const target: DataTransfer = <DataTransfer>(evt.target);
        if (target.files.length !== 1) throw new Error('Cannot use multiple files');
        const reader = new FileReader();
        reader.onload = function (e: any) {
            //const bstr: string = e.target.result;
            console.log("reader", e);
            // const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});
            //
            // /* grab first sheet */
            // const wsname: string = wb.SheetNames[0];
            // const ws: XLSX.WorkSheet = wb.Sheets[wsname];
            //
            // /* save data */
            // reader.readAsBinaryString(target.files[0]);
            // console.log((XLSX.utils.sheet_to_json(ws, {header: 1})));
            // return (XLSX.utils.sheet_to_json(ws, {header: 1}));1
        }
        // reader.onload = (e: any) => {
        //     alert("call");
        //     /* read workbook */
        //     const bstr: string = e.target.result;
        //     console.log("reader", e);
        //     const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});
        //
        //     /* grab first sheet */
        //     const wsname: string = wb.SheetNames[0];
        //     const ws: XLSX.WorkSheet = wb.Sheets[wsname];
        //
        //     /* save data */
        //     reader.readAsBinaryString(target.files[0]);
        //     console.log((XLSX.utils.sheet_to_json(ws, {header: 1})));
        //     return (XLSX.utils.sheet_to_json(ws, {header: 1}));
        // };
    }
    saveRecords(blob) {
        let url = `${this.apiRoot}/api/upload`;
        var update = {'blob': blob};
        // const data = new FormData();
        // data.append('blob', blob);
        // console.log(update);
        this.http.post(url, update).subscribe((res: any) => {
            console.log(res);
        });
    }
}