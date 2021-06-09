import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { GioithieuComponent } from './gioithieu/gioithieu.component';
import { TintucComponent } from './tintuc/tintuc.component';
import { BlogComponent } from './blog/blog.component';
import { CtblogComponent } from './ctblog/ctblog.component';
import { CttintucComponent } from './cttintuc/cttintuc.component';
import { VanBanComponent } from './vanban/vanban.component';
import { TochucComponent } from './tochuc/tochuc.component';
import { TkbComponent } from './tkb/tkb.component';
import { CtTkbComponent } from './ct-tkb/ct-tkb.component';
import { LoginComponent } from './login/login.component';
import { DangkyComponent } from './dangky/dangky.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap' ;

export const mainRoutes: Routes = [
  {
      path: '', component: MainComponent,
      children: [
        {
            path: '', component: HomeComponent
        },
        {
            path: 'gioi-thieu', component: GioithieuComponent
        },
        {
          path: 'tin-tuc', component: TintucComponent
        },
        {
          path: 'blog', component: BlogComponent
        },
        {
          path: 'ctblog/:id', component: CtblogComponent
        },
        {
          path: 'chi-tiet-tin-tuc/:id', component: CttintucComponent
        },
        {
          path: 'van-ban', component: VanBanComponent
        },
        {
          path: 'thoi-khoa-bieu', component: TkbComponent
        },
        {
          path: 'chi-tiet-thoi-khoa-bieu/:id', component: CtTkbComponent 
        },
        {
          path: 'lien-he', component: TochucComponent
        },
        {
          path: 'dang-nhap', component: LoginComponent 
        },
        {
          path: 'dang-ky', component: DangkyComponent 
        },
      ]
  }
];

@NgModule({
  declarations: [MainComponent, HomeComponent, HeaderComponent, FooterComponent, GioithieuComponent, TintucComponent, BlogComponent, CtblogComponent, CttintucComponent, VanBanComponent, TochucComponent, TkbComponent, CtTkbComponent, LoginComponent, DangkyComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule.forChild(mainRoutes)
  ]
})
export class MainModule { }
