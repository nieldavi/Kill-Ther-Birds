
var coracao, fundo, pedra, nivel = 1,  ovo, boneco=[], passaro=[], raioBoneco=25, bareiraPontos = 100;
var telas = 1, contVida = 0, som, somDisparo, somGameOver, somPassAt, somDorBoneco, somVitoria;         
var qpasmin, qpasmax, pasx=[], pasy=[], velpas=[], raiopas=25; //passaro
var px, py, vida=3, ponto=0; //canvas
var pxpedra=[], pypedra=[], disparo = false, qdisp= 0 , cont=0, raiopedra=15; // pedra
var pxOvo = [], pyOvo= [], disparOvo = false, cont1=0, raioOvo=15; //ovo


function preload(){
  coracao = loadImage('imagens/coracao.png');
  fundo = loadImage('imagens/fundo.png');
  pedra = loadImage('imagens/pedra.png');
  ovo = loadImage('imagens/egg.png');
  som = new Audio('audio/Circlerun.mp3');
somDisparo  = new Audio('audio/disparo.mp3');
somGameOver = new Audio('audio/GameOver.mp3');
somPassAt = new Audio ('audio/attack_hit.mp3');
somDorBoneco = new Audio('audio/ouch1.mp3');
somVitoria = new Audio('audio/Victory1.mp3');
    som.loop=true;
  for (i = 0; i < 4; i++) {
      boneco[i] = loadImage("imagens/andar("+i+").png");
      passaro[i] = loadImage("imagens/passaro("+i+").png");
    }
}

function setup() {
createCanvas(1000,500);
 background(fundo);
 
py=440;  //posição incial do meu boneco 
px=10;
qpasmin = 2; // quantidade minima de passaro 
qpasmax = 12; // quantidade maxima de passaro 

for(i=0;i<qpasmax; i++){
pasx[i] = 1000; // de onde o passaro sai
pasy[i]= random(10, 200); // variação do passaro no eixo y
}
for (i=0; i<qpasmax; i++){
velpas[i]= random(2,3); // velocidade inicial do passaro
}

}
function draw() {
   if(telas ==1 ){
    som.play();
     fill(250);
     textSize(24);
     textStyle(BOLD);
      background(fundo);
      image(coracao,750, 5, 40, 50);
      text(vida, 800, 39)
      text("SCORE: "+ponto, 850, 39);
      text("Nivel: "+nivel, 650, 39);
image(boneco[0], px, py, 50, 60);
 for(i=0 ; i<qpasmin; i++){
    image(passaro[0], pasx[i], pasy[i], 50, 50);
  pasx[i]= pasx[i]-velpas[i];
  if(pasx[i]<0){
  pasx[i] = 1000;                 //de onde sai o passaro
  pasy[i] = random(10, 200);      //limitação de voo dos passaros
  velpas[i]= random(3,4);         //velocidade dos passaros
  
  }
}

    text("Aperte ENTER para iniciar a jogo Kill the bird! ", 250, 465);
     if (keyIsDown(ENTER) ) {
       telas = 2;  
    } 
   }
  
     if(telas == 2){
   background(fundo);
   if(px%2==0){
    image(boneco[0], px, py, 50, 60);
   }
   else{
    image(boneco[2], px, py, 50, 60);
   }

    image(coracao,750, 5, 40, 50);


    textSize(22); // define o tamanho da fonte
  fill(255); 
  text(vida, 800, 39); // escreve na tela, note que podemos imprimir o valor de variáveis.
  text("SCORE: "+ponto, 850, 39);
  text("Nivel: "+nivel, 650, 39);
    if(px >= 970){
      px = 970;
    }
     if(px<0){
      px = 0;
     }
  if(keyIsDown(LEFT_ARROW)){
  px =px -5;                     //anda para a esquerda
  }
   if(keyIsDown(RIGHT_ARROW)){
  px = px +5;                    //anda para a direita
   }
  for(i=0 ; i<qpasmin; i++){
    image(passaro[0], pasx[i], pasy[i], 50, 50);
  pasx[i]= pasx[i]-velpas[i];
  if(pasx[i]<0){
  pasx[i] = 1000;                 //de onde sai o passaro
  pasy[i] = random(10, 200);      //limitação de voo dos passaros
  velpas[i]= random(3,4);         //velocidade dos passaros
  
  }
}
  if(keyIsDown(UP_ARROW)&& disparo==false){
      
     pxpedra[qdisp] = px+ 60;
      pypedra[qdisp] = py ;
     qdisp++;
    image(pedra, pxpedra[i], pypedra[i], 20, 30);
    disparo=true;
   somDisparo.play(); 
     }
     for(i=0;i<qdisp;i++){
        if(pypedra[i]>0){
        pypedra[i] = pypedra[i] - 3;            //disparo de baixo para cima
        image(pedra, pxpedra[i], pypedra[i], 20, 30);
       }
     }

      if(disparo==true){  
      cont++;
      } 
      if(cont==30){
        disparo=false;        // disparar varias pedras
        cont=0;
      }
     
     for(i=0;i<qdisp;i++){
       j=0;
       while(j<qpasmin){
         if(dist(pxpedra[i],pypedra[i],pasx[j],pasy[j])<(raiopas+raiopedra)){
             pxpedra[i]=10000;
             pypedra[i]=10000;                      //colissao entre a pedra e o passaro
             pasx[j] = 1000;               
             pasy[j] = random(10, 200);     
             velpas[j]= random(3,4);
             ponto= ponto + 5;
             somPassAt.play();
           }
           j++;
       }
     }
 for(i=0; i<qpasmin; i++){
  if(disparOvo== false){
  pxOvo[i] = pasx[i];
  pyOvo [i] = pasy[i];
   disparOvo = true;
  }
  if(disparOvo == true){
    image(ovo, pxOvo[i], pyOvo[i]);
    pyOvo [i] =pyOvo [i] + 3;
    cont1++         
  }
  if(cont1 >150){
    disparOvo  = false;
    cont1 = 0;
  }
 }
 for(i=0; i<qpasmin; i++){
   if(dist(pxOvo[i], pyOvo[i],px, py)<(raioBoneco+raioOvo)){
    pxOvo [i]= 10000;                                   //colisão entre boneco e pedra 
    pyOvo [i] =10000; 
   vida = vida - 1;
   somDorBoneco.play();
 }
 }

 for(i=0;i<qdisp;i++){
       j=0;
       while(j<qpasmin){
         if(dist(pxpedra[i],pypedra[i], pxOvo[j], pyOvo[j])<(raioOvo+raiopedra)){
             pxpedra[i]=10000;
             pypedra[i]=10000;                      //colissao entre a pedra e o ovo
             pxOvo[j] = 1000;               
             pxOvo[j] = 1000;     
            contVida ++
           }
           j++;
                }
 if (contVida == 5 ){
   vida = vida +1;
   contVida = 0;
 }
       }

  if(vida <= 0){
      telas = 3;
  }

  if(ponto>bareiraPontos){
    nivel = nivel +1;
    bareiraPontos =  bareiraPontos + 100;
    qpasmin = qpasmin + 2;
  }

}
 if( telas == 3){
  background(0);
  image(coracao,750, 5, 40, 50);
   som.pause();
  somGameOver. play();
  textSize(22); // define o tamanho da fonte
  fill(255); 
  text(vida, 800, 39); // escreve na tela, note que podemos imprimir o valor de variáveis.
  text("SCORE: "+ponto, 850, 39);
  text("Nivel: "+nivel, 650, 39);
  text("Game over!", 400, 250);
  text("Aperte F5 para continuar jogando", 300, 465);

 }
  if(nivel >= 5 && ponto >=500){
    telas = 4
  }
 if (telas == 4) {
 background(0);
  image(coracao,750, 5, 40, 50);
   som.pause();
  somVitoria.play();
  textSize(22); // define o tamanho da fonte
  fill(255); 
  text(vida, 800, 39); // escreve na tela, note que podemos imprimir o valor de variáveis.
  text("SCORE: "+ponto, 850, 39);
  text("Nivel: "+nivel, 650, 39);
  text("Você acabou de zerar o jogo!", 350, 250);
  text("Aperte F5 para continuar jogando", 310, 465);
 }

 }

