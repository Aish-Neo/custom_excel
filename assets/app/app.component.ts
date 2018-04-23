import { Component } from '@angular/core';
import * as Handsontable from 'handsontable';
import { getAdvancedData } from './data/data';
import {ExcelService} from "./_services/excelService";
import {Http} from "@angular/http";
import {HttpClient} from "@angular/common/http";
@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    private data: any;
    private colHeaders: string[];
    private columns: any[];
    private options: any;
    apiRoot: string = "http://localhost:8080";
    sIndex: number = 0;
    sheetNum : number = 0;
    constructor(public excelService: ExcelService, private http: HttpClient){
        this.getDataFromExcelSheet();
        this.colHeaders = ['Country', 'Level', 'Units', 'As Of', '1Y Chg', '5Y Ago', '10Y Ago', '25Y Ago'];
        this.columns = [
            {data: 0, type: 'text'},
            {data: 1, type: 'numeric', numericFormat: { pattern: '0,0.00[0000]' }},
            {data: 2, type: 'text'},
            {data: 3, type: 'numeric', numericFormat: { pattern: '0' }},
            {data: 4, type: 'numeric', numericFormat: { pattern: '0.00%' }, renderer:
                function percentRenderer(instance, td, row, col, prop, value, cellProperties) {
                    Handsontable.renderers.NumericRenderer.apply(this, arguments);
                    td.style.color = (value < 0) ? 'red' : 'green';
                }
            },
            {data: 5, type: 'numeric', numericFormat: { pattern: '0,0.00[0000]' }},
            {data: 6, type: 'numeric', numericFormat: { pattern: '0,0.00[0000]' }}
        ];
        this.options = {
            height: 396,
            rowHeaders: true,
            stretchH: 'all',
            columnSorting: true,
            contextMenu: true,
            className: 'htCenter htMiddle',
            readOnly: true
        };
    }
    afterChangeData(e) {
        //console.log(e);
    }
    getDataFromExcelSheet() {
        let url = `${this.apiRoot}/api/upload`;
        this.http.get(url).subscribe((res: any) => {
            this.data = res;
        });
    }
    setIndex(index: number) {
        this.sIndex = index;
    }
    addNewSheet() {
        this.data.data.push(Handsontable.helper.createEmptySpreadsheetData(10, 10));
        this.sheetNum += 1;
        this.data.sheetName.push('Sheet' + this.sheetNum);
    }
}