import { ElementRef, Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import html2canvas from 'html2canvas';


@Injectable({
  providedIn: 'root',
})
export class ImageCaptureService {
  private capturedImagesSubject = new Subject<string[]>();
  capturedImages$: Observable<string[]> = this.capturedImagesSubject.asObservable();

  public capture(elements: ElementRef[]): void {
    const capturedImages: string[] = [];
    if (elements != null && elements.length > 0) {
      const captureNextElement = (index: number) => {
        if (index < elements.length) {
          const element = elements[index];
          const elementWidth = element.nativeElement.offsetWidth;
          const elementHeight = element.nativeElement.offsetHeight;

          html2canvas(element.nativeElement, { width: elementWidth, height: elementHeight }).then((canvas) => {      
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            capturedImages.push(link.href);
            captureNextElement(index + 1);
            console.log("pushed link: ", link.href);
            //donwload
            /* link.download = 'captured_image.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link); */
          });
        } else {          
          this.capturedImagesSubject.next(capturedImages);        
        }
      };
      captureNextElement(0);
    }
  }
}
