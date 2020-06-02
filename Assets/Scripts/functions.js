var shipList = [["aircc","Aircraft Carrier",5],["btsp","Battleship",4],["sub","Submarine",3],["dest","Destroyer",3],["pboat","Patrol Boat",2]];
var deployedList = [];
var oppsShips = [["aircc",5],["btsp",4],["sub",3],["dest",3],["pboat",2]];
var usersShips = [["aircc",5],["btsp",4],["sub",3],["dest",3],["pboat",2]]
var xAxis = ["A","B","C","D","E","F","G","H","I","J"];
var yAxis = ["1","2","3","4","5","6","7","8","9","10"];
var attemptedGuesses = [];
//Is this necessary as I also have 'newScreen()'
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
    do{
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
    } while(placementPhase = true);
    
    
}
//Placing User's Ships
//If "new-game-btn" is clicked, user can begin to place their ships. After completion, they click the "ready-btn".
//This function allows the user to place a selected ship.
function selectShip(){
    window.shipId = $(this).attr('id');
    window.indexShip = findInMDArray(shipId);
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
    if(whichBoard == "user-game-board" ){
        if(typeof shipLength == "undefined" && placementPhase == true){
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
        if(typeof shipLength == "undefined" || placementPhase == false){
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
    if(placementPhase == true){
    if(checkDuplicateStatus()==true){
        $(`#user-game-board .${shipId}`).removeClass(`occupied ${shipId}`);
        $(`#${shipId}`).removeClass("placed");
        $("#message-panel-1 p").html(`${shipSelected} Removed`);
        $("#message-panel-2 p").html(`Please select where to redeploy ship`);
        shipLength = shipList[indexShip][2];
        var removeIndex = deployedList.indexOf(shipId);
        if(removeIndex > -1){
            deployedList.splice(removeIndex, 1);
        }
        
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
                shipLength = 1;
                return;
            };
        
    }
    } else {
        return;
    }
}
//Beginning The Game
//These functions are deployed when click "ready-btn". It will check if all of the user's ships are placed before retrieving coordinates.
//If user is ready, the coordinates will load into "opp-game-board" and the game will begin.
function beginGame(){
    if(checkReadyStatus() == false){
        return;
    } else {
        getOpponentCoordinates();
        window.placementPhase = false;
        $("#message-panel-1 p").html("Your opponent is ready");
        $("#message-panel-2 p").html("Your turn. Play your first move.");
        window.userTurn = true;
        window.userShipCount = 0;
        window.oppsShipCount = 0;
        window.turnCount = 0;
        if(userTurn  == true){
        $("#opp-game-board .game-square").click(userMakeGuess);
    } else {
        console.log("Wait your turn");
    }
    } 
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
        while(i < shipList.length){
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
    if(userTurn == false){
        console.log("Wait your turn!");
    } else {
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
            userTurn = false;
            setTimeout(oppMakeGuess,000);
        }
    }
}
function oppMakeGuess(){
    whichBoard = "user-game-board";
    console.log("opp turn");
    do{
       intelligentGuess(); 
    }while($(`#user-game-board .${sqCoor}`).hasClass("attempted"));
    checkOccupiedStatus(sqCoor);
    if(occupiedStatus == true){
        hitStatus();
        var getClasses = $(`#user-game-board .${sqCoor}`).attr("class").split(" ");
            //I want to find the shipID, which will be the second last class added.
        window.occupyingShipId = getClasses[getClasses.length - 4];
            for(i=0;i<shipList.length;i++){
                if(occupyingShipId == shipList[i][0]){;
                    occupyingShipId = shipList[i][0];
                    console.log(occupyingShip);
                }
            };
        attemptedGuesses.push([sqCoor,occupiedStatus,occupyingShipId])
    } else{
        missStatus();
        attemptedGuesses.push([sqCoor,occupiedStatus]);
        
    };

    userTurn = true;
    turnCount++;
    console.log(turnCount);
    console.log(`User has sunk ${userShipCount} ships. Opponent has sunk ${oppsShipCount} ships`);
    console.log(attemptedGuesses);
    if(userShipCount == 5 || oppsShipCount == 5){
        finishGame();
    };
}
//This function will run if the user/opponent has correctly guessed a game square
function hitStatus(){
    //Change square to 'hit' class.
    $("#message-panel-1 p").html("It's a hit!");
    $(`#${whichBoard} .${sqCoor}`).removeClass("occupied").addClass("hit attempted");
    //Which ship is hit?
    var getClasses = $(`#${whichBoard} .${sqCoor}`).attr("class").split(" ");
    var occupyingShipId = getClasses[3];
    for(i=0;i<shipList.length;i++){
        if(occupyingShipId == shipList[i][0]){;
            occupyingShip = shipList[i][1];
            $("#message-panel-2 p").html(`${occupyingShip} was damaged!`);
            if(userTurn == true){
                oppsShips[i][1]--;
                if(oppsShips[i][1] == 0){
                    $("#message-panel-2 p").html(`${occupyingShip} was sunk!`);    
                    $(`#${whichBoard} .${occupyingShipId}`).removeClass("hit").addClass("sunk");
                    userShipCount++;
                }
            } else {
                usersShips[i][1]--;
                if(oppsShips[i][1] == 0){
                    $("#message-panel-2 p").html(`${occupyingShip} was sunk!`);    
                    $(`#${whichBoard} .${occupyingShipId}`).removeClass("hit").addClass("sunk");
                    oppsShipCount++;
                }
            }
        }
    };
};
//This function will run if the user/opponent has not correctly guessed a game square
function missStatus(){
    if(userTurn == true){
        $("#message-panel-1 p").html("You missed!");
        $("#message-panel-2 p").html(`${sqCoor} was empty`);
    } else {
        $("#message-panel-1 p").html("Your opponent missed!");
        $("#message-panel-2 p").html(`${sqCoor} was empty`);            
    }
    
    $(`#${whichBoard} .${sqCoor}`).addClass("miss attempted")
};
//This function will generate a random coordinate for the opponent to guess.
function getRandomCoordinate(){
    var xIndex = Math.floor(Math.random() * 10);
    var xCoor = xAxis[xIndex];
    var yIndex = Math.floor(Math.random() * 10);
    var yCoor = yAxis[yIndex];
    sqCoor = `${xCoor}${yCoor}`;
    return sqCoor;
}
//This function will attempt to allow the opponent to make an intelligent guess based on their previous result.
function getlastCoor (){
    var lastIndex = attemptedGuesses.length-1;
    window.lastsqCoor = attemptedGuesses[lastIndex][0];
    window.lastStatus = attemptedGuesses[lastIndex][1];
    window.lastxCoor = lastsqCoor[0];
    window.lastxIndex = xAxis.indexOf(lastxCoor);
    if(lastsqCoor.length == 3){
        window.lastyCoor = `${lastsqCoor[1]}${lastsqCoor[2]}`;
    } else {
        window.lastyCoor = lastsqCoor[1];
    }
    window.lastyIndex = yAxis.indexOf(lastyCoor);    
}
function getpenCoor (){
    var penIndex = attemptedGuesses.length-2;
    window.pensqCoor = attemptedGuesses[penIndex][0];
    window.penStatus = attemptedGuesses[penIndex][1]
    window.penxCoor = pensqCoor[0];
    window.penxIndex = xAxis.indexOf(penxCoor);
    if(pensqCoor.length == 3){
        window.penyCoor = `${pensqCoor[1]}${pensqCoor[2]}`;
    } else {
        window.penyCoor = pensqCoor[1];
    }
    window.penyIndex = yAxis.indexOf(penyCoor);    
}
function getproCoor (){
    var proIndex = attemptedGuesses.length-3
    window.prosqCoor = attemptedGuesses[proIndex][0];
    window.proStatus = attemptedGuesses[proIndex][1]
    window.proxCoor = prosqCoor[0];
    window.proxIndex = xAxis.indexOf(proxCoor);
    if(prosqCoor.length == 3){
        window.proyCoor = `${prosqCoor[1]}${prosqCoor[2]}`;
    } else {
        window.proyCoor = prosqCoor[1];
    }
    window.proyIndex = yAxis.indexOf(proyCoor);    
}
function intelligentGuess(){
    var checkSunk;
if (attemptedGuesses.length == 0){
        getRandomCoordinate();
} else {
    if (attemptedGuesses.length == 1){
        getlastCoor();
        //Did our first guess hit?
        if(lastStatus == true){
            sqCoor = `${xAxis[lastxIndex+1]}${lastyIndex}`;
        } else{//No (493)
            getRandomCoordinate();
        }
    } else{
        if(attemptedGuesses.length == 2){
            getpenCoor();
            //Did our second guess hit?
            if(lastStatus == true){
                sqCoor = `${xAxis[lastxIndex+1]}${lastyIndex}`;
                //Did our guess sink the ship?
                //This can only happen to patrol boat, being length of 2.Meaning pen guess had to hit as well.
                //Did our pen guess hit?
                if(penStatus == true){//Yes(514)
                        //Check which axis the hits were on
                        //Are the guesses share the same x coor?
                        if (lastxCoor == penxCoor){//Yes (516)
                            //Are we going up/down the y-axis
                            if(lastyIndex < penyIndex){//Up
                                //Continue going up the y-axis with the same x coor.
                                sqCoor = `${lastxCoor}${yAxis[lastyIndex-1]}`;
                            } else {//Down
                                //Go down the y-axis with the same x coor.
                                sqCoor = `${lastxCoor}${yAxis[lastyIndex+1]}`;
                            }
                        } else {//No (516)
                            //Are we going up/down the x-axis?
                            if(lastxIndex < penxIndex){//Up/left
                                //Continue going left on the x-axis with the same y coor.
                                sqCoor = `${xAxis[lastxIndex-1]}${lastyCoor}`;
                            } else {//Down/right
                                //Continue going right on the x-axis with the same y coor.
                                sqCoor = `${xAxis[lastxIndex-1]}${lastyCoor}`;
                            }
                        }
                } else {
                        sqCoor = `${xAxis[lastxIndex+1]}${lastyIndex}`
                    }
            } else{//No (493)
                //Did our first guess hit?
                if(penStatus == true){//Yes(571)
                    sqCoor = `${xAxis[penxIndex+1]}${penyIndex}`;
                } else {
               getRandomCoordinate(); 
                }
            }
        } else {
            getproCoor();
        //Did our last guess hit?
        if (lastStatus == true){ //Yes (4)
        //Did that ship sink?
        for(i=0;i<usersShips.length;i++){
            if(usersShips[i][0]==attemptedGuesses[lastIndex][2])
            checkSunk = usersShips[i][1];
        }
        if(checkSunk == 0){//Yes (6)
            //Random Number
            getRandomCoordinate();
        } else {//No (6)
            //Did our pen guess hit?
            if(penStatus == true){//Yes (10)
                //Was it the same ship?
                if(attemptedGuesses[lastIndex][1] == attemptedGuesses[penIndex][1]){//Yes (12)
                    //Does the last guess and pen guess share the same x-coor?
                    if (lastxCoor == penxCoor){//Yes (14)
                        //Should I go up or down the y-axis?
                        if(lastyIndex > penyIndex){//Down (16)
                            //Same x coor, larger y coor
                            sqCoor = `${lastxCoor}${yAxis[lastyIndex+1]}`;
                        } else {//Up (16)
                            //Same x coor, smaller y coor
                            sqCoor = `${lastxCoor}${yAxis[lastyIndex-1]}`;
                        }
                    } else {//No (14)
                        //Does the last guess and pen guess share the same y-coor?
                        if(lastyCoor == penyCoor){//Yes (23)
                            //Should I go up or down the x-axis?     
                            if(lastxIndex > penxIndex){//Down/Right (25)
                                //Same y coor, larger x coor
                                sqCoor = `${xAxis[lastxIndex+1]}${lastyCoor}`;
                            } else {//Up/Left (25)
                                //Same y coor, smaller x coor
                                sqCoor = `${xAxis[lastxIndex-1]}${lastyCoor}`;
                            }
                        } else{//No (23)
                           //This cannot happen, because lastguess and penguess ship is the same, and ship's must share either x or y coor.     
                        }
                    }
                } else {//No(12)
                    //Did the penguess sink the ship?
                    for(i=0;i<usersShips.length;i++){
                        if(usersShips[i][0]==attemptedGuesses[penIndex][2])
                        checkSunk = usersShips[i][1];
                    }
                    if(checkSunk == 0){//Yes (36)
                        //Then ignore penguess, previous ship irrelevant
                        //I need to search around the area of lastguess.
                        //Can go x+/-1 or y+/-1. But keep one constant
                        sqCoor = `${xAxis[lastxIndex-1]}${lastyCoor}`;
                    } else {//No (36)
                        //Can this happen?
                        console.log("I am the diagonal ship problem. My last two guesses hit two different ships.")
                    }
                }
            } else {//No (10)
                //Did our pro guess hit?
                if(proStatus == hit){//Yes (47)
                    //Was it the same ship as lastguess?
                    if(attemptedGuesses[lastIndex][2]==attemptedGuesses[proIndex][2]){//Yes (49)
                        //Then we want to continue in the same axis trend.
                        //Does last guess and pro guess share the same x coor?
                        if (lastxCoor == proxCoor){//Yes (52)
                            //Should I go up or down?
                            if(lastyCoor > proyCoor){//Down (54)
                                //Same x coor, larger y coor
                                sqCoor = `${lastxCoor}${yAxis[lastyIndex+1]}`;
                            } else {//Up (54)
                                //Same x coor, smaller y coor
                                sqCoor = `${lastxCoor}${yAxis[lastyIndex-1]}`;
                            }
                        } else {//No (52)
                            //Does the last guess and pro guess share the same y coor?
                            if(lastyCoor == proyCoor){//Yes (61)
                                //Should I go up or down the y axis?
                                if (lastyCoor > proyCoor){//Down/Right(63)
                                    //Same y coor, larger x coor
                                    sqCoor = `${xAxis[lastxIndex+1]}${lastyCoor}`;
                                } else {//Up/left (63)
                                    //Same y coor, smaller x coor
                                    sqCoor = `${xAxis[lastxIndex-1]}${lastyCoor}`;
                                }
                            } else {//No (61)
                                //This cannot happen, because lastguess and proguess ship is the same, and ship's must share either x or y coor.
                            }
                        }
                    } else { //No (49)
                        //Then they are different ships. Disregard pro guess.
                        //Explore around last guess coor.
                        sqCoor = `${xAxis[lastxIndex-1]}${lastyCoor}`;
                    }
                } else {//No (47)
                    //Previous two guesses were misses.
                    //Check if penguess x coor share the same pen guess x coor
                    if(penxCoor == proxCoor){//yes (79)
                        //I know that I have previously attempted the space inbetween with the same x coor. 
                        //So i want to check lastguessx, but away from pen/pro guess.
                        //I check if lastguessx is higher or lower
                        if(lastxCoor > penxCoor){//lgX is larger (83)
                            //So i want to keep the same y coor with a larger x coor.
                            sqCoor = `${xAxis[lastxIndex+1]}${lastyCoor}`;
                        } else {//lgX is smaller (83)
                            //I want to keep the same y coor but with a smaller x coor.
                            sqCoor = `${xAxis[lastxIndex-1]}${lastyCoor}`;
                        }
                    } else {//No (79)
                        //Then I keep the same x coor.
                        //I want to check if lastguessy is higher or lower
                        if(lastyCoor > penyCoor){//lgY is larger (91)
                            //Same x coor, larger y coor.
                            sqCoor = `${lastxCoor}${yAxis[lastxIndex+1]}`;
                        } else {//Smaller (91)
                            //Same x coor, smaller y coor.
                            sqCoor = `${lastxCoor}${yAxis[lastxIndex-1]}`;
                        }
                    }
                }
            }
        }
    } else{ //No (4)
        //Did our pen guess hit?
        if(penStatus == true){//Yes (102)
            //Did pen guess sink?
            for(i=0;i<usersShips.length;i++){
                if(usersShips[i][0]==attemptedGuesses[penIndex][2])
                checkSunk = usersShips[i][1];
            }
            if(checkSunk == 0){//yes (104)
                getRandomCoordinate();
            } else {//No (104)
                //Did last guess and pen guess share the same x coor?
                if(lastxCoor == penxCoor){//Yes(109)
                    //Should I go up or down the y-axis?
                    if(lastyCoor < penyCoor){//Down(111)
                        //Keep the same x coor, but larger y coor.
                        //Using penguess, NOT last guess.
                        //Otherwise youre in the same space.
                        sqCoor = `${penxCoor}${yAxis[penyIndex+1]}`;
                    } else {//Up(111)
                        //Keep the same x coor, but smaller y coor.
                        //Use pen guess NOT last guess
                        sqCoor = `${penxCoor}${yAxis[penyIndex-1]}`;
                    }
                } else {//No (109)
                    //Last guess and pen guess had the same y coor.
                    //Should I go up or down the x-axis?
                    if(lastxCoor < penxCoor){//Up/right (122)
                        //Keep the same y coor, but larger x coor.
                        //Use pen guess NOT last guess.
                        sqCoor = `${xAxis[penxIndex+1]}${penyCoor}`;
                    }else{//Down/left (122)
                        //Keep the same y coor, but smaller x coor.
                        //Use pen guess NOT last guess.
                        sqCoor = `${xAxis[penxIndex-1]}${penyCoor}`;
                    }
                }
            }
        } else { // No (102)
            //Check if pro guess hit
            if(proStatus == true){//Yes (133)
                //Does last guess and pen guess share the same x coor?
                if(lastxCoor == penxCoor){//Yes (135)
                    //Then we know pro guess also shares the same x coor.
                    //So we want to a higher or lower x coor, with pro guess y coor.
                    sqCoor = `${xAxis[lastxCoor+1]}${proxCoor}`;
                } else {//No (135)
                    //Then we know pro guess also shares the same y coor.
                    //So we want a higher or lower y coor, with pro guess x coor.
                    sqCoor = `${proxCoor}${yAxis[proxIndex+1]}`;
                }
            } else {//No (133)
                //Check if pen guess and pro guess have same the x coor
                if(penxCoor == proxCoor){//Yes (144)
                    //Then we know that there is an attempted square between pen and pro guess on the y-axis.
                    //If the square to the left/right of last guess is attempted, or hit, then we need to try two squares to the left/right.
                    if($(`#${whichBoard} .${xAxis[lastxIndex+1]}${yAxis[lastyIndex]}`).hasClass("attempted")){
                        sqCoor = `${xAxis[lastxIndex-2]}${yIndex[lastyIndex]}`
                    }
                    if($(`#${whichBoard} .${xAxis[lastxIndex-1]}${yAxis[lastyIndex]}`).hasClass("attempted")){
                        sqCoor = `${xAxis[lastxIndex-2]}${yAxis[lastyIndex]}`
                    }
                } else {//No(144)
                    //Then we know that there is an attempted square between pro and pro guess on the x-axis.
                    //If the square to the up/down of last guess is attempted, or hit, then we need to try two squares up/down.
                    if($(`#${whichBoard} .${xAxis[lastxIndex]}${yAxis[lastyIndex+1]}`).hasClass("attempted")){
                        sqCoor = `${xAxis[lastxIndex]}${yAxis[lastyIndex-2]}`
                    }
                    if($(`#${whichBoard} .${xAxis[lastxIndex]}${yAxis[lastyIndex-1]}`).hasClass("attempted")){
                        sqCoor = `${xAxis[lastxIndex]}${yAxis[lastyIndex+2]}`
                    }
                }
            }
        }
    }
    }
}
return sqCoor, whichBoard;
        }
}    
    
    

function finishGame(){
    console.log("game over");
};


$(document).ready(function(){
    welcomeFunction();
    $("#new-game-btn").click(newScreen);
    $("#orientation-btn").click(changeOrientation);
    $(".game-square").mouseenter(findCoordinate);
    $(".game-square").mouseenter(showCoordinates);
    $(".game-square").mouseleave(unshowCoordinates);
    $("#ready-btn").click(beginGame);
    
});







    



