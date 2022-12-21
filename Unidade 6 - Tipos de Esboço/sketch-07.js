const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ],
};

//define as propriedades do que será impresso
let text = 'A';
let fontSize = 1200;
let fontFamily =  'Isidora Sans';

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.fillStyle =  'black';
    context.font = `${fontSize}px ${fontFamily}`;
    context.textBaseline = 'top';

    const metrics = context.measureText(text);             //mede o texto
    
    //busca os valores para que seja centralizado
    const mx = metrics.actualBoundingBoxLeft * -1;
    const my = metrics.actualBoundingBoxAscent * -1;
    const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
    const mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    //centraliza as coordenadas x, y
    const x = (width - mw) * 0.5 - mx;
    const y = (width - mh) * 0.5 - my;

    context.save();                           //salva o contexto atual
    context.translate(x, y);

    context.beginPath();
    context.rect(mx, my, mw, mh);
    context.stroke();
    context.fillText(text, 0, 0);
    context.restore();                       //restaura o contexto
  };
};

canvasSketch(sketch, settings);
