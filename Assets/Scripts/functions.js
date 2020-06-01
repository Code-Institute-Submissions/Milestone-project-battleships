var shipList = [["aircc","Aircraft Carrier",5],["btsp","Battleship",4],["sub","Submarine",3],["dest","Destroyer",3],["pboat","Patrol Boat",2]];
var deployedList = [];
var oppsShips = [["aircc",5],["btsp",4],["sub",3],["dest",3],["pboat",2]]
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
    //This variable will tell some functions if ships are being deployed or not;
    window.placementPhase = true;
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
    $("#user-game-board .game-square").click(placeShip);
    return;
    
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
//When clicking/hovering on a game square, this function will read the coordinates of that square.
function findCoordinate(){
    var getClasses = this.className.split(" ");
    window.whichBoard = this.parentElement.parentElement.parentElement.parentElement.id;
    window.sqCoor = getClasses[0];
    return sqCoor, whichBoard;
}
//This will highlight games squares provided by 'findCoordinate' and if applicable 'calculateShipCoor'
function showCoordinates(){
    if(whichBoard == "user-game-board"){
        if(typeof shipLength == "undefined"){
            $(`#${whichBoard} .${sqCoor}`).addClass("show-coordinates");
        } else {
        //This finds the square that's being hovered over.
        var startingCoor = sqCoor;
        //This breaks the coordinates into an x and y value.
        calculateShipCoor(startingCoor);
        //This will place the ship in the calculated coordinates.
        for(i=0;i<newCoor.length;i++){
            var currentCoor = newCoor[i];
            $(`#user-game-board .${currentCoor}`).addClass("show-coordinates");  
        };
        }
        return;
    } else {
        $(`#${whichBoard} .${sqCoor}`).addClass("show-coordinates");
    }
}
//This will remove any highlighted squares caused by 'showCoordinates'
function unshowCoordinates(){
    $(".game-square").removeClass("show-coordinates");
}
function calculateShipCoor(startingCoor){
    var xCoor = startingCoor[0];
    if(startingCoor.length == 3){
        var yCoor = `${startingCoor[1]}${startingCoor[2]}`;
    } else {
        var yCoor = startingCoor[1];
    }
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
            var getClasses = $(`#user-game-board .${overlapSquare}`).attr("class").split(" ");
            //I want to find the shipID, which will be the second last class added.
            occupyingShipId = getClasses[getClasses.length - 2];
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
    if(placementPhase == true){
        if($(`#user-game-board .${checkCoor}`).hasClass("occupied")){
            occupiedStatus = true;
        } else {
            occupiedStatus = false;
        }
        return occupiedStatus;
    } else {
       if($(`#${whichBoard} .${sqCoor}`).hasClass("occupied")){
            occupiedStatus = true;
        } else {
            occupiedStatus = false;
        }
        return occupiedStatus; 
    }
}
//This function checks if a ship has already been placed, and will limit duplicates of the same ship.
function checkDuplicateStatus(){
    window.duplicateStatus;
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
function showCoordinates(){
    if(whichBoard == "user-game-board"){
        if(typeof shipLength == "undefined"){
            $(`#${whichBoard} .${sqCoor}`).addClass("show-coordinates");
        } else {
        //This finds the square that's being hovered over.
        var startingCoor = sqCoor;
        //This breaks the coordinates into an x and y value.
        calculateShipCoor(startingCoor);
        //This will place the ship in the calculated coordinates.
        for(i=0;i<newCoor.length;i++){
            var currentCoor = newCoor[i];
            $(`#user-game-board .${currentCoor}`).addClass("show-coordinates");  
        };
        }
        return;
    } else {
        $(`#${whichBoard} .${sqCoor}`).addClass("show-coordinates");
    }
}
function unshowCoordinates(){
    $(".game-square").removeClass("show-coordinates");
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
//Beginning The Game
//These functions are deployed when click "ready-btn". It will check if all of the user's ships are placed before retrieving coordinates.
//If user is ready, the coordinates will load into "opp-game-board" and the game will begin.
function beginGame(){
    getOpponentCoordinates();
    window.placementPhase = false;
    $("#message-panel-1 p").html("Your opponent is ready");
    $("#message-panel-2 p").html("Your turn. Play your first move.");
    var userTurn = true;
    var userShipCount = 0;
    var oppsShipCount = 0;
    window.turnCount = 0;
    $("#opp-game-board .game-square").click(userMakeGuess);
    //if(userShipCount < 5 || oppsShipCount < 5){
        //game over
    //}
};
//Retrieving Opponent's Coordinates

// This function retrieves a new set of coordinates, and places ships in the opponent's grid
function getOpponentCoordinates(){
    var opponentShipsPlaced = false;
    $.get("board-1.txt",function(rawCoor){
            var oppCoor = rawCoor.split(/\n/g);
            var ACCoor = oppCoor[0].split(",");
            for(i=0;i<ACCoor.length;i++){
            var currentCoor = ACCoor[i];
            $(`#opp-game-board .${currentCoor}`).addClass("occupied aircc");
            }
            var BSCoor = oppCoor[1].split(",");
            for(i=0;i<BSCoor.length;i++){
            var currentCoor = BSCoor[i];
            $(`#opp-game-board .${currentCoor}`).addClass("occupied btsp");
            }
            var SubCoor = oppCoor[2].split(",");
            for(i=0;i<SubCoor.length;i++){
            var currentCoor = SubCoor[i];
            $(`#opp-game-board .${currentCoor}`).addClass("occupied sub");
            }
            var DesCoor = oppCoor[3].split(",");
            for(i=0;i<DesCoor.length;i++){
            var currentCoor = DesCoor[i];
            $(`#opp-game-board .${currentCoor}`).addClass("occupied dest");
            }
            var PBCoor = oppCoor[4].split(",");
            for(i=0;i<PBCoor.length;i++){
            var currentCoor = PBCoor[i];
            $(`#opp-game-board .${currentCoor}`).addClass("occupied pboat");
            }
    });
    opponentShipsPlaced = true;
    return opponentShipsPlaced;
}
//This function checks if all of the user's ships has been placed, and then returns a true or false statement.
function checkReadyStatus(){
    if(deployedList.length == 5){
        readyStatus = true;
    } else {
        $("#message-panel-1 p").html("Please place all your ships before starting");
        var yetToBeDeployed = [];
        var i=0;
        while(i <shipList.length){
            var j=0;
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
        $("#message-panel-2 p").html(`${yetToBeDeployed} must still be deployed.`);        
    }
    return readyStatus;
}
function userMakeGuess(){
    $("#opp-game-board .game-square").click(findCoordinate);
    if($(`#${whichBoard} .${sqCoor}`).hasClass("attempted")){
        $("#message-panel-1 p").html(`${sqCoor} has already been selected.`);
        $("#message-panel-2 p").html(`Please select another square`);
    } else{
        checkOccupiedStatus(sqCoor);
        if(occupiedStatus == true){
            hitStatus();
        } else{
            missStatus();
        };
    }
    oppMakeGuess();
    turnCount++;
    console.log(turnCount++);
    
}
function oppMakeGuess(){
    console.log("opp turn");
    getRandomCoordinate();
    if($(`#user-game-board .${sqCoor}`).hasClass("attempted")){
        getRandomCoordinate();
    } else{
        checkOccupiedStatus(sqCoor);
        if(occupiedStatus == true){
            hitStatus();
        } else{
            missStatus();
        };
    }
    userTurn = true;
}
//This function will run if the user/opponent has correctly guessed a game square
function hitStatus(){
    //Change square to 'hit' class.
    
    $(`#${whichBoard} .${sqCoor}`).removeClass("occupied").addClass("hit attempted");
    $("#message-panel-1 p").html("It's a hit!");
    //Which ship is hit?
    var getClasses = $(`#${whichBoard} .${sqCoor}`).attr("class").split(" ");
    var occupyingShipId = getClasses[getClasses.length - 4];
    for(i=0;i<shipList.length;i++){
        if(occupyingShipId == shipList[i][0]){;
            occupyingShip = shipList[i][1];
            $("#message-panel-2 p").html(`${occupyingShip} was damaged!`);
            oppsShips[i][1]--;
            if(oppsShips[i][1] == 0){
                $("#message-panel-2 p").html(`${occupyingShip} was sunk!`);    
                $(`#${whichBoard} .${occupyingShipId}`).removeClass("hit").addClass("sunk");
                if(userTurn = true){
                    userShipCount++;
                } else {
                    oppsShipCount++;
                }
            }
        }
    };
};
//This function will run if the user/opponent has not correctly guessed a game square
function missStatus(){
    $("#message-panel-1 p").html("You missed!");
    $("#message-panel-2 p").html(``);
$(`#${whichBoard} .${sqCoor}`).addClass("miss attempted")
};
//This function will generate a random coordinate for the opponent to guess.
function getRandomCoordinate(){
    var xIndex = Math.floor(Math.random() * 10);
    var xCoor = xAxis[xIndex];
    var yIndex = Math.floor(Math.random() * 10);
    var yCoor = yAxis[yIndex];
    sqCoor = `${xCoor}${yCoor}`;
    whichBoard = "user-game-board";
    return sqCoor, whichBoard;
}


$(document).ready(function(){
    welcomeFunction();
    $("#new-game-btn").click(newScreen);
    $("#orientation-btn").click(changeOrientation);
    $(".game-square").mouseenter(findCoordinate);
    $(".game-square").mouseenter(showCoordinates);
    $(".game-square").mouseleave(unshowCoordinates);
    $("#ready-btn").click(beginGame);
    
});







    



