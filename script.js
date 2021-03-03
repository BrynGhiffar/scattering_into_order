
var canvasWidth = 500;
var canvasHeight = 500;

var myGrid;
function setup(){
    createCanvas(canvasWidth, canvasHeight);
    background(0);

    myGrid = new grid();
}

function draw(){
    background(0);
    myGrid.update();

}

class particle{
    constructor(posX, posY, targetPosX, targetPosY, diam, red, green, blue){
        this.pos = createVector(posX, posY);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        
        this.targetPos = createVector(targetPosX, targetPosY);

        this.diam = diam;
        this.hasStroke = true;
        this.isCircle = true;

        this.red = red;
        this.green = green;
        this.blue = blue;
    }

    moveToTarget(){
        this.vel = p5.Vector.sub(this.targetPos, this.pos);
        // this.vel.div(this.vel.mag());
        this.vel.mult(0.01);
        this.pos.add(this.vel);
    }

    sketch(){
        if(!(this.hasStroke)){
            noStroke();
        } else {
            stroke(this.red, this.green, this.blue);
            strokeWeight(1);
        }
        fill(this.red, this.green, this.blue);
        if (this.isCircle){
            circle(this.pos.x, this.pos.y, this.diam);
        } else {
            rectMode(CENTER);
            square(this.pos.x, this.pos.y, this.diam);
        }
    }
}

class grid{
    constructor(){
        // Assumption: canvas is always square

        // Number of particles in the horizontal direction
        this.numHorizontalParticles = 50;

        // Spacing between the particles in
        // the horizontal direction
        this.horizontalSpacing = canvasWidth / (this.numHorizontalParticles + 1);

        // Number of particles in the vertical direction
        this.numVerticalParticles = 50;

        // Spacing between the particles in the
        // vertical direction
        this.verticalSpacing = canvasHeight / (this.numVerticalParticles + 1);

        // Array to store the particles.
        this.particleArray = [];

        // create grid
        this.createGrid();
    }
    createGrid(){
        // creates the particles and stores them in this.particleArray

        for (var j = 1; j <= this.numVerticalParticles; j++){
            for (var i = 1; i <= this.numHorizontalParticles; i++){
                var initX = random(0, canvasWidth);
                var initY = random(0, canvasHeight);
                var newParticle = new particle(initX, initY, i * this.horizontalSpacing, j * this.verticalSpacing, this.horizontalSpacing, 
                    map(i, 1, this.numHorizontalParticles, 0, 255), 
                    map(j, 1, this.numVerticalParticles, 0, 255), 
                    255);
                this.particleArray.push(newParticle);
            }
        }
    }
    move(){
        // update the particles position

        for (var i = 0; i < this.particleArray.length; i++){
            this.particleArray[i].moveToTarget();
        }
    }
    sketch(){
        // sketches the particles onto the canvas

        for (var i = 0; i < this.particleArray.length; i++){
            this.particleArray[i].sketch();
        }
    }

    update(){
        this.move();
        this.sketch();
    }
}