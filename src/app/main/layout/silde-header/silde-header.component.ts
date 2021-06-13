import { Component, ElementRef, ViewChild} from '@angular/core';
import 'keen-slider/keen-slider.min.css';
import KeenSlider from 'keen-slider';

@Component({
  selector: 'app-silde-header',
  templateUrl: './silde-header.component.html',
  styleUrls: [
    '../../../../../node_modules/keen-slider/keen-slider.min.css',
    './silde-header.component.css']
})
export class SildeHeaderComponent{

  @ViewChild("sliderRef1") sliderRef1: ElementRef<HTMLElement>

  slider: any = null

  ngAfterViewInit() {
    this.slider = new KeenSlider(this.sliderRef1.nativeElement, {
      loop: true,
      rtl: true,
      slidesPerView: 3,
      spacing: 10,
    })
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy()
  }

}
