import {Component, ViewChild} from '@angular/core';
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
    @ViewChild("hot") hot;
    data: any = [];
    private colHeaders: string[];
    // private columns: any[];
    private options: any;
    apiRoot: string = "http://localhost:8080";
    sIndex: number = 0;
    sheetNum : number = 0;
    columns: any[] = [
        {
            data: 'Application',
            readOnly: true
        },
        {
            data: 'Status',
            renderer: 'text',
            readOnly: true
        },
        {
            data: 'isActive',
            type: 'checkbox',
            checkedTemplate: 'y',
            uncheckedTemplate: 'n'
        }
    ];
    constructor(public excelService: ExcelService, private http: HttpClient){
        this.getDataFromExcelSheet();
    }
    afterChangeData(e, hot) {
        if (e.params[0] !== null) {
            // 0 - ID, 1 - Field, 2 - Old value, 3 - New Value
            this.data.data[this.sIndex][e.params[0][0][0]].Status = e.params[0][0][3];
            // console.log(e.params[0]);
            // console.log(e.params[0][0][3]);
            // console.log(this.data.data[this.sIndex][e.params[0][0][0]]);
            // console.log(hot);
            hot.hotInstance.render();
        }
    }
    getDataFromExcelSheet() {
        let url = `${this.apiRoot}/api/upload`;
        this.http.get(url).subscribe((res: any) => {
            for(var i = 0; i < res.data.length; i++){
                for(var j = 0; j < res.data[i].length; j++){
                    res.data[i][j].isActive = res.data[i][j].Status === 'y' ? 'y' : 'n';
                }
            }
            // console.log(res);
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