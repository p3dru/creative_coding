/*
É necessário ter instalado o node-js com npm, após
a instalação, rode:
npm install canvas-sketch-cli -g
Para criar um novo arquivo canvas, digite no terminal:
canvas-sketch sketch-01.js --new
Para visualizar, basta clicar no endereço que aparecerá
no terminal.
Para salvar, na aba onde a figura abrir dê um "CTRL + S"
Para alterar onde as imagens serão salvas, no terminar,
rode: canvas-sketch {nome do arquivo criado}.js --output={local onde deverá ser salvo}
*/

const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    context.lineWidth = width * 0.009

    const w = width * 0.10;                    //pega 10% da largura
    const h = height * 0.10;                   //pega 10% da altura
    const gap = width * 0.03;                 //difereça de espaço
    const ix = width * 0.17;                  //para pegar o x inicial  
    const iy = height * 0.17;                 //para o y inicial
    const off = width * 0.02;                 //valor de deslocamento
    let x, y;

    for(let i = 0; i < 5; i++){
        for(let j = 0; j < 5; j++){
            x = ix + (w + gap) * i;
            y = iy + (h + gap) * j;

            context.beginPath();
            context.rect(x, y, w, h);
            context.stroke();

            if(Math.random() > 0.5){
                context.beginPath();
                context.rect(x + off / 2, y + off / 2, w - off, h - off);
                context.stroke();
            }
        }
    }
  };
};

canvasSketch(sketch, settings);
