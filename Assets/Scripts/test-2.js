function calculateShipCoor(startingCoor){
    var xCoor = startingCoor[0];
    var yCoor = startingCoor[1];
    var xIndex = xAxis.indexOf(xCoor);
    var yIndex = yAxis.indexOf(yCoor);
    window.newCoor = [];
    if(checkOrientation() == true){
        //This function takes the coordinates provided by calculateShipCoor and checks if it flows over the boundaries of the map.
        //If the choosen square is too close to the boundaries, this function will move the ship so that it fits in the map.
        if((yIndex+shipLength)>yAxis.length){
            var diff = (yIndex+shipLength)-yAxis.length;
            var newyIndex = yIndex - diff;
            for(i=0;i<shipLength;i++){
                newCoor.push(`${xCoor}${yAxis[newyIndex]}`);
                newyIndex++;
            }
        } else {
            for(i=0;i<shipLength;i++){
                newCoor.push(`${xCoor}${yAxis[yIndex]}`);
                yIndex++;
            }
        }
    } else{
        //This function takes the coordinates provided by calculateShipCoor and checks if it flows over the boundaries of the map.
        //If the choosen square is too close to the boundaries, this function will move the ship so that it fits in the map.
        if((xIndex+shipLength)>xAxis.length){
            var diff = (xIndex+shipLength)-xAxis.length;
            var newxIndex = xIndex - diff;
            for(i=0;i<shipLength;i++){
                newCoor.push(`${xAxis[newxIndex]}${yCoor}`);
                newxIndex++;
            }
        } else {
            for(i=0;i<shipLength;i++){
                newCoor.push(`${xAxis[xIndex]}${yCoor}`);
                xIndex++;
            }
        }
    }
    console.log("newCoor");
    console.log(newCoor);
    return(newCoor);
}
//This function takes the coordinates provided by calculateShipCoor and checks if it conflicts with the coordinates of another ship.
function checkOverlapStatus(newCoor){
    window.overlapStatus;
    window.overlapSquare;
    for(i=0;i<newCoor.length;i++){
        checkOccupiedStatus(newCoor[i]);
        if(checkOccupiedStatus()==true){
            overlapStatus = true;
            overlapSquare = newCoor[i];
            console.log(`Square ${overlapSquare} is overlapping.`)
        } else {
            overlapStatus = false;
            console.log("There is no overlap");
        };
    };
    return overlapStatus;
}
function placeShip(){
    if(checkDuplicateStatus()==true){
        return;
    } else {
        //This finds the square that's been clicked.
        var startingCoor = sqCoor;
        //This breaks the coordinates into an x and y value.
        calculateShipCoor(startingCoor);
        //This will place the ship in the calculated coordinates.
            for(i=0;i<newCoor.length;i++){
                var currentCoor = newCoor[i];
                $(`#user-game-board .${currentCoor}`).addClass("occupied");  
            };
        $(`#${shipId}`).addClass("placed");
        return;
        
    }
}