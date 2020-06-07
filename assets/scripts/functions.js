var shipList = [["aircc","Aircraft Carrier",5],["btsp","Battleship",4],["sub","Submarine",3],["dest","Destroyer",3],["pboat","Patrol Boat",2]];
var deployedList = [];
var oppsShips = [["aircc",5],["btsp",4],["sub",3],["dest",3],["pboat",2]];
var usersShips = [["aircc",5],["btsp",4],["sub",3],["dest",3],["pboat",2]];
var xAxis = ["A","B","C","D","E","F","G","H","I","J"];
var yAxis = ["1","2","3","4","5","6","7","8","9","10"];
var attemptedGuesses = [];
//Is this necessary as I also have 'newScreen()'

function newScreen(){
    //This clears the squares, providing a new board to play upon
    $(".game-square").removeClass("occupied").removeClass("hit").removeClass("sunk").removeClass("miss");
    for(i=0;i<shipList.length;i++){
        $(".game-square").removeClass(`${shipList[i][0]}`);
    }
    deployedList = [];
    $("#arsenal tr").removeClass("placed");
    //This variable will tell some functions if ships are being deployed or not;
    $(".board-label").fadeTo("slow",1);
    window.placementPhase = true;
    do{
        //User is prompted to start placing their ships
        bannerModal("Please place your ships.","Select a ship from the arsenal");
        arsenalModal();
        //If user clicks on the arsenal table, it will run function selectShip
        $("#aircc").click(selectShip);
        $("#btsp").click(selectShip);
        $("#sub").click(selectShip);
        $("#dest").click(selectShip);
        $("#pboat").click(selectShip);
        $("#user-game-board .game-square").click(placeShip);
        return;
    } while(placementPhase == true);
    
    
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
        bannerModal(`${shipSelected} has already been deployed`,`Please select another ship`);
        
    } else{
        bannerModal(`Deploying ${shipSelected}`,`Ship length: ${shipLength} Units`);
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
    window.whichBoard = this.parentElement.parentElement.parentElement.id;
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
            }
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
    window.xCoor = startingCoor[0];
    if(startingCoor.length == 3){
        window.yCoor = `${startingCoor[1]}${startingCoor[2]}`;
    } else {
        yCoor = startingCoor[1];
    }
    var xIndex = xAxis.indexOf(xCoor);
    var yIndex = yAxis.indexOf(yCoor);
    window.newCoor = [];
    if(checkOrientation() == true){
        //This function takes the coordinates provided by calculateShipCoor and checks if it flows over the boundaries of the map.
        //If the choosen square is too close to the boundaries, this function will move the ship so that it fits in the map.
        if((yIndex+shipLength)>yAxis.length){
            window.diff = (yIndex+shipLength)-yAxis.length;
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
            diff = (xIndex+shipLength)-xAxis.length;
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
            var getClasses = $(`#${whichBoard} .${overlapSquare}`).attr("class").split(" ");
            //I want to find the shipID, which will be the third class.
            occupyingShipId = getClasses[3];
            for(i=0;i<shipList.length;i++){
                if(occupyingShipId == shipList[i][0]){
                    occupyingShip = shipList[i][1];
                }
            }
            bannerModal(`${occupyingShip} is occupying square ${overlapSquare}`,`Please place your ship in another square`);

            return;
        } else {
            overlapStatus = false;
        }
    }
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
    var duplicateStatus;
    if($(`#${shipId}`).hasClass("placed")){
        duplicateStatus = true;
    } else {
        duplicateStatus = false;
    }
    return duplicateStatus;
}
//This function checks if the user wants to place their ship vertically or horizontally
function checkOrientation(){
    if($("#orientation-btn").hasClass("vertical")){
        verticalStatus = true;
    } else {
        verticalStatus = false;
    }
    return verticalStatus;
}
//This function controls the 'Orientation Button'. Clicking toggles the status of vertically or horizontally.
function changeOrientation(){
        if($("#orientation-btn").hasClass("vertical")){
            $("#orientation-btn").removeClass("vertical");
            orientationModal();
            $("#orientation-message-panel").html("Orientation is set to horizontal");
            $("#orientation-btn i").removeClass("fa-arrow-alt-circle-down").addClass("fa-arrow-alt-circle-right");
        } else {
            $("#orientation-btn").addClass("vertical");
            orientationModal();
            $("#orientation-message-panel").html("Orientation is set to vertical");
            $("#orientation-btn i").removeClass("fa-arrow-alt-circle-right").addClass("fa-arrow-alt-circle-down");
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
            }
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
            bannerModal(`${shipSelected} Removed`,`Please select where to redeploy ship`);
            $(`#arsenal #${shipId} td:nth-child(2)`).text(`${shipLength} Spaces`);
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
                    console.log("Cannot place ship");
                    return;
                } else{
                    for(i=0;i<newCoor.length;i++){
                        var currentCoor = newCoor[i];
                        $(`#user-game-board .${currentCoor}`).addClass(`occupied ${shipId}`);
                    }
                    $(`#${shipId}`).addClass("placed");
                    $(`#arsenal #${shipId} td:nth-child(2)`).text("Deployed");
                    deployedList.push(shipId);
                    bannerModal(`${shipSelected} deployed`,`Please select another ship`);
                    if(deployedList.length == 5){
                        bannerModal("All ships deployed.",`Press 'Ready' to begin the game.`);
                        readyStatus = true;
                    }
                    shipLength = 1;
                    return;
                }
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
        var arsenal = document.getElementById("arsenal-modal");
        arsenal.style.animationName = "animateright";
        getOpponentCoordinates();
        window.placementPhase = false;
        bannerModal("Your opponent is ready","Your turn. Play your first move.");
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
}
//Retrieving Opponent's Coordinates
// This function retrieves a new set of coordinates, and places ships in the opponent's grid
function getOpponentCoordinates(){
    var opponentShipsPlaced = false;
    $.get("assets/coordinates/board-1.txt",function(rawCoor){
            var oppCoor = rawCoor.split(/\n/g);
            var ACCoor = oppCoor[0].split(",");
            for(i=0;i<ACCoor.length;i++){
            window.currentCoor = ACCoor[i];
            $(`#opp-game-board .${currentCoor}`).addClass("occupied aircc");
            }
            var BSCoor = oppCoor[1].split(",");
            for(i=0;i<BSCoor.length;i++){
            currentCoor = BSCoor[i];
            $(`#opp-game-board .${currentCoor}`).addClass("occupied btsp");
            }
            var SubCoor = oppCoor[2].split(",");
            for(i=0;i<SubCoor.length;i++){
            currentCoor = SubCoor[i];
            $(`#opp-game-board .${currentCoor}`).addClass("occupied sub");
            }
            var DesCoor = oppCoor[3].split(",");
            for(i=0;i<DesCoor.length;i++){
            currentCoor = DesCoor[i];
            $(`#opp-game-board .${currentCoor}`).addClass("occupied dest");
            }
            var PBCoor = oppCoor[4].split(",");
            for(i=0;i<PBCoor.length;i++){
            currentCoor = PBCoor[i];
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
            } while(j<deployedList.length);
            yetToBeDeployed.push(shipList[i][1]);
            i++;
            j=0;
            
        }
        readyStatus = false;
        bannerModal("Please place all your ships before starting",`${yetToBeDeployed[0]} must still be deployed.`);
    }
    return readyStatus;
}
function userMakeGuess(){
    if(userTurn == false){
        bannerModal(`Opponent is making a guess.`,`Wait your turn!`);
    } else {
        $("#opp-game-board .game-square").click(findCoordinate);
        if($(`#opp-game-board .${sqCoor}`).hasClass("attempted")){
            bannerModal(`${sqCoor} has already been selected.`,`Please select another square`);
        } else{
            var text1 = `You are checking ${sqCoor}`
            checkOccupiedStatus(sqCoor);
            if(occupiedStatus == true){
                $(`#opp-game-board .${sqCoor}`).removeClass("occupied").addClass("hit attempted");
                var getClasses = $(`#opp-game-board .${sqCoor}`).attr("class").split(" ");
                //I want to find the shipID, which will be the third class.
                occupyingShipId = getClasses[2];
                for(i=0;i<shipList.length;i++){
                    if(occupyingShipId == shipList[i][0]){;
                        occupyingShip = shipList[i][1];
                        text2 = `You hit your opponent's ${occupyingShip}!`;    
                        oppsShips[i][1]--;
                        if(oppsShips[i][1] == 0){
                            text2 = `You sunk your opponent's ${occupyingShip}!`;    
                            $(`#opp-game-board .${occupyingShipId}`).removeClass("hit").addClass("sunk");
                            userShipCount++;
                        }
                    }    
                }
                if(userShipCount == 5){
                    finishGame("You win!",`Turn Count: ${turnCount}`);
                    return;
                }
            } else{
                text2 = `You missed! ${sqCoor} was empty`);
                $(`#opp-game-board .${sqCoor}`).addClass("miss attempted");
            }
            bannerModal(text1,text2);
            userTurn = false;
            turnCount++;
            setTimeout(oppMakeGuess,2500);
        }
        
    }
}
function oppMakeGuess(){
    whichBoard = "user-game-board";
    intelligentGuess();
    checkOccupiedStatus(sqCoor);
    var text1 =`Opponent guessed ${sqCoor}`
    if(occupiedStatus == true){
        $(`#user-game-board .${sqCoor}`).removeClass("occupied").addClass("hit attempted");
        var getClasses = $(`#user-game-board .${sqCoor}`).attr("class").split(" ");
        //I want to find the shipID, which will be the third class.
        occupyingShipId = getClasses[2];
        for(i=0;i<shipList.length;i++){
            if(occupyingShipId == shipList[i][0]){;
                occupyingShip = shipList[i][1];
                text2 = `Your ${occupyingShip} was hit!`;    
                usersShips[i][1]--;
                if(usersShips[i][1] == 0){
                    text2 = `Your ${occupyingShip} was sunk!`;    
                    $(`#opp-game-board .${occupyingShipId}`).removeClass("hit").addClass("sunk");
                    oppsShipCount++;
                }
            }    
        }
        attemptedGuesses.push([sqCoor,occupiedStatus,occupyingShipId]);
        if(oppsShipCount == 5){
            finishGame("You lost!",`Turn Count: ${turnCount}`);
            return;
        }
    } else{
        text2 = `It's a miss! ${sqCoor} was empty`);
        $(`#user-game-board .${sqCoor}`).addClass("miss attempted");
        attemptedGuesses.push([sqCoor,occupiedStatus]);
    }
    bannerModal(text1,text2);
    userTurn = true;
    console.log(`User has sunk ${userShipCount} ships. Opponent has sunk ${oppsShipCount} ships`);
    console.log(attemptedGuesses);
}
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
    window.guessesLength = attemptedGuesses.length;
    console.log(guessesLength);
    window.lastIndex = (guessesLength-1);
    console.log(lastIndex);
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
    window.guessesLength = attemptedGuesses.length;
    console.log(guessesLength);
    window.penIndex = (guessesLength-2);
    console.log(penIndex);
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
    window.guessesLength = attemptedGuesses.length;
    window.proIndex = (guessesLength-3);
        console.log(proIndex);
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
    var xCoor;
    var yCoor;
    if (attemptedGuesses.length == 0){
            getRandomCoordinate();
            console.log("This is my first guess. I will make a random one.")
            return;
    } else {
        if (attemptedGuesses.length == 1){
            getlastCoor();
            //Did our first guess hit?
            if(lastStatus == true){
                console.log("This is my second guess. My first one hit, so I looking in the vicinity.")
                xCoor = xAxis[lastxIndex+1];
                yCoor = lastyCoor;
                if (typeof xCoor === "undefined" || typeof yCoor === "undefined"){
                    getRandomCoordinate();
                    console.log("Coordinates were undefined. I will make a random one.")
                    return;
                } else {
                    sqCoor = `${xCoor}${yCoor}`;
                    console.log(`Come find me ${sqCoor}`);
                    return;
                }
            } else{//No (493)
                getRandomCoordinate();
                console.log("This is my second guess. My first guess missed, so I will make a random one.");
                return;
            }
        } else{
            if(attemptedGuesses.length == 2){
                getlastCoor();
                getpenCoor();
                console.log("This is my third guess.")
                //Did our second guess hit?
                if(lastStatus == true){
                    console.log("My most recent guess hit")
                    //Did our guess sink the ship?
                    //This can only happen to patrol boat, being length of 2.Meaning pen guess had to hit as well.
                    //Did our pen guess hit?
                    if(penStatus == true){//Yes(514)
                        console.log("My guess before that also hit.")
                        for(i=0;i<usersShips.length;i++){
                            if(usersShips[i][0]==attemptedGuesses[lastIndex][2]){
                                checkSunk = usersShips[i][1];
                            }
                        }
                        if(checkSunk == 0){
                            console.log("The ship sunk, so I will make a randon guess next")
                            getRandomCoordinate();
                            return;
                        } else {
                            console.log("The ship didn't sink. So i will keep looking in this area")
                            //Check which axis the hits were on
                            //Are the guesses share the same x coor?
                            if (lastxCoor == penxCoor){//Yes (516)
                                console.log("My last 2 guesses shared an x-coor.")
                                //Are we going up/down the y-axis
                                if(lastyIndex < penyIndex){//Up
                                    //Continue going up the y-axis with the same x coor.
                                    xCoor = lastxCoor;
                                    yCoor = yAxis[lastyIndex-1];
                                    console.log("My last guess is above on the y-axis of the one before.");
                                    if (typeof xCoor === "undefined" || typeof yCoor === "undefined"){
                                        getRandomCoordinate();
                                        console.log("Coordinates were undefined. I will make a random one.")
                                        return;
                                    } else {
                                        sqCoor = `${xCoor}${yCoor}`;
                                        console.log(`Come find me ${sqCoor}`);
                                        return;
                                    }
                                } else {//Down
                                    //Go down the y-axis with the same x coor.
                                    xCoor = lastxCoor;
                                    yCoor = yAxis[lastyIndex+1];
                                    console.log("My last guess is below the one before.");
                                    if (typeof xCoor === "undefined" || typeof yCoor === "undefined"){
                                        getRandomCoordinate();
                                        console.log("Coordinates were undefined. I will make a random one.")
                                        return;
                                    } else {
                                        sqCoor = `${xCoor}${yCoor}`;
                                        console.log(`Come find me ${sqCoor}`);
                                        return;
                                    }
                                }
                            } else {//No (516)
                                //Are we going up/down the x-axis?
                                console.log("My last 2 guesses shared an y-coor.")
                                if(lastxIndex < penxIndex){//Up/left
                                    console.log("My last guess is left the one before.");
                                    //Continue going left on the x-axis with the same y coor.
                                    xCoor = xAxis[lastxIndex-1];
                                    yCoor = lastyCoor;
                                    if (typeof xCoor === "undefined" || typeof yCoor === "undefined"){
                                        getRandomCoordinate();
                                        console.log("Coordinates were undefined. I will make a random one.")
                                        return;
                                    } else {
                                        sqCoor = `${xCoor}${yCoor}`;
                                        console.log(`Come find me ${sqCoor}`);
                                        return;
                                    }
                                } else {//Down/right
                                    console.log("My last guess is right the one before.");
                                    //Continue going right on the x-axis with the same y coor.
                                    xCoor = xAxis[lastxIndex+1];
                                    yCoor = lastyCoor;
                                    if (typeof xCoor === "undefined" || typeof yCoor === "undefined"){
                                        getRandomCoordinate();
                                        console.log("Coordinates were undefined. I will make a random one.")
                                        return;
                                    } else {
                                        sqCoor = `${xCoor}${yCoor}`;
                                        console.log(`Come find me ${sqCoor}`);
                                        return;
                                    }
                                }
                            }
                    
                        }
                    } else {
                        console.log("My guess before that missed.");
                        xCoor = xAxis[lastxIndex+1];
                        yCoor = lastyCoor;
                        if (typeof xCoor === "undefined" || typeof yCoor === "undefined"){
                            getRandomCoordinate();
                            console.log("Coordinates were undefined. I will make a random one.")
                            return;
                        } else {
                            sqCoor = `${xCoor}${yCoor}`;
                            console.log(`Come find me ${sqCoor}`);
                            return;
                        }
                    }
                } else{//No (493)
                    console.log("My most recent guess missed");
                    //Did our first guess hit?
                    if(penStatus == true){//Yes(571)
                        console.log("But my first one hit.");
                        xCoor = xAxis[penxIndex-1];
                        yCoor = penyIndex;
                        if (typeof xCoor === "undefined" || typeof yCoor === "undefined"){
                            getRandomCoordinate();
                            console.log("Coordinates were undefined. I will make a random one.")
                            return;
                        } else {
                            sqCoor = `${xCoor}${yCoor}`;
                            console.log(`Come find me ${sqCoor}`);
                            return;
                        }
                    } else {
                        console.log("Both my previous guesses missed");
                        getRandomCoordinate(); 
                        return;
                    }
                }
            } else {
                console.log("This is my 4th guess");
                getlastCoor();
                getpenCoor();
                getproCoor();
                //Did our last guess hit?
                if (lastStatus == true){ //Yes (4)
                    console.log("My last guess hit.");
                    //Did that ship sink?
                    for(i=0;i<usersShips.length;i++){
                        if(usersShips[i][0]==attemptedGuesses[lastIndex][2]){
                        checkSunk = usersShips[i][1];
                        }
                    }
                    if(checkSunk == 0){//Yes (6)
                        //Random Number
                        console.log("My last guess sunk the ship. I will make a random guess.");
                        getRandomCoordinate();
                        return;
                    } else {//No (6)
                    //Did our pen guess hit?
                        if(penStatus == true){//Yes (10)
                            console.log("My last 2 guesses hit");
                            //Was it the same ship?
                            if(attemptedGuesses[lastIndex][1] == attemptedGuesses[penIndex][1]){//Yes (12)
                                console.log("My last guess hit the same ship as the guess before");
                                //Does the last guess and pen guess share the same x-coor?
                                if (lastxCoor == penxCoor){//Yes (14)
                                    console.log("My last guess has the same x coor as the guess before");
                                    //Should I go up or down the y-axis?
                                    if(lastyIndex < penyIndex){//Down (16)
                                        //Same x coor, larger y coor
                                        console.log("My last 2 guesses have the same x coor, but a smaller y coor");
                                        xCoor = lastxCoor;
                                        yCoor = yAxis[lastyIndex-1];
                                        if (typeof xCoor === "undefined" || typeof yCoor === "undefined"){
                                            getRandomCoordinate();
                                            console.log("Coordinates were undefined. I will make a random one.")
                                            return;
                                        } else {
                                            sqCoor = `${xCoor}${yCoor}`;
                                            console.log(`Come find me ${sqCoor}`);
                                            return;
                                        }
                                    } else {//Up (16)
                                    console.log("My last 2 guesses have the same x coor, but a larger y coor");
                                        //Same x coor, smaller y coor
                                        xCoor = lastxCoor;
                                        yCoor = yAxis[lastyIndex+1];
                                        if (typeof xCoor === "undefined" || typeof yCoor === "undefined"){
                                            getRandomCoordinate();
                                            console.log("Coordinates were undefined. I will make a random one.")
                                            return;
                                        } else {
                                            sqCoor = `${xCoor}${yCoor}`;
                                            console.log(`Come find me ${sqCoor}`);
                                            return;
                                        }
                                    }
                                } else {//No (14)
                                    console.log("My last guess has the same y coor as the guess before");
                                    //Does the last guess and pen guess share the same y-coor?   
                                    if(lastxIndex > penxIndex){//Up/Left (25)
                                        console.log("My last guess has a smaller x coor than the guess before");
                                        //Same y coor, smaller x coor
                                        xCoor = xAxis[lastxIndex-1];
                                        yCoor = lastyCoor;
                                        if (typeof xCoor === "undefined" || typeof yCoor === "undefined"){
                                            getRandomCoordinate();
                                            console.log("Coordinates were undefined. I will make a random one.")
                                            return;
                                        } else {
                                            sqCoor = `${xCoor}${yCoor}`;
                                            console.log(`Come find me ${sqCoor}`);
                                            return;
                                        }
                                    } else {//Down/Right (25)
                                        console.log("My last guess has a larger x coor than the guess before");
                                        //Same y coor, larger x coor
                                        xCoor = xAxis[lastxIndex+1];
                                        yCoor = lastyCoor;
                                        if (typeof xCoor === "undefined" || typeof yCoor === "undefined"){
                                            getRandomCoordinate();
                                            console.log("Coordinates were undefined. I will make a random one.");
                                            return;
                                        } else {
                                            sqCoor = `${xCoor}${yCoor}`;
                                            console.log(`Come find me ${sqCoor}`);
                                            return;
                                        }
                                    }
                                }
                            } else {//No(12)
                                console.log("My last guess hit a different than the guess before");
                                //Did the penguess sink the ship?
                                for(i=0;i<usersShips.length;i++){
                                    if(usersShips[i][0]==attemptedGuesses[penIndex][2])
                                    checkSunk = usersShips[i][1];
                                }
                                if(checkSunk == 0){//Yes (36)
                                    console.log("My penultimate guess hit a different ship, and it sunk.");
                                    //Then ignore penguess, previous ship irrelevant
                                    //I need to search around the area of lastguess.
                                    //Can go x+/-1 or y+/-1. But keep one constant
                                    xCoor = xAxis[lastxIndex-1];
                                    yCoor = lastyCoor;
                                    if (typeof xCoor === "undefined" || typeof yCoor === "undefined"){
                                        getRandomCoordinate();
                                        console.log("Coordinates were undefined. I will make a random one.");
                                        return;
                                    } else {
                                        sqCoor = `${xCoor}${yCoor}`;
                                        console.log(`Come find me ${sqCoor}`);
                                        return;
                                    }
                                } else {//No (36)
                                    //Can this happen?
                                    console.log("I am the diagonal ship problem. My last two guesses hit two different ships.")
                                }
                            }
                        } else {//No (10)
                            console.log("My last guess hit but not the one before");
                            //Did our pro guess hit?
                            if(proStatus == true){//Yes (47)
                                console.log("My last guess hit, the one before didn't, but the one before that did.");
                                //Was it the same ship as lastguess?
                                if(attemptedGuesses[lastIndex][2]==attemptedGuesses[proIndex][2]){//Yes (49)
                                    console.log("My last guess and propenultimate guess hit the same ship");
                                    //Then we want to continue in the same axis trend.
                                    //Does last guess and pro guess share the same x coor?
                                    if (lastxCoor == proxCoor){//Yes (52)
                                        console.log("My last guess and propenultimate guess share the same x coor");
                                        //Should I go up or down?
                                        if(lastyCoor < proyCoor){//Down (54)
                                            console.log("My last guess has a smaller y coor than my propenultimate guess");
                                            //Same x coor, smaller y coor
                                            xCoor = lastxCoor;
                                            yCoor = yAxis[lastyIndex-1];
                                            if (typeof xCoor === "undefined" || typeof yCoor === "undefined"){
                                                getRandomCoordinate();
                                                console.log("Coordinates were undefined. I will make a random one.");
                                                return;
                                            } else {
                                                sqCoor = `${xCoor}${yCoor}`;
                                                console.log(`Come find me ${sqCoor}`);
                                                return;
                                            }
                                        } else {//Up (54)
                                            console.log("My last guess has a larger y coor than my propenultimate guess");
                                            //Same x coor, larger y coor
                                            xCoor = lastxCoor;
                                            yCoor = yAxis[lastyIndex+1];
                                            if (typeof xCoor === "undefined" || typeof yCoor === "undefined"){
                                                getRandomCoordinate();
                                                console.log("Coordinates were undefined. I will make a random one.");
                                                return;
                                            } else {
                                                sqCoor = `${xCoor}${yCoor}`;
                                                console.log(`Come find me ${sqCoor}`);
                                                return;
                                            }
                                        }
                                    } else {//No (52)
                                        console.log("My last guess and propenultimate guess share the same y coor");
                                        //Does the last guess and pro guess share the same y coor?
                                        //Should I go up or down the y axis?
                                        if (lastxCoor < proxCoor){//Down/Right(63)
                                            console.log("My last guess has a smaller x coor than my propenultimate guess");
                                            //Same y coor, larger x coor
                                            xCoor = xAxis[lastxIndex-1];
                                            yCoor = lastyCoor;
                                            if (typeof xCoor === "undefined" || typeof yCoor === "undefined"){
                                                getRandomCoordinate();
                                                console.log("Coordinates were undefined. I will make a random one.");
                                                return;
                                            } else {
                                                sqCoor = `${xCoor}${yCoor}`;
                                                console.log(`Come find me ${sqCoor}`);
                                                return;
                                            }
                                        } else {//Up/left (63)
                                            console.log("My last guess has a larger x coor than my propenultimate guess");
                                            //Same y coor, smaller x coor
                                            xCoor = xAxis[lastxIndex+1];
                                            yCoor = lastyCoor;
                                            if (typeof xCoor === "undefined" || typeof yCoor === "undefined"){
                                                getRandomCoordinate();
                                                console.log("Coordinates were undefined. I will make a random one.");
                                                return;
                                            } else {
                                                sqCoor = `${xCoor}${yCoor}`;
                                                console.log(`Come find me ${sqCoor}`);
                                                return;
                                            }
                                        }
                                    }
                                } else { //No (49)
                                    console.log("My last guess and propenultimate guess hit different ships");
                                    //Then they are different ships. Disregard pro guess.
                                    //Explore around last guess coor.
                                    xCoor = xAxis[lastxIndex-1];
                                    yCoor = lastyCoor;
                                    if (typeof xCoor === "undefined" || typeof yCoor === "undefined"){
                                        getRandomCoordinate();
                                        console.log("Coordinates were undefined. I will make a random one.");
                                        return;
                                    } else {
                                        sqCoor = `${xCoor}${yCoor}`;
                                        console.log(`Come find me ${sqCoor}`);
                                        return;
                                    }
                                }
                            } else {//No (47)
                                console.log("My last guess hit, the two before that didn't.");
                                //Previous two guesses were misses.
                                //Check if penguess x coor share the same pen guess x coor
                                if(penxCoor == proxCoor){//yes (79)
                                    console.log("My pro and penultimate guesses shared the same x coor");
                                    //I know that I have previously attempted the space inbetween with the same x coor. 
                                    //So i want to check lastguessx, but away from pen/pro guess.
                                    //I check if lastguessx is higher or lower
                                    if(lastxCoor > penxCoor){//lgX is larger (83)
                                        console.log("My last guess had a larger x coor than my penultimate. So I want to check the space between");
                                        //So i want to keep the same y coor with a larger x coor.
                                        xCoor = xAxis[lastxIndex+1];
                                        yCoor = lastyCoor;
                                        if (typeof xCoor === "undefined" || typeof yCoor === "undefined"){
                                            getRandomCoordinate();
                                            console.log("Coordinates were undefined. I will make a random one.");
                                            return;
                                        } else {
                                            sqCoor = `${xCoor}${yCoor}`;
                                            console.log(`Come find me ${sqCoor}`);
                                            return;
                                        }
                                    } else {//lgX is smaller (83)
                                        console.log("My last guess had a smaller x coor than my penultimate. So I want to check the space between");
                                        //I want to keep the same y coor but with a smaller x coor.
                                        xCoor = xAxis[lastxIndex-1];
                                        yCoor = lastyCoor;
                                        if (typeof xCoor === "undefined" || typeof yCoor === "undefined"){
                                            getRandomCoordinate();
                                            console.log("Coordinates were undefined. I will make a random one.");
                                            return;
                                        } else {
                                            sqCoor = `${xCoor}${yCoor}`;
                                            console.log(`Come find me ${sqCoor}`);
                                            return;
                                        }
                                    }
                                } else {//No (79)
                                    console.log("My pro and penultimate guesses shared the same y coor");
                                    //Then I keep the same x coor.
                                    //I want to check if lastguessy is higher or lower
                                    if(lastyCoor > penyCoor){//lgY is larger (91)
                                        console.log("My last guess had a larger y coor than my penultimate. So I want to check the space between")
                                        //Same x coor, larger y coor.
                                        xCoor = lastxCoor;
                                        yCoor = yAxis[lastyIndex+1];
                                        if (typeof xCoor === "undefined" || typeof yCoor === "undefined"){
                                            getRandomCoordinate();
                                            console.log("Coordinates were undefined. I will make a random one.");
                                            return;
                                        } else {
                                            sqCoor = `${xCoor}${yCoor}`;
                                            console.log(`Come find me ${sqCoor}`);
                                            return;
                                        }
                                    } else {//Smaller (91)
                                        console.log("My last guess had a smaller x coor than my penultimate. So I want to check the space between");
                                        //Same x coor, smaller y coor.
                                        xCoor = lastxCoor;
                                        yCoor = yAxis[lastyIndex-1];
                                        if (typeof xCoor === "undefined" || typeof yCoor === "undefined"){
                                            getRandomCoordinate();
                                            console.log("Coordinates were undefined. I will make a random one.");
                                            return;
                                        } else {
                                            sqCoor = `${xCoor}${yCoor}`;
                                            console.log(`Come find me ${sqCoor}`);
                                            return;
                                        }
                                    }
                                }
                            }
                        }
                    }
                } else { //No (4)
                    console.log("My last guess did not hit.");
                    //Did our pen guess hit?
                    if(penStatus == true){//Yes (102)
                        console.log("My last guess did not hit, but the one before did.");
                        //Did pen guess sink?
                        for(i=0;i<usersShips.length;i++){
                            if(usersShips[i][0]==attemptedGuesses[penIndex][2])
                            checkSunk = usersShips[i][1];
                        }
                        if(checkSunk == 0){//yes (104)
                            console.log("My penultimate guess sunk the ship, so I will make a random guess");
                            getRandomCoordinate();
                            return;
                        } else {//No (104)
                            console.log("My penultimate guess hit a ship, but it didn't sink");
                            //Did last guess and pen guess share the same x coor?
                            if(lastxCoor == penxCoor){//Yes(109)
                                console.log("My last and penultimate guess share the same x coor");
                                //Should I go up or down the y-axis?
                                if(lastyCoor < penyCoor){//Down(111)
                                    console.log("My last guess has a smaller y coor than my penultimate guess");
                                    //Keep the same x coor, but larger y coor.
                                    //Using penguess, NOT last guess.
                                    //Otherwise youre in the same space.
                                    xCoor = penxCoor;
                                    yCoor = yAxis[penyIndex+1];
                                    if (typeof xCoor === "undefined" || typeof yCoor === "undefined"){
                                        getRandomCoordinate();
                                        console.log("Coordinates were undefined. I will make a random one.");
                                        return;
                                    } else {
                                        sqCoor = `${xCoor}${yCoor}`;
                                        console.log(`Come find me ${sqCoor}`);
                                        return;
                                    }                                    
                                } else {//Up(111)
                                    console.log("My last guess has a larger y coor than my penultimate guess");
                                    //Keep the same x coor, but smaller y coor.
                                    //Use pen guess NOT last guess
                                    xCoor = penxCoor;
                                    yCoor = yAxis[penyIndex-1];
                                    if (typeof xCoor === "undefined" || typeof yCoor === "undefined"){
                                        getRandomCoordinate();
                                        console.log("Coordinates were undefined. I will make a random one.");
                                        return;
                                    } else {
                                        sqCoor = `${xCoor}${yCoor}`;
                                        console.log(`Come find me ${sqCoor}`);
                                        return;
                                    }
                                }
                            } else {//No (109)
                                console.log("My last and penultimate guess share the same y coor");
                                //Last guess and pen guess had the same y coor.
                                //Should I go up or down the x-axis?
                                if(lastxCoor < penxCoor){//Up/right (122)
                                    console.log("My last guess has a smaller y coor than my penultimate guess");
                                    //Keep the same y coor, but larger x coor.
                                    //Use pen guess NOT last guess.
                                    xCoor = xAxis[penxIndex+1];
                                    yCoor = penyCoor;
                                    if (typeof xCoor === "undefined" || typeof yCoor === "undefined"){
                                        getRandomCoordinate();
                                        console.log("Coordinates were undefined. I will make a random one.");
                                        return;
                                    } else {
                                        sqCoor = `${xCoor}${yCoor}`;
                                        console.log(`Come find me ${sqCoor}`);
                                        return;
                                    }
                                }else{//Down/left (122)
                                    console.log("My last guess has a larger y coor than my penultimate guess");
                                    //Keep the same y coor, but smaller x coor.
                                    //Use pen guess NOT last guess.
                                    xCoor = xAxis[penxIndex-1];
                                    yCoor = penyCoor;
                                    if (typeof xCoor === "undefined" || typeof yCoor === "undefined"){
                                        getRandomCoordinate();
                                        console.log("Coordinates were undefined. I will make a random one.");
                                        return;
                                    } else {
                                        sqCoor = `${xCoor}${yCoor}`;
                                        console.log(`Come find me ${sqCoor}`);
                                        return;
                                    }
                                }
                            }
                        }   
                    } else { // No (102)
                        console.log("My last 2 guess did not hit.");
                        //Check if pro guess hit
                        if(proStatus == true){//Yes (133)
                            console.log("My last 2 guess did not hit, but the one before did.");
                            //Does last guess and pen guess share the same x coor?
                            if(lastxCoor == penxCoor){//Yes (135)
                                console.log("My last 2 guess share the same x coor.");
                                //Then we know pro guess also shares the same x coor.
                                //So we want to a higher or lower x coor, with pro guess y coor.
                                xCoor = xAxis[lastxCoor+1];
                                yCoor = proyCoor;
                                if (typeof xCoor === "undefined" || typeof yCoor === "undefined"){
                                    getRandomCoordinate();
                                    console.log("Coordinates were undefined. I will make a random one.");
                                    return;
                                } else {
                                    sqCoor = `${xCoor}${yCoor}`;
                                    console.log(`Come find me ${sqCoor}`);
                                    return;
                                }
                            } else {//No (135)
                                console.log("My last 2 guesses share the same y coor.");
                                //Then we know pro guess also shares the same y coor.
                                //So we want a higher or lower y coor, with pro guess x coor.
                                xCoor = proxCoor;
                                yCoor = yAxis[proyIndex+1];
                                if (typeof xCoor === "undefined" || typeof yCoor === "undefined"){
                                    getRandomCoordinate();
                                    console.log("Coordinates were undefined. I will make a random one.");
                                    return;
                                } else {
                                    sqCoor = `${xCoor}${yCoor}`;
                                    console.log(`Come find me ${sqCoor}`);
                                    return;
                                }
                            }
                        } else {//No (133)
                            console.log("My last 3 guesses did not hit");
                            //Check if any guesses have hit yet.
                            if(attemptedGuesses.length>=4){
                                if(attemptedGuesses[attemptedGuesses.length-4][1]==true){
                                    //Check if pen guess and pro guess have same the x coor
                                    if(penxCoor == proxCoor){//Yes (144)
                                        //Then we know that there is an attempted square between pen and pro guess on the y-axis.
                                        //If the square to the left/right of last guess is attempted, or hit, then we need to try two squares to the left/right.
                                        if($(`#user-game-board .${xAxis[lastxIndex+1]}${lastyCoor}`).hasClass("attempted")){
                                            xCoor = xAxis[lastxIndex+2];
                                            yCoor = lastyCoor;
                                            if (typeof xCoor === "undefined" || typeof yCoor === "undefined"){
                                                getRandomCoordinate();
                                                console.log("Coordinates were undefined. I will make a random one.");
                                                return;
                                            } else {
                                                sqCoor = `${xCoor}${yCoor}`;
                                                console.log(`Come find me ${sqCoor}`);
                                                return;
                                            }
                                        }
                                        if($(`#user-game-board .${xAxis[lastxIndex-1]}${lastyCoor}`).hasClass("attempted")){
                                            xCoor = xAxis[lastxIndex-2];
                                            yCoor = lastyCoor;
                                            if (typeof xCoor === "undefined" || typeof yCoor === "undefined"){
                                                getRandomCoordinate();
                                                console.log("Coordinates were undefined. I will make a random one.");
                                                return;
                                            } else {
                                                sqCoor = `${xCoor}${yCoor}`;
                                                console.log(`Come find me ${sqCoor}`);
                                                return;
                                            }
                                        }
                                    } else {//No(144)
                                        //Then we know that there is an attempted square between pro and pro guess on the x-axis.
                                        //If the square to the up/down of last guess is attempted, or hit, then we need to try two squares up/down.
                                        if($(`#user-game-board .${lastxCoor}${yAxis[lastyIndex+1]}`).hasClass("attempted")){
                                            xCoor = lastxCoor;
                                            yCoor = yAxis[lastyIndex+2];
                                            if (typeof xCoor === "undefined" || typeof yCoor === "undefined"){
                                                getRandomCoordinate();
                                                console.log("Coordinates were undefined. I will make a random one.");
                                                return;
                                            } else {
                                                sqCoor = `${xCoor}${yCoor}`;
                                                console.log(`Come find me ${sqCoor}`);
                                                return;
                                            }
                                        }
                                        if($(`#user-game-board .${lastxCoor}${yAxis[lastyIndex-1]}`).hasClass("attempted")){
                                            xCoor = lastxCoor;
                                            yCoor = yAxis[lastyIndex-2];
                                            if (typeof xCoor === "undefined" || typeof yCoor === "undefined"){
                                                getRandomCoordinate();
                                                console.log("Coordinates were undefined. I will make a random one.");
                                                return;
                                            } else {
                                                sqCoor = `${xCoor}${yCoor}`;
                                                console.log(`Come find me ${sqCoor}`);
                                                return;
                                            }
                                        }
                                    }
                                } else {
                                console.log("My last 4 guesses did not hit, so I will make a random guess");
                                getRandomCoordinate();
                                return;
                                }
                            } else {
                                console.log("I only made 3 guess. None hit. I will make a random guess");
                                getRandomCoordinate();
                                return;
                            }
                        }
                    }
                }
            }
        }   
    }
    return sqCoor;
}    
//This function will run after the game ends, if either user or the opponent destroys 5 ships.
function finishGame(text1,text2){
    var modal = document.getElementById("endgame-modal");
    $("#modal-container").css("display","block");
    closeBanner();
    if(text1 == "You lost"){
        console.log("You lost")
        $("#endgame-panel-2").css("display","none");
        $("#endgame-panel-3").css("display","none");
    }
    $("#endgame-panel-1 p").text(text1);
    $("#endgame-panel-3 p").text(text2);
    var width = window.innerWidth;
    var modalLeft = (width - 500)/2;
    $("#endgame-modal").css("left", modalLeft);
    modal.style.animationName = "animatetop";
    $(document).keyup(function(e) {
        if (e.keyCode === 27) modal.style.animationName = "animatebottom";
    });
    $(".close-btn").click(function(){
        modal.style.animationName = "animatebottom";
    })
    document.onkeydown=function(event){
        if(event.keyCode == 13)
        {
            enterName();
        }
    }
}
function showEnterMessage(){
    $("#pressEnter").css("opacity","1");
}
function enterName(){
    window.score;
    var userName = $("#userNameInput").val();
    if(userName == ""){
        $("#pressEnter").css("opacity","1");
        $("#pressEnter").text("Please enter a name to submit")
    } else {
        score = `${userName} ${turnCount}`;
        saveScores();
        var modal = document.getElementById("endgame-modal");
        modal.style.animationName = "animatebottom";
        openScores();
    }
}
function saveScores(){
    var i = localStorage.length;
    localStorage.setItem(`${i}`, `${score}`);
}
//This function retrieves the top-10 scores saved in LocalStorage and displays them in '#scores-table'.
function displayScores(){
    totalScores = [];
    if(localStorage.length > 0){
        //Get all the scores saved in LocalStorage
        for(i=0;i<localStorage.length;i++){
            var newValue = localStorage.getItem(`${i}`);
            //Scores are saved as `${userName} ${userScore}`
            var newScores =  newValue.split(" ");
            //Assign values to correct variables
            var userName = newScores[0];
            //Make userScore an integer
            var userScore = parseInt(newScores[1],10);
            //Add variables to totalScores
            totalScores.push([`${userName}`, `${userScore}`]);
        }
        //Sort totalScores in order of turnCount
        totalScores.sort(compareUserScore);
        function compareUserScore(a, b) {
            if (a[1] === b[1]) {
                return 0;
            }
            else {
                //Made this less than because we want userScore in ascending order, not descending
                return (a[1] < b[1]) ? -1 : 1;
            }
        }
        //Fill the scores table with the top 10 scores
        if(totalScores.length >= 10){
            for(i=0;i<10;i++){
                var tableRow = i;
                $(`#scores-table .row${tableRow} .userName`).html(totalScores[i][0]);
                $(`#scores-table .row${tableRow} .userScore`).html(totalScores[i][1]);
            }
        } else { //If we have less than 10 scores, we only fill in the appropriate number of rows.
            for(i=0;i<totalScores.length;i++){
                var tableRow = i;
                $(`#scores-table .row${tableRow} .userName`).html(totalScores[i][0]);
                $(`#scores-table .row${tableRow} .userScore`).html(totalScores[i][1]);

            }
        }
    }
}
function resetScores(){
    var button = document.getElementById("scores-reset-btn")
    $("#scores-reset-btn").mouseenter(function(){
        button.style.animationName = "rotation";
        $("#scores-reset-label").fadeTo( "fast", 1 );
    });
    $("#scores-reset-btn").mouseleave(function(){
        button.style.animationName = "";
        $("#scores-reset-label").fadeTo( "fast", 0 );
    });
    $("#scores-reset-btn").click(function(){
        localStorage.clear();
        for(i=0;i<10;i++){
                var tableRow = i;
                $(`#scores-table .row${tableRow} .userName`).html("");
                $(`#scores-table .row${tableRow} .userScore`).html("");
            }
            $("#scores-reset-label").text("Scores cleared");
    });
}
//This function control the various modals throughout the page.
function openWelcomePage(){
    $("#modal-container").css("display","block");
    $(window).one("click", function() {
        $("#welcome-modal").css("display", "none");
        $("#modal-container").css("display","none");
        bannerModal("Welcome to Battleships!","Press 'New Game' to begin");
    });
    return;
}
function openInstructions(){
    $("#modal-container").css("display","block");
    //Credit belongs to https://www.w3schools.com/howto/howto_css_modals.asp for the creation of this modal.
    var modal = document.getElementById("instr-modal");
    modal.style.display = "block";
    modal.style.animationName = "animatetop";
    $(document).keyup(function(e) {
        if (e.keyCode === 27) modal.style.animationName = "animatebottom";
        setTimeout(function(){
            $("#modal-container").css("display","none");
            modal.style.display = "none";
        },1000);
    });
    $(".close-btn").click(function(){
        modal.style.animationName = "animatebottom";
        setTimeout(function(){
            $("#modal-container").css("display","none");
            modal.style.display = "none";
        },1000);
        
    })
    
}
function openScores(){
    $("#modal-container").css("display","block");
    //Credit belongs to https://www.w3schools.com/howto/howto_css_modals.asp for the creation of this modal.
    var modal = document.getElementById("scores-modal");
    modal.style.display = "block";
    modal.style.animationName = "animatetop";
    $(document).keyup(function(e) {
        if (e.keyCode === 27){
            modal.style.animationName = "animatebottom";
            setTimeout(function(){
                $("#modal-container").css("display","none");
                modal.style.display = "none";
            },1000);
        }    
    });
    $(".close-btn").click(function(){
        modal.style.animationName = "animatebottom";
        setTimeout(function(){
            $("#modal-container").css("display","none");
            modal.style.display = "none";
        },1000);
        
    })
    displayScores();
    resetScores();
}
function bannerModal(text1,text2){
    var modal = document.getElementById("banner-modal");
    console.log("opened modal");
    modal.style.animationName = "animateleft";
    $("#modal-panel-1 p").text(text1);
    $("#modal-panel-2 p").text(text2);
    /*window.onclick = function(event) {
        if (event.target == modal) {
            console.log("Clicked it");
            modal.style.display = "none";
        }
    }*/
}
function closeBanner(){
    var modal = document.getElementById("banner-modal");
    modal.style.animationName = "animateright";
    
}
function arsenalModal(){
    var modal = document.getElementById("arsenal-modal");
    modal.style.animationName = "animateleft"
}
function orientationModal(){
    var modal = document.getElementById("orientation-modal");
    modal.style.animationName = "animateleft";
    setTimeout(function(){
        modal.style.animationName = "animateright";
    },3000);
} 



$(document).ready(function(){
    openWelcomePage();
    window.verticalStatus = true
    //sizeBoard();
    var screenWidth = window.innerWidth;
    window.totalScores = [];
    if (screenWidth < 1024){
        $("#orientation-btn i").removeClass("fa-2x").addClass("fa-lg")  
    }
    $("#new-game-btn").click(newScreen);
    $("#orientation-btn").click(changeOrientation);
    $(".game-square").mouseenter(findCoordinate);
    $(".game-square").mouseenter(showCoordinates);
    $(".game-square").mouseleave(unshowCoordinates);
    $("#ready-btn").click(beginGame);
    $("#new-game-btn").mouseenter(function(){
        $("#new-game-btn .label-container p").fadeTo( "fast", 1 );
        $("#new-game-btn .fa").removeClass("fa-play-circle-o").addClass("fa-play-circle");
    });
    $("#new-game-btn").mouseleave(function(){
        $("#new-game-btn .label-container p").fadeTo( "fast", 0 );
        $("#new-game-btn .fa").removeClass("fa-play-circle").addClass("fa-play-circle-o");
    });
    $("#ready-btn").mouseenter(function(){
        $("#ready-btn .label-container p").fadeTo( "fast", 1 );
        $("#ready-btn .fa").removeClass("fa-check-circle-o").addClass("fa-check-circle");
    });
    $("#ready-btn").mouseleave(function(){
        $("#ready-btn .label-container p").fadeTo( "fast", 0 );
        $("#ready-btn .fa").removeClass("fa-check-circle").addClass("fa-check-circle-o");
    });
    $("#orientation-btn").mouseenter(function(){
        $("#orientation-label").fadeTo( "fast", 1 );
        $("#orientation-btn i").removeClass("far").addClass("fas");
    });
    $("#orientation-btn").mouseleave(function(){
        $("#orientation-label").fadeTo( "fast", 0 );
        $("#orientation-btn i").removeClass("fas").addClass("far");
    });
    $("#instr-btn").mouseenter(function(){
        $("#instr-btn .label-container p").fadeTo( "fast", 1 );
        $("#instr-btn i").removeClass("fa-book").addClass("fa-book-open");
    });
    $("#instr-btn").mouseleave(function(){
        $("#instr-btn .label-container p").fadeTo( "fast", 0 );
        $("#instr-btn .i").removeClass("fa-book-open").addClass("fa-book");
    });
    $("#scores-btn").mouseenter(function(){
        $("#scores-btn .label-container p").fadeTo( "fast", 1 );
        $("#scores-btn i").removeClass("fa-star-o").addClass("fa-star");
    });
    $("#scores-btn").mouseleave(function(){
        $("#scores-btn .label-container p").fadeTo( "fast", 0 );
        $("#scores-btn i").removeClass("fa-star").addClass("fa-star-o");
    });
    $(".close-btn").mouseenter(function(){
        $(".close-btn i").removeClass("far").addClass("fas");
    });
    $(".close-btn").mouseleave(function(){
        $(".close-btn i").removeClass("fas").addClass("far");
    });
    $("#instr-btn").click(openInstructions);
    $("#scores-btn").click(openScores);

});
