const backGround = new Background(0,0,canvas.width,canvas.height,'Images/23433.jpg')
const deliveryMan = new Deliveryman(50,405,60,60,'Images/ciclistafinal.png',this.tips,this.energy);
const nuevoPedido = new Nuevopedido (100,100,670,156,'Images/notificacion.jpg',this.value);
const finDeJuego = new Finalbackground(450,100,300,300,'Images/GameOver.png' );
const confirmaEntrega = new Nuevopedido (100,100,670,156,'Images/confirmar.jpg',this.value);
const juegoGanado = new Finalbackground (450,100,450,310,'Images/youwin.png');
const juegoPausado = new Finalbackground (450,100,300,300,'Images/pausafinal.png')

generarObstaculos = () => {
   const obstaculos1 = new Obstacles (30,37,Math.floor(Math.random()*((1340-670)+240)),430, 'Images/gatofinal.png');
   const obstaculos2 = new Obstacles (50,70,Math.floor(Math.random()*((1340-670)+540)),400,'Images/parejafinal.png');
   const obstaculos3 = new Obstacles (30,70,Math.floor(Math.random()*((1340-670)+840)),400,'Images/mujerfinal.png' );
   if(frames % 400 === 0 && !pausado)
   arrayObstaculos=[...arrayObstaculos,obstaculos1,obstaculos2,obstaculos3];
}

dibujarObstaculos = () => {
    arrayObstaculos.forEach((item,index)=>{
        if(item.y>511 && !pausado){
        arrayObstaculos.splice(index,1);}
        item.dibujar();
        if(deliveryMan.choque(item) && deliveryMan.energy>0 && !pausado){
        deliveryMan.energy -=item.value;
        arrayObstaculos.splice(index,1);}
        else if(deliveryMan.choque(item) && deliveryMan.energy<=0 && !pausado){
        return terminarJuego();}
        });
    }

    generarEnergydrinks = () => {
      const x = Math.floor(Math.random()*9);
      const y = Math.floor(Math.random()*(490-420)+420);
      const energyDrink = new Energydrink(6,12,x * 64,y,'Images/bebidafinal.png',this.value);
      if(frames % 180 === 0 && !pausado)
      arrayEnergy=[...arrayEnergy,energyDrink];
   }
   
   dibujarEnergydrinks = () => {
       arrayEnergy.forEach((bebida,index)=>{
         if(bebida.x < 0 && !pausado){
           arrayEnergy.splice(index,1);}
           bebida.dibujar();
           if(deliveryMan.choque(bebida) && !pausado){
           deliveryMan.energy += bebida.value;
           arrayEnergy.splice(index,1);
          } 
        }); return deliveryMan.puntaje();
       }

//Carga cada nuevo Pedido
aceptarNuevoPedido = () =>{
  ctx.clearRect(0,0,canvas.weight,canvas.height);
  backGround.dibujar();
  deliveryMan.dibujar();
  deliveryMan.puntaje();
  nuevoPedido.dibujar();
  pedidos=[...pedidos,nuevoPedido];
};

//Actualización de Juego
actualizacionJuego = () =>{
    if(!pausado){
    frames ++;
    ctx.clearRect(0,0,canvas.weight,canvas.height);
    backGround.dibujar();
    deliveryMan.dibujar();
    deliveryMan.puntaje();
    generarObstaculos();
    dibujarObstaculos();
    generarEnergydrinks();
    dibujarEnergydrinks();
    if(frames % 1200 === 0 && !pausado){
      deliveryMan.tips += pedidos[pedidos.length-1].value;
      confirmaEntrega.dibujar();
    }
    if (frames % 1250 === 0 && !pausado)
    {
      nuevoPedido.dibujar(); 
      pedidos=[...pedidos,nuevoPedido];
    }
    if(deliveryMan.tips >= 100){
        ganarJuego();
    }
    if(!requestId || deliveryMan.energy<=0){
    return terminarJuego();} 
    requestId = requestAnimationFrame(actualizacionJuego);}

}


terminarJuego = () => {
    requestId = undefined;
    finDeJuego.dibujar();
}

ganarJuego =() => {
  pausado = true;
  juegoGanado.dibujar();
  ctx.fillStyle = "black";
  ctx.fillRect(600,325, 175, 25);
  ctx.font = "20px Turret Road, cursive";
  ctx.fillStyle = "#4CAF50";
  ctx.fillText(`Propinas: $ ${deliveryMan.tips}`, 605, 345);
}

pausarJuego = () =>{
    if (pausado)
    {
        pausado = false;
        requestId = requestAnimationFrame(actualizacionJuego);
    }
         pausado = true;
         juegoPausado.dibujar();
    } 
     
      



// Botón de iniciar juego
window.onload = () => {
    document.getElementById('start-button').onclick = () => {
    aceptarNuevoPedido();
    };
  }


//Input
addEventListener('keydown',(e)=>{
  e.preventDefault()
    switch (e.keyCode) {
      case 39: // right arrow // down
      if(deliveryMan.y<480){
        deliveryMan.y += 20;} else {
          deliveryMan.y;
        }
        break;
      case 37: // left arrow // up
      if (deliveryMan.y>420){
        deliveryMan.y -= 20;}else{
        deliveryMan.y;}
        break;
      
      case 38: // up arrow // remove the notification
      pausado = false;
      requestId = requestAnimationFrame(actualizacionJuego)
      break;

      case 40: //down arrow // pause
      pausarJuego();
      break;
    }
  })
