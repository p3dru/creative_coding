const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ],
};

let manager;

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


//parametro do objeto para egar o texto toda vez que a tecça pressionada for solta
const onKeyUp = (e) =>{
  text = e.key.toUpperCase();       //para pegar letras maiúsaculas
  manager.render();                 //para gerar o frame atual do código (da letra digitada)
};

//para atualizar a tela quando soltar a tecla
document.addEventListener('keyup', onKeyUp);


/*
o async explicita uma função assíncrona (uma função assíncrona realiza um carregamento fora do 
ciclo de execução normal, o síncrono). Ele faz um desvio na execução e carrega a parte,
o await informa que é necessário esperar a execução da função assíncrona, para realizar voltar
o estado síncrono novamente.
Envolvemos o canvas sketch em uma função async para podemos alterar o estado dela a cada nova 
alteração percebida pela linha 54.
*/
const start = async () => {
  manager = await canvasSketch(sketch, settings);
};

//inicia a função start na chamada da função que inicia o manager que 
//é a função CanvasSketch em si e daí ai renderiza e inicia o desenho
start();                            

/*
const url = 'https://picsum/photos/200';
const loadMeSomeImage = (url) =>{
  return new Promise((resolve, reject) => {
    const img = new Image(img);
    img.onerror = () => reject();
    img.src = url;
  });
};

const start = async () => {
  const img = await loadMeSomeImage(url);
  console.log('image width', img.width);
  console.log('this line');
};

start();
*/