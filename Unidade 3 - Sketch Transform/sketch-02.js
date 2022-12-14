const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'white';
    
    const x = width * 0.5;
    const y = height * 0.5;
    const w = width * 0.3;
    const h = height * 0.3;

    context.save();                               //salva o estado do contexto
    context.translate(x, y);                      //remapeia a posição 0,0 para o canvas
    context.rotate(0.3);                          //gira o "local de desenho"

    context.beginPath();
    context.rect(-w * 0.5, -h * 0.5, w, h);
    context.fill();
    context.restore();                            //retorna o path e salva os atributos


    context.translate(400, 400);
    context.beginPath();
    context.arc(0, 0, 50, 0, Math.PI * 2);
    context.fill();
  };
};

canvasSketch(sketch, settings);