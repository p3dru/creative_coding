const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');      //para importar o random
const math = require('canvas-sketch-util/math');          //para importarmos outras funções matemáticas


class Vector{                                              //define a classe para criar novos pontos  
  constructor(x, y){                                      //criam um construtor com os valores das coordenadas dos pontos (x e y são os parâmetros passados)
    this.x = x;                                           //this serve para se referir ao escopo atual da classe          
    this.y = y;                                           //this serve para se referir ao escopo atual da classe
  }

  getDistance(v){                                         //sendo v um novo vetor (para calcular a distância)    
    //as duas linhas abaixo buscam a distância do eixo x e do eixo y entre os dois vetores
    const dx = this.x - v.x;
    const dy = this.y - v.y;

    return Math.sqrt((dx * dx) + (dy * dy));              //teorema de pitágoras para saber a distância real    
  }
}

class Agent{                                              //cria uma classe agente com os valores passados em new Vector(x, y); 
  constructor(x, y){
    this.pos = new Vector(x, y);
    this.vel = new Vector(random.range(-1, 3), random.range(-2, 3));    //dá uma velocidade aleatória a cada bolinha
    this.radius = random.range(4, 12);                    //cria tamanhos de circulos com 4 e 12 de raio                                 //define o raio do círculo
  }

  bounce(width, height){                                  //cria barreiras para os circulos colidirem
    //as linhas abaixo invertem a velocidade para onde os circulos se movem      
    if (this.pos.x <= 0 || this.pos.x >= width) this.vel.x *= -1;     
    if (this.pos.y <= 0 || this.pos.y >= height) this.vel.y *= -1;
  }

  update(){
    //adiciona velocidade à posição somando a posição atual com a velocidade passada
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  draw(context){
    context.save();                                       //salva o context atual
    context.translate(this.pos.x, this.pos.y);            //altera o contexto anterior para o inserido 
    context.lineWidth = 4;                                //aumenta a largura da borda do circulo
    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);       //define os valores para se criar o círculo sendo this.pos.x e this.pos.y para se referir aos valores de x e y, chamados pelo new Vector adicionados no contexto de this.pos
    //as duas linhas abaixo criam a borda do circulo
    context.fillStyle = 'black'; 
    context.fill();                                       //preenche o desenho
    context.strokeStyle = 'white'; 
    context.stroke();

    context.restore();                                    //retorna ao contexto anterior
  }
}


const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true,                                         //permite que o código seja animado
};

/*
A linha 28 faz a mesma coisa que as linhas da função a seguir:
const = animate = () => {
  requestAnimatorFrame(animate);
};
animate();
*/

const sketch = ({context, width, height}) => {
  const agents = [];                                      //cria um array vazio que irá armazenar todos os agentes

  for (let i = 0; i < 100; i ++){                          //popula o array  
    const x = random.range(0, width);                     //recebem os valores aleatórios da coordenada x
    const y = random.range(0, height);                    //recebem os valores aleatórios da coordenada y
    
    agents.push(new Agent(x, y));                         //insere no array de agentes os novos agentes  
  }

  return ({ context, width, height }) => {                //retorno da função sketch
    context.fillStyle = 'black';                          //dá a cor do local de desenho (o "papel")
    context.fillRect(0, 0, width, height); 
    
    for (let i = 0; i < agents.length; i++){
      const agent = agents[i];                            //pega o agente atual  

      for (let j = i + 1; j < agents.length; j++){
        const other = agents[j];                          //pega um outro agente
        const dist = agent.pos.getDistance(other.pos);    //pega a distância entre o vetor atual e o outro vetor a cada iteração continuamente  

        if (dist > 200) continue;                         //se a distância for maior que 200, ele pula para a próxima iteração  

        context.lineWidth = math.mapRange(dist, 0, 250, 10, 1);  //O mapRange mapeia a distância entre os pontos criados
        //a linha acima deixa a linha mais grossa ou mais fina dependendo da distância dos pontos

        context.beginPath();
        //as duas linhas abaixo fazem o desenho das linhas
        context.moveTo(agent.pos.x, agent.pos.y);         //move a "caneta" para o começo da linha (primeiro agent)
        context.lineTo(other.pos.x, other.pos.y);         //traça uma linha até o outro agent  
        context.strokeStyle = 'white';
        context.stroke();
      }
    }

    agents.forEach(agent => {                             //para cada item do array
      agent.update();                                     //executa o método update que adiciona velocidade à posição 
      agent.draw(context);                                //executa o método de desenho de Agent (ou seja, desenhe o Agent, o método draw presente em Agent, permite a execução do código)
      agent.bounce(width, height);                        //executa o método para adicionar colisão e alterar o estado
    });
  };
};

canvasSketch(sketch, settings);
