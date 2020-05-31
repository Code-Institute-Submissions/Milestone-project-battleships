var shipList = [["aircc","Aircraft Carrier",5],["btsp","Battleship",4],["sub","Submarine",3],["dest","Destroyer",3],["pboat","Patrol Boat",2]];
var shipIdList =["aircc","btsp","sub","dest","pboat"];
var deployedList = [];
var xAxis = ["A","B","C","D","E","F","G","H","I","J"];
var yAxis = ["1","2","3","4","5","6","7","8","9","10"];

function welcomeFunction(){
    //This clears the squares, providing a new board to play upon
    $(".game-square").removeClass("occupied");
    for(i=0;i<shipList.length;i++){
        $(".game-square").removeClass(`${shipList[i][0]}`)
    }
    deployedList = [];
    $("#arsenal tr").removeClass("placed");
    console.log("Ready for new game");
}
function newScreen(){
    //This clears the squares, providing a new board to play upon
    $(".game-square").removeClass("occupied");
    for(i=0;i<shipList.length;i++){
        $(".game-square").removeClass(`${shipList[i][0]}`)
    }
    deployedList = [];
    $("#arsenal tr").removeClass("placed");
    console.log("Ready for new game");
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
//Placing User's Ships
//If "new-game-btn" is clicked, user can begin to place their ships. After completion, they click the "ready-btn".
//This function allows the user to place a selected ship.
function selectShip(){
    window.shipId = $(this).attr('id');
    var indexShip = findInMDArray(shipId);
    window.shipLength = shipList[indexShip][2];
    window.shipSelected = shipList[indexShip][1];
    if(checkDuplicateStatus()== true){
        $("#message-panel-1 p").html(`${shipSelected} has already been deployed`);
        $("#message-panel-2 p").html(`Please select another ship`);
    } else{
        $("#message-panel-1 p").html(`Deploying ${shipSelected}`);
        $("#message-panel-2 p").html(`Ship length:${shipLength} Units`);
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
//When clicking on a game square, this function will read the coordinates of that square.
function findCoordinate(){
    var getClasses = this.className;
    window.sqCoor = getClasses[0]+getClasses[1];
    return sqCoor;
}
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
    return(newCoor);
}
//This function takes the coordinates provided by calculateShipCoor and checks if it conflicts with the coordinates of another ship.
function checkOverlapStatus(newCoor){
    window.overlapStatus;
    window.overlapSquare;
    for(i=0;i<newCoor.length;i++){
        var checkCoor = newCoor[i];
        if(checkOccupiedStatus(checkCoor)==true){
            overlapStatus = true;
            overlapSquare = newCoor[i];
            occupyingShipId = $(`#user-game-board .${overlapSquare}`).attr("class").split(" ").pop();
            for(i=0;i<shipList.length;i++){
                if(occupyingShipId == shipList[i][0]){;
                    occupyingShip = shipList[i][1];
                    console.log(occupyingShip);
                }
            };
            $("#message-panel-1 p").html(`${occupyingShip} is occupying square ${overlapSquare}`);
            $("#message-panel-2 p").html(`Please place your ship in another square`);
            return;
        } else {
            overlapStatus = false;
        };
    };
    return overlapStatus;
}
//This function will receive the coordinates of a clicked square, and then check if that square is occupied.
function checkOccupiedStatus(checkCoor){
    window.occupiedStatus;
    if($(`#user-game-board .${checkCoor}`).hasClass("occupied")){
        occupiedStatus = true;
    } else {
        occupiedStatus = false;
    }
    return occupiedStatus;
}
//This function checks if a ship has already been placed, and will limit duplicates of the same ship.
function checkDuplicateStatus(){
    window.checkDuplicateStatus;
    if($(`#${shipId}`).hasClass("placed")){
        duplicateStatus = true;
    } else {
        duplicateStatus = false;
    }
    return duplicateStatus;
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
//This function takes all the coordinates (provided by ship length) and fills the according squares
function placeShip(){
    if(checkDuplicateStatus()==true){
        return;
    } else {
        //This finds the square that's been clicked.
        var startingCoor = sqCoor;
        //This breaks the coordinates into an x and y value.
        calculateShipCoor(startingCoor);
        //This will place the ship in the calculated coordinates.
            checkOverlapStatus(newCoor);
            if(overlapStatus == true){
                console.log("Cannot place ship")
                return;
            } else{
                for(i=0;i<newCoor.length;i++){
                    var currentCoor = newCoor[i];
                    $(`#user-game-board .${currentCoor}`).addClass(`occupied ${shipId}`);  
                };
                $(`#${shipId}`).addClass("placed");
                deployedList.push(shipId);
                $("#message-panel-1 p").html(`${shipSelected} deployed`);
                $("#message-panel-2 p").html(`Please select another ship`);
                return;
            };
        
    }
}
//Retrieving Opponent's Coordinates
//These functions are deployed when click "ready-btn". It will check if all of the user's ships are placed before retrieving coordinates.
//If user is ready, the coordinates will load into "opp-game-board" and the game will begin.
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
function checkReadyStatus(){
    if(deployedList.length == 5){
        console.log("All ships deployed");
        readyStatus = true;
    } else {
        console.log("Please place all your ships before starting");
        var yetToBeDeployed = [];
        console.log(deployedList);
        console.log(shipIdList);
        var i=0;
        while(i <shipIdList.length){
            var j=0;
            console.log(i);
            console.log(shipIdList[i]);
            do{
                if(shipList[i][0]==deployedList[j]){
                    i++;
                    j=0;
                }
                if(shipList[i][0]!==deployedList[j]){
                    j++;
                }
            } while(j<deployedList.length)
            yetToBeDeployed.push(shipList[i][1]);
            i++;
            j=0;
            
        }
        readyStatus = false;        
        console.log(yetToBeDeployed);
    }  
}


$(document).ready(function(){
    welcomeFunction();
    $("#new-game-btn").click(newScreen);
    $("#ready-btn").click(checkReadyStatus);
    $("#orientation-btn").click(changeOrientation);
})







    



