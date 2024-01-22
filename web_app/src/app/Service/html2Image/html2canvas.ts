import {ElementRef}  from '@angular/core';
import html2canvas from 'html2canvas';

export class makeImage {

    public capture(element: ElementRef): Promise<HTMLImageElement[]> {
        return new Promise<HTMLImageElement[]>((resolve, reject) => {
            if (element != null) {
                const elementWidth = element.nativeElement.offsetWidth;
                const elementHeight = element.nativeElement.offsetHeight;
    
                html2canvas(element.nativeElement, { width: elementWidth, height: elementHeight }).then((canvas) => {
                    const imageWidth = canvas.width / 4;
                    const imageHeight = canvas.height / 4;
                    const link = document.createElement('a');
                    link.href = canvas.toDataURL('image/png');
                    const imageContainer = document.createElement('div');
                    const image = document.createElement('img');
                    image.style.width = imageWidth.toString() + 'px';
                    image.style.height = imageHeight.toString() + 'px';
                    image.src = link.href;
                    imageContainer.appendChild(image);
                    document.body.appendChild(imageContainer);
    
                    // Create an array of captured image objects
                    const capturedImages: HTMLImageElement[] = [image];
                    resolve(capturedImages);
                });
            } else {
                reject('Element is null');
            }
        });
    }    
}