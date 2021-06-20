import { BaseComponent } from 'src/app/lib/base.component';
import { Component, OnInit,Injector } from '@angular/core';
import { Observable} from 'rxjs';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/takeUntil';
import { DatePipe } from '@angular/common';
import { FormBuilder, Validators} from '@angular/forms';
import {FormControl, FormGroup} from '@angular/forms'; 
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-newfet',
  templateUrl: './newfet.component.html',
  styleUrls: ['./newfet.component.css']
})
export class NewfetComponent extends BaseComponent implements OnInit {

  public listTinTuc: any;
  public listBaiViet: any;
  public formdata:any;

  constructor(injector: Injector, 
              private fb: FormBuilder, 
              private _router: Router) { 
    super(injector);
  }

  ngOnInit(): void {
    this.formdata = this.fb.group({
      'search': ['']     
    });
    this._api.get('api/tintuc/get-all').takeUntil(this.unsubscribe).subscribe(res => {
      this.listTinTuc = res;
      this.listTinTuc.length=4;
      });
    this._api.get('api/baiviet/get-all').takeUntil(this.unsubscribe).subscribe(res => {
      this.listBaiViet = res;
      this.listBaiViet.length=4;
      });
  }
  onSubmit(value) {
    this._router.navigate(['/tintuc'], {
      relativeTo: this._route,
      queryParams: {
        search: value.search
      },
      queryParamsHandling: 'merge',
    });
  }

}
