const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
const Teakpane = require('tweakpane');

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true,
};

/*
abaixo são os parâmetros padrão para iniciar a animação
e alteramos as propriedades dele com o painel tweakpane
criado na linha 98 e ao invés de declararmos os valores
explicitamente, passamos o valor desejado do objeto params
*/
const params = {
  cols: 10,
  rows: 10,
  scaleMin: 1,
  scaleMax: 30,
  freq: 0.001,
  amp: 0.2,
  frame: 0,
  animate: true,
  lineCap: 'butt',
};

const sketch = () => {
  return ({ context, width, height, frame }) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    const cols = params.cols;
    const rows = params.rows;
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

      //a linha abaixo é um if de uma linha (ternário) onde verifica o parametro animate, o antes do ":" executa o true e o depois do ":" o false 
      const f = params.animate ? frame : params.frame;

      //const n = random.noise2D(x + frame * 10, y, 0.001);         //cria um ruido aleatório controlado (altera os estados para ocorrer o movimento)
      const n = random.noise3D(x, y, f * 10, params.freq);
      const angle = n * Math.PI * params.amp;                            //cria o ângulo de rotação  

      //const scale = (n + 1) / 2 * 30;
      //const scale = (n * 0.5 + 0.5) * 30;

      const scale = math.mapRange(n, -1, 1, params.scaleMin, params.scaleMax);              //pega números de espessura variável

      context.save();                                     //salva o contexto
      context.translate(x, y);                            //traduz o contexto de x,y (definidos nas linhas 57 e 58)
      context.translate(margx, margy);                   //traduz o contexto de margx, margey (definidos nas linhas 47 e 48)
      context.translate(cellw * 0.5, cellh * 0.5);        //traduz o contexto das linhas 42 e 43
      context.rotate(angle);                              //rotaciona com base nos ângulos

      context.lineWidth = scale;                              //define a grossura da linha com base nos números passados em scale
      context.lineCap = params.lineCap,

      context.beginPath();                                
      context.moveTo(w * -0.5, 0);                         //move a "caneta para o meio da célula"
      context.lineTo(w * 0.5, 0);                         //desenha a linha na célula
      context.strokeStyle = 'white';
      context.stroke();

      context.restore();
    }
  };
};


//serve para alterar configurações do desenho, podemos editar e adicionar mais coisas à ele
createPane = () => {
  const pane = new Teakpane.Pane();
  let folder;

  folder = pane.addFolder({title: 'Grid'});
  folder.addInput(params, 'lineCap', {options: {butt: 'butt', round: 'round', square: 'square'}});
  folder.addInput(params, 'cols', {min: 2, max: 50, step: 1});
  folder.addInput(params, 'rows', {min: 2, max: 50, step: 1});
  folder.addInput(params, 'scaleMin', {min: 2, max: 50});
  folder.addInput(params, 'scaleMax', {min: 2, max: 50});

  folder = pane.addFolder({title: 'Noise'});
  folder.addInput(params, 'freq', {min: -0.01, max: 0.01});
  folder.addInput(params, 'amp', {min:0, max: 1});
  folder.addInput(params, 'animate');
  folder.addInput(params, 'frame', {min: 0, max: 999});
};

createPane();
canvasSketch(sketch, settings);

/*
context serve para importar o "local de desenho", a posição do "papel", 
usamos 3 context.translate,
 isso serviu para que acessássemos o canvas
depois a grid e depois a área da célula
*/
