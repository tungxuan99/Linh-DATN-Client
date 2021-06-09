import { BaseComponent } from 'src/app/lib/base.component';
import { Component, OnInit,Injector } from '@angular/core';
import { Observable} from 'rxjs';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/takeUntil';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tintuc',
  templateUrl: './tintuc.component.html',
  styleUrls: ['./tintuc.component.css']
})
export class TintucComponent extends BaseComponent implements OnInit {
  public tintucs:any;
  public listTinTuc: any;
  public listBaiViet: any;
  public totalRecords: any;
  public pageSize = 4;
  public page = 1;
  constructor(injector: Injector) { 
    super(injector);
  }

  ngOnInit(): void {
    this.search();
    this._api.get('api/tintuc/get-all').takeUntil(this.unsubscribe).subscribe(res => {
      this.listTinTuc = res;
      this.listTinTuc.length=4;
      });
    this._api.get('api/baiviet/get-all').takeUntil(this.unsubscribe).subscribe(res => {
      this.listBaiViet = res;
      this.listBaiViet.length=4;
      });
  }
  loadPage(page) { 
    this._api.post('api/tintuc/search',{page: page, pageSize: this.pageSize}).takeUntil(this.unsubscribe).subscribe(res => {
      this.tintucs = res.data;
      this.totalRecords =  res.totalItems;
      this.pageSize = res.pageSize;
      });
  } 
  search() { 
    this.page = 1;
    this.pageSize = 4;
    this._api.post('api/tintuc/search',{page: this.page, pageSize: this.pageSize}).takeUntil(this.unsubscribe).subscribe(res => {
      this.tintucs = res.data;
      console.log(this.tintucs);
      this.totalRecords =  res.totalItems;
      this.pageSize = res.pageSize;
      });
  }
  catText(text: string, limit: number): string {
    if(text.length > limit) {
      return text.substr(0, limit) + "...";
    }
    return text;
  }

  converTime( time : string) {

  }
  
}
