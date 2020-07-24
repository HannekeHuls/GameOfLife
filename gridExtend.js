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
/**
 * grid layout in rows, multidimensional array
 */
GameOfLife.prototype.grid = function(){
    let grd = [
        [0,0,1,0,0,0,0],
        [1,0,1,0,0,0,0],
        [0,1,1,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0]
    ];
    return grd;
};
/**
 * makes a copy of the original grid
 * @param grid this.grid (returned bij grid())
 */
GameOfLife.prototype.copyGridStructure = function(grid){
    let nwGrd = new Array(grid.length);
    for (let i = 0; i < grid.length;i++){
        nwGrd[i] = new Array(grid[i].length);
    }
    return nwGrd;
}; 
/**
 * makes a copy of the original grid
 * @param grid this.grid
 * @param newGrid is a new array, copied from grid
 */
GameOfLife.prototype.fillNewGrid = function(grid, newGrid){
    for (let i=0; i<grid.length;i++){
        for (let j=0; j<grid[i].length; j++)
            newGrid[i][j] = grid[i][j];
    }
    return newGrid;
};
/**
 * checks every direct and diagonal neighbour in grid looping throuh array
 * counts neiggbours if 1
 * depending counts a value is assigned to current position
 */
GameOfLife.prototype.neighbourCheck = function(){
    for (let x = 0;  x < this.grid.length; x++){
        let xLength = this.grid.length;
        for (let y = 0; y < this.grid[x].length; y++){
            let yLength = this.grid[x].length;
            let count = 0;
            for (let dx = -1; dx <= 1; dx++){
                    neighbourX = (x + dx) % xLength; 
                    if (neighbourX < 0)
                        neighbourX += xLength;
                for (let dy = -1; dy <= 1; dy++){
                    neighbourY = (y + dy)% yLength;
                    if (neighbourY < 0)
                        neighbourY += yLength;
                    if (dx === 0 && dy === 0){
                        }
                    else if 
                        (this.grid[neighbourX][neighbourY]){ 
                            count++;
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
    this.changeGrid();
    this.draw();
};
/**
 * grid changes according changes made in newGrid
 */
GameOfLife.prototype.changeGrid = function(){
    for (let x = 0; x < this.newGrid.length; x++){
      for (let y = 0; y < this.newGrid[x].length; y++){
          this.grid[x][y] = this.newGrid[x][y];
      }
    }
  };
/**
 * grid will be drawn on canvas
 */
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
/**
 * starts simulatiom
 */
GameOfLife.prototype.start = function(){
    this.begin = setInterval(this.neighbourCheck.bind(this),1000);
};
/**
 * ends simulatiom
 */
GameOfLife.prototype.end = function(){
    clearInterval(this.begin);
};

let gae = new GameOfLife();