const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const cols = 10;
    const rows = 10;
    const numCells = cols * rows;                     //total de células

    const gridw = width * 0.8;                        //largura do grid de 80% do canvas
    const gridh = height * 0.8;                       //altura do grid de 80% do canvas

    //as duas linhas pegam são 80% da altura e largura do grid
    const cellw = gridw / cols;
    const cellh = gridh / rows;

    //0 0.5 é para dividir a margem em 2 (esquerda e direita, cima e baixo (centralizar))
    const margx = (width - gridw) * 0.5;
    const margy = (height - gridh) * 0.5;

    for (let i = 0; i < numCells; i++){

      //as duas linhas abaixo criam um grid sem precisar de 2 for's
      const col = i % cols;
      const row = Math.floor(i / cols);
      
      //as duas linhas abaixo definem a posição de cada célula a cada iteração
      const x = col * cellw;
      const y = row * cellh;
      //as duas linhas abaixo criam uma linha dentro da célula com a altura e a largura de 80% das células
      const w = cellw * 0.8;
      const h = cellh * 0.8;

      context.save();                                     //salva o contexto
      context.translate(x, y);                            //traduz o contexto de x,y (definidos nas linhas 34 e 35)
      context.translate(margx, margy);                   //traduz o contexto de margx, margey (definidos nas linhas 24 e 25)
      context.translate(cellw * 0.5, cellh * 0.5);        //traduz o contexto das linhas 24 e 25

      context.lineWidth = 4;                              //define a grossura da linha para 4

      context.beginPath();                                
      context.moveTo(w * -0.5, 0);                         //move a "caneta para o meio da célula"
      context.lineTo(w * 0.5, 0);                         //desenha a linha na célula
      context.stroke();

      context.restore();
    }
  };
};

canvasSketch(sketch, settings);

/*
context serve para importar o "local de desenho", a posição do "papel", usamos 3 context.translate, isso serviu para que acessássemos o canvas
depois a grid e depois a área da célula
*/
