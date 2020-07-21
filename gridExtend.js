/**
 * @constructor
 */
const GameOfLife = function(){
    this.canvas = document.getElementById("cnvs");
    this.context = this.canvas.getContext("2d");
    
    this.grid = this.grid();
    this.copy = this.copyGridStructure(this.grid);
    this.newGrid = this.fillNewGrid(this.grid, this.copy);
    console.log(this.newGrid);
};

GameOfLife.prototype.grid = function(){
    let grd = [
        [0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    ];
    return grd;
};

GameOfLife.prototype.copyGridStructure = function(grid){
    let nwGrd = new Array(grid.length);
    for (let i = 0; i < grid.length;i++){
        nwGrd[i] = new Array(grid[i].length);
    }
    return nwGrd;
}; 

GameOfLife.prototype.fillNewGrid = function(grid, newGrid){
    for (let i=0; i<grid.length;i++){
        for (let j=0; j<grid[i].length; j++)
            newGrid[i][j] = grid[i][j];
    }
    return newGrid;
};

GameOfLife.prototype.neighbourCheck = function(){
    for (let x = 0; x < this.grid.length; x++){
        for (let y = 0; y < this.grid[x].length; y++){
            let count = 0;
            for (let dx = -1; dx <= 1; dx++){
                for (let dy = -1; dy <= 1; dy++){
                    if (dx === 0 && dy === 0){
                        console.log("00000", this.grid[dx + x][dy + y]);
                    }
                    else if 
                        (this.grid[dx + x] != undefined 
                        && this.grid[dx + x][dy + y] != undefined 
                        && this.grid[dx + x][dy + y]){
                            count++;
                            console.log(this.grid[dx + x][dy + y]);
                        }    
                }
            }
            let value = this.grid[x][y];
            switch(count){
                case 0:
                    break;
                case 1:
                    value = 0;
                    break;
                //waarde 0 blijft 0 en waarde 1 blijft 1 als count is 2
                case 2:
                    break;
                case 3:
                    value = 1;
                    break;
                default:
                    value = 0;
            }
            this.newGrid[x][y] = value;    
        }
    }
    //console.log(this.newGrid);
    this.changeGrid();
    this.draw();
};

GameOfLife.prototype.changeGrid = function(){
    for (let x = 0; x < this.newGrid.length; x++){
      for (let y = 0; y < this.newGrid[x].length; y++){
          this.grid[x][y] = this.newGrid[x][y];
      }
    }
  };

GameOfLife.prototype.draw = function(){
    for (let x = 0; x < this.grid.length; x++)
        for (let y = 0; y < this.grid[x].length; y++){
            if (this.grid[x][y] === 1){
                this.context.fillStyle = "orange";
            }
            if (this.grid[x][y] === 0){
                this.context.fillStyle = "green";
            }
            this.context.fillRect(x * 25, y * 25, 25, 25);
        }
};

GameOfLife.prototype.start = function(){
    this.begin = setInterval(this.neighbourCheck.bind(this),1000);
};

GameOfLife.prototype.end = function(){
    clearInterval(this.begin);
};

let game = new GameOfLife();