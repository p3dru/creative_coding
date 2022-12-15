const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');


const settings = {
  dimensions: [ 1080, 1080 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'white';
    
    const cx = width * 0.5;
    const cy = height * 0.5;
    const w = width * 0.01;
    const h = height * 0.1;

    let x,y;                                       //seno e cosseno

    const num = 12;                               //define a quantidade de figuras a serem criadas
    const radius = width * 0.3;

    for (let i = 0; i < num; i++){
      const slice = math.degToRad(360/num);            //divide um círculo com a quantidade de figuras que definimos em num
      const angle = slice * i;                     //cria a figura nos graus corretos com que foi iniciada

      x = radius * Math.sin(angle);
      y = radius * Math.cos(angle);

      context.save();                               //salva o estado do contexto
      context.translate(cx, cy);
      context.translate(x, y);                      //remapeia a posição 0,0 para o canvas
      context.rotate(-angle);                        //gira o "local de desenho"
      context.scale(random.range(1, 5), 1)//random.range(1, ));

      context.beginPath();
      context.rect(-w * 0.5, -h * 0.5, w, h);
      context.fill();
      context.restore();                            //retorna o path e salva os atributos
    }
  };
};

canvasSketch(sketch, settings);