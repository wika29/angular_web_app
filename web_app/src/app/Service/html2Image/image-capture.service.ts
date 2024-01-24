import { ElementRef, Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import { DataService } from '../data-sharing/data-service.service';


@Injectable({
  providedIn: 'root',
})
export class ImageCaptureService {

  constructor(private dataService: DataService){}

  public capture(elementRef: ElementRef): Promise<string> {
    let element = elementRef.nativeElement;
    this.dataService.setBigCardVisibility(true)
    return html2canvas(element, {
      scale: 0.52, 
    }).then(canvas => {
      const dataURL = canvas.toDataURL('image/png'); 
      return dataURL;
    }).catch(e => {
      console.log(e);
      return ""
    });
  }
}
