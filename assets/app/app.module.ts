import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from "./app.component";
import {HotTableModule} from "@handsontable/angular";
import {ExcelService} from "./_services/excelService";
import {Http, HttpModule} from "@angular/http";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, HotTableModule.forRoot(), HttpClientModule],
    bootstrap: [AppComponent],
    providers: [ExcelService, HttpClient]
})
export class AppModule {

}