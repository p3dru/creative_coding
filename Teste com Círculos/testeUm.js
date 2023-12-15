function setup() {
  createCanvas(800, 500);
  background(220);
  
  const d = 50;
  const margin = 70 //define a margem
  
  for(let n = 0; n < 1000; n++){   
    //cria o limite das monocromáticas
    let cxm = random(width);
    let cym = random(height);

    //cria as bolas monocromáticas
    noStroke();
    let coresMono = random(0, 255) 
    fill(coresMono, coresMono, coresMono);
    //define o raio da circunferência com e delimita o espaço
    circle(cxm, cym, 50);
  }
  
  //cria um retângulo branco no centro
  fill(255);
  rect(margin, margin, width - margin * 2, height - margin * 2);
  
  
  for(let y = 0; y < 130; y++){
    //cria os limites de onde as bolas coloridas começam
    let cx = random(margin + 50, width - margin - 40);
    let cy = random(margin + 50, height - margin - 40);
    
    //cria sombras
    noStroke();
    fill(15, 10);
    
    for(let i = 0; i < 20; i++){
      circle(cx + 15, cy + 25, d - i * 4);
    }
    
    let posX = (cx - margin) / (width - margin * 2)
    let posY = (cy - margin) / (height - margin * 2);
    
    //interpola entre vermelho e azul com base na posição da bola
   let cor = lerpColor(color(0, 0, 0), color(255, 255, 255), posX);
   fill(cor);
   
   //define o raio da circunferência com e delimita o espaço
   circle(cx, cy, 80);
    
    /*
    //cria as bolas coloridas
    fill(random(60, 255), random(60, 255), random(50, 255));
    //define o raio da circunferência com e delimita o espaço
    circle(cx, cy, 80);
    
    //cria o arco-iris baseado na posição da bola
   fill(random(60, 255), random(60, 255), random(50, 255));
   arc(cx, cy, 80, 80, 0, PI);
   */
  }
  

/*
   //cria um retângulo branco no centro
  fill(255);
  rect(margin + 110, margin + 110, width - margin * 5, height - margin * 5);
  
  for(let y = 0; y < 1000; y++){
    //cria os limites de onde as bolas coloridas começam
    let cx = random(margin + 125, width - margin - 120);
    let cy = random(margin + 125, height - margin - 120);
    
    //cria sombras
    noStroke();
    //fill(15, 10);
    //cria as bolas mono do centro
    let coresMono = random(0, 255) 
    fill(coresMono, coresMono, coresMono);
    //define o raio da circunferência com e delimita o espaço
    circle(cx, cy, 50);
  }
*/
}
