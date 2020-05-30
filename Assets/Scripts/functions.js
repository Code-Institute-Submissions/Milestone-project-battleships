var shipList = [["aircc","Aircraft Carrier",5],["btsp","Battleship",4],["sub","Submarine",3],["dest","Destroyer",3],["pboat","Patrol Boat",2]];
var xAxis = ["A","B","C","D","E","F","G","H","I","J"];
var yAxis = ["1","2","3","4","5","6","7","8","9","10"];

var newScreen = function(){
    //This clears the squares, providing a new board to play upon
    $(".game-square").removeClass("occupied");
    $("#arsenal tr").removeClass("placed");
    console.log("Screen cleared");
    //User is prompted to start placing their ships
    $("#message-panel-1 p").html("Please place your ships");
    $("#message-panel-2 p").html("Select a ship");
    //If user clicks on the arsenal table, it will run function selectShip
    $("#aircc").click(selectShip);
    $("#btsp").click(selectShip);
    $("#sub").click(selectShip);
    $("#dest").click(selectShip);
    $("#pboat").click(selectShip);
    $(".game-square").click(findCoordinate);
    $(".game-square").click(placeShip);
    
}
//This function allows the user to place a selected ship.
function selectShip(){
    window.shipId = $(this).attr('id');
    var indexShip = findInMDArray(shipId);
    window.shipLength = shipList[indexShip][2];
    window.shipSelected = shipList[indexShip][1];
    if($(`#${shipId}`).hasClass("placed")){
        $("#message-panel-1 p").html(`${shipSelected} has already been deployed`);
        $("#message-panel-2 p").html(`Please select another ship`);
    } else{
        $("#message-panel-1 p").html(`${shipSelected} selected`);
        $("#message-panel-2 p").html(`Ship length:${shipLength}`);
    }
}
function findInMDArray(shipId){
    var MDIndex;
    for(i = 0; i < shipList.length; i++ ) {
    if( shipList[i][0] === `${shipId}` ) {
        MDIndex = i;
        return MDIndex;
    }
}
}
//When clicking on a game square, this function will read the coordinates of that square, and then run function 'checkOccupiedStatus'
function findCoordinate(){
    var getClasses = this.className;
    window.sqCoor = getClasses[0]+getClasses[1];
    checkOccupiedStatus(sqCoor);
    console.log(sqCoor,checkOccupiedStatus(sqCoor));
    return [sqCoor, checkOccupiedStatus(sqCoor)];
}
//This function will receive the coordinates of a clicked square, and then check if that square is occupied.
function checkOccupiedStatus(sqCoor){
    window.occupiedStatus;
    if($(`#opp-game-board .${sqCoor}`).hasClass("occupied")){
        occupiedStatus = true;
    } else {
        occupiedStatus = false;
    }
    return occupiedStatus;
}
function calculateShipCoor(startingCoor){
    var xCoor = startingCoor[0];
    var yCoor = startingCoor[1];
    var xIndex = xAxis.indexOf(xCoor);
    var yIndex = yAxis.indexOf(yCoor);
    window.newCoor = [];
    if(checkOrientation() == true){
        for(i=0;i<shipLength;i++){
            newCoor.push(`${xCoor}${yAxis[yIndex]}`);
            yIndex++;
        }
    } else{
        for(i=0;i<shipLength;i++){
            newCoor.push(`${xAxis[xIndex]}${yCoor}`);
            xIndex++;
        }
    }
    return(newCoor);
}
//This function checks if the user wants to place their ship vertically or horizontally
function checkOrientation(){
    window.verticalStatus;
    if($("#orientation-btn").hasClass("vertical")){
        verticalStatus = true;
    } else {
        verticalStatus = false;
    };
    return verticalStatus;
}
//This function controls the 'Orientation Button'. Clicking toggles the status of vertically or horizontally.
function changeOrientation(){
    if($("#orientation-btn").hasClass("vertical")){
        $("#orientation-btn").removeClass("vertical");
    } else {
        $("#orientation-btn").addClass("vertical");
    }
}
function placeShip(){
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
}
// This function retrieves a new set of coordinates, and places ships in the opponent's grid
function getOpponentCoordinates(){
    if(checkReadyStatus() == true){
    $.get("board-1.txt",function(rawCoor){
        var oppCoor = rawCoor.split(/\n/g);
        var ACCoor = oppCoor[0].split(",");
        for(i=0;i<ACCoor.length;i++){
            var currentCoor = ACCoor[i];
            console.log(currentCoor);
            $(`#opp-game-board .${currentCoor}`).addClass("occupied");
        }
        var BSCoor = oppCoor[1].split(",");
        for(i=0;i<BSCoor.length;i++){
            var currentCoor = BSCoor[i];
            console.log(currentCoor);
            $(`#opp-game-board .${currentCoor}`).addClass("occupied");
        }
        var SubCoor = oppCoor[2].split(",");
        for(i=0;i<SubCoor.length;i++){
            var currentCoor = SubCoor[i];
            console.log(currentCoor);
            $(`#opp-game-board .${currentCoor}`).addClass("occupied");
        }
        var DesCoor = oppCoor[3].split(",");
        for(i=0;i<DesCoor.length;i++){
            var currentCoor = DesCoor[i];
            console.log(currentCoor);
            $(`#opp-game-board .${currentCoor}`).addClass("occupied");
        }
        var PBCoor = oppCoor[4].split(",");
        for(i=0;i<PBCoor.length;i++){
            var currentCoor = PBCoor[i];
            console.log(currentCoor);
            $(`#opp-game-board .${currentCoor}`).addClass("occupied");
        }

    })
    } else {
        console.log("You're a poop head");
    }
}
//This function checks if all of the user's ships has been placed, and then returns a true or false statement.
function checkReadyStatus(readyStatus){
    var readyStatus
    var aircraftReady;
    var battleshipReady;
    var submarineReady;
    var destroyerReady;
    var patrolboatReady;
    if($("#aircc").hasClass("placed")){
        aircraftReady = true;
        console.log("Aircraft Carrier Ready");
    } else {
        aircraftReady = false;
        console.log("Please deploy your Aircraft Carrier");
    }
    if($("#btsp").hasClass("placed")){
        battleshipReady = true;
        console.log("Battleship Ready");
    } else {
        battleshipReady = false;
        console.log("Please deploy your Battleship");
    }
    if($("#sub").hasClass("placed")){
        submarineReady = true;
        console.log("Submarine Ready");
    } else {
        submarineReady = false;
        console.log("Please deploy your Submarine");
    }
    if($("#dest").hasClass("placed")){
        destroyerReady = true;
        console.log("Destroyer Ready");
    } else {
        destroyerReady = false;
        console.log("Please deploy your Destroyer");
    }
    if($("#pboat").hasClass("placed")){
        patrolboatReady = true;
        console.log("Patrol Boat Ready");
    } else {
        patrolboatReady = false;
        console.log("Please deploy your Patrol Boat");
    }
    if(aircraftReady == true && battleshipReady == true && submarineReady == true && destroyerReady == true && patrolboatReady == true){
        console.log("All ships deployed");
        readyStatus = true;
    } else {
        console.log("Please place all your ships before starting");
        readyStatus = false;
        
    }
    return readyStatus;
}




$("#new-game-btn").click(newScreen);
$("#ready-btn").click(getOpponentCoordinates);
$("#orientation-btn").click(changeOrientation);
//$(".game-square").click(findCoordinate);





    



