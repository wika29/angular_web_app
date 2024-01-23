import { ElementRef, Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import html2canvas from 'html2canvas';


@Injectable({
  providedIn: 'root',
})
export class ImageCaptureService {

  public capture(elementRef: ElementRef): Promise<string> {
    const element = elementRef.nativeElement;
    return html2canvas(element, {
      scale: 0.51, 
    }).then(canvas => {
      const dataURL = canvas.toDataURL('image/png');
      return dataURL;
    });
  }
}
