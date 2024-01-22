import html2canvas from 'html2canvas';



export class captureDivAsPNG {

    public capture(divId: string): HTMLDivElement | null {
        let element = document.getElementById(divId); 
        if(element != null){
            html2canvas(element).then((canvas) => {
                const imageWidth = parseFloat(canvas.style.width) / 4;
                const imageHeight = parseFloat(canvas.style.height) / 4;
                const link = document.createElement('a');
                link.href = canvas.toDataURL('image/png');    
                const imageContainer = document.createElement('div');
                const image = document.createElement('img');
                image.src = link.href;
                imageContainer.appendChild(image);
                imageContainer.style.width = imageWidth.toString();
                imageContainer.style.height = imageHeight.toString();
                return document.body.appendChild(imageContainer);  
            });
        }
        return null;
    }          
}