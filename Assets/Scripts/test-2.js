function placeShip(sqCoor){
    //This finds the square that's been clicked.
    var startingCoor = sqCoor;
    //This breaks the coordinates into an x and y value.
    calculateShipCoor(startingCoor);
    //This will place the ship in the calculated coordinates.
    for(i=0;i<newCoor.length;i++){
            var currentCoor = newCoor[i];
            $(`#user-game-board .${currentCoor}`).addClass("occupied");  
    };
}