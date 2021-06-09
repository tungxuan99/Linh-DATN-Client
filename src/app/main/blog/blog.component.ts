import { BaseComponent } from 'src/app/lib/base.component';
import { Component, OnInit,Injector } from '@angular/core';
import { FormGroup,FormControl,Validators,FormBuilder,} from '@angular/forms';
import { Observable} from 'rxjs';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/takeUntil';
declare var $:any;
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent extends BaseComponent implements OnInit {
  list_blog:any;
  public tintucs: any;
  public totalRecords: any;
  public pageSize = 3;
  public page = 1;
  public formdata:FormGroup;
  constructor(injector: Injector,private formBuilder: FormBuilder,) { 
    super(injector);
  }
  ngOnInit(): void {
    // Observable.combineLatest(
    //   this._api.get('api/baiviet/get-all'),
    // ).takeUntil(this.unsubscribe).subscribe(res => {
    //   this.list_blog = res[0];
    //   setTimeout(() => {
    //     this.loadScripts();
    //   });
    // }, err => { });
    this.search();
  }
  loadPage(page) { 
    this._api.post('api/baiviet/search',{page: page, pageSize: this.pageSize}).takeUntil(this.unsubscribe).subscribe(res => {
      this.list_blog = res.data;
      this.totalRecords =  res.totalItems;
      this.pageSize = res.pageSize;
      });
  } 
  search() { 
    this.page = 1;
    this.pageSize = 3;
    this._api.post('api/baiviet/search',{page: this.page, pageSize: this.pageSize}).takeUntil(this.unsubscribe).subscribe(res => {
      this.list_blog = res.data;
      console.log(this.list_blog);
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
}

