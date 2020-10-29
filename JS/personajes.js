const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//Variables
let frames =0;
let requestId;
let arrayObstaculos = [];
let pedidos = [];
let arrayEnergy =[];
let pausado = false;

class Background{
    constructor(x, y, width, height, image){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = image;
    }

  dibujar (){
  this.x -= 3;
  //Fondo en movimiento
  if(this.x< -canvas.width) this.x=0;
  ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  //Fondo infinito
  ctx.drawImage(this.image, this.x + this.width, this.y,this.width,this.height)
   }
}

class Finalbackground{
  constructor(x, y, width, height, image){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.image = new Image();
  this.image.src = image;
  }

dibujar (){
ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
 }
}

 
class Deliveryman {
  constructor(x, y, width, height, image,tips, energy,){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.image = new Image ();
  this.image.src = image;
  this.tips = 0;
  this.energy = 1000;
  }

  dibujar(){
   ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  };

  choque(item){
    return  this.x + this.width >= item.x &&
            this.x <= item.x + this.width && 
            this.y <= item.y + item.height -20 &&
            this.y + this.height -20 >= item.y
  };

  puntaje() {
    ctx.font = "20px Turret Road, cursive";
    ctx.fillStyle = "black";
    ctx.fillRect(5,2, 295, 25);
    ctx.fillStyle = "#4CAF50";
    ctx.fillText(`Energía: ${this.energy}`, 10, 20);
    ctx.fillText(`Propinas: $ ${this.tips}`, 150, 20);
  }
}

class Energydrink {
    constructor(width, height, x, y, image, value){
      this.width = width;
      this.height = height;
      this.x = x;
      this.y = y;
      this.image = new Image ();
      this.image.src = image;
      this.value = 100
    }
    dibujar(){
    this.x -= 2;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

class Obstacles {
    constructor(width, height, x, y, image, value){
      this.width = width;
      this.height = height;
      this.x = x;
      this.y = y;
      this.image = new Image ();
      this.image.src = image;
      this.value = 500
    }
  dibujar (){
    this.y += 0.4;
    this.x -= 1;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
} 

class Nuevopedido {
  constructor(width, height, x, y, image, value){
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.image = new Image ();
    this.image.src = image;
    this.value = Math.floor(Math.random()*((200-50)+50));
  }
dibujar (){
  ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  pausado = true;
  };
 }