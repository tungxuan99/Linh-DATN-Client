import { BaseComponent } from 'src/app/lib/base.component';
import { Component, OnInit,Injector } from '@angular/core';
import { Observable} from 'rxjs';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/takeUntil';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-newfet',
  templateUrl: './newfet.component.html',
  styleUrls: ['./newfet.component.css']
})
export class NewfetComponent extends BaseComponent implements OnInit {

  public listTinTuc: any;
  public listBaiViet: any;

  constructor(injector: Injector) { 
    super(injector);
  }

  ngOnInit(): void {
    this._api.get('api/tintuc/get-all').takeUntil(this.unsubscribe).subscribe(res => {
      this.listTinTuc = res;
      this.listTinTuc.length=4;
      });
    this._api.get('api/baiviet/get-all').takeUntil(this.unsubscribe).subscribe(res => {
      this.listBaiViet = res;
      this.listBaiViet.length=4;
      });
  }

}
