import { BaseComponent } from 'src/app/lib/base.component';
import { Component, OnInit, Injector, ViewChild  } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { BehaviorSubject, Observable} from 'rxjs';
import { FormBuilder, Validators} from '@angular/forms';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/takeUntil';
import { DatePipe } from '@angular/common';
declare var $:any;

@Component({
  selector: 'app-quanlybaiviet',
  templateUrl: './quanlybaiviet.component.html',
  styleUrls: ['./quanlybaiviet.component.css']
})
export class QuanlybaivietComponent extends BaseComponent implements OnInit {
  public baiviets: any;
  public baiviet: any;
  public totalRecords:any;
  public pageSize = 3;
  public page = 1;
  public uploadedFiles: any[] = [];
  public formsearch: any;
  public formBaiViet: any;
  public doneSetupFormBaiViet: any;  
  public showUpdateModalBaiViet:any;
  public user: any
  submitted = false;
  @ViewChild(FileUpload, { static: false }) file_image: FileUpload;
  constructor(private fb: FormBuilder, injector: Injector,private datePipe: DatePipe) {
    super(injector);
  }
  ngOnInit(): void {
    let tmp=new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user')));
    this.user=tmp.value;
    this.formsearch = this.fb.group({
      'tieude': [''] 
    });
   this.search();
 
  }

  loadPage(page) { 
    this._api.post('api/baiviet/search',{page: page, pageSize: this.pageSize,taikhoan: this.user.maTK}).takeUntil(this.unsubscribe).subscribe(res => {
      this.baiviets = res.data;
      this.totalRecords =  res.totalItems;
      this.pageSize = res.pageSize;
      });
  } 

  search() { 
    this.page = 1;
    this.pageSize = 5;
    this._api.post('api/baiviet/search',{page: this.page, pageSize: this.pageSize, tieude: this.formsearch.get('tieude').value, taikhoan: this.user.maTK}).takeUntil(this.unsubscribe).subscribe(res => {
      this.baiviets = res.data;
      console.log(this.baiviets);
      this.totalRecords =  res.totalItems;
      this.pageSize = res.pageSize;
      });
  }

  

  get f() { return this.formBaiViet.controls; }

  onSubmit(value) {
    this.submitted = true;
      console.log(value);
      var date = new Date();
      let ngay =this.datePipe.transform(date,"yyyy-MM-dd");
        let tmp = {
          TieuDe:value.tieude,
          HinhAnh:value.hinhanh,
          ThoiGian:ngay,
          TrangThai:value.trangthai,
          NoiDung:value.noidung,
          MaTK: this.user.maTK        
          };
        this._api.post('api/baiviet/create-baiviet',tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Thêm thành công');
          this.search();
          this.closeModal();
          });
   
  } 

  onDelete(row) { 
    console.log(row.maBaiViet);
    this._api.post('api/baiviet/delete-baiviet',{maBaiViet:row.maBaiViet}).takeUntil(this.unsubscribe).subscribe(res => {
      alert('Xóa thành công');
      this.search(); 
      });
  }

  Reset() {  
    this.baiviet = null;
    this.formBaiViet = this.fb.group({
        'tieude': ['', Validators.required],
        'hinhanh': ['',Validators.required],
        'thoigian': ['', Validators.required],
        'trangthai': ['', Validators.required],
        'noidung': ['', Validators.required],
    }); 
  }

  createModal() {
    this.doneSetupFormBaiViet = false;
    this.showUpdateModalBaiViet = true;
    this.baiviet = null;
    setTimeout(() => {
      $("#createBaiVietModal").modal("show");
      this.formBaiViet = this.fb.group({
        'tieude': ['', Validators.required],
        'hinhanh': ['',Validators.required],
        'trangthai': ['', Validators.required],
        'noidung': ['', Validators.required],
      });
      this.doneSetupFormBaiViet = true;
    });
  }

  public openUpdateModal(row) {
    this.doneSetupFormBaiViet = false;
    this.showUpdateModalBaiViet = true; 
    setTimeout(() => {
      $('#createBaiVietModal').modal('toggle');
      this._api.get('/api/baiviet/get-by-id/'+ row.maBaiViet).takeUntil(this.unsubscribe).subscribe((res:any) => {
        this.baiviet = res; 
        this.formBaiViet = this.fb.group({
          'tieude': [this.baiviet.tieuDe, Validators.required],
          'hinhanh': [this.baiviet.hinhAnh,Validators.required],
          'trangthai': [this.baiviet.trangThai, Validators.required],
          'noidung': [this.baiviet.noiDung, Validators.required],
        });  
          this.doneSetupFormBaiViet = true;
        }); 
    }, 700);
  }

  closeModal() {
    $('#createBaiVietModal').closest('.modal').modal('hide');
  }
  catText(text: string, limit: number): string {
    if(text.length > limit) {
      return text.substr(0, limit) + "...";
    }
    return text;
  }
}