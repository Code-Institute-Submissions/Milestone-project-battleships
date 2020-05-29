var shipSelection = [["Aircraft Carrier",5],["Battleship",4],["Submarine",3],["Destroyer",3],["Patrol Boat",2]];

var newScreen = function(){
    //This clears the squares, providing a new board to play upon
    $(".game-square").removeClass("occupied");
    $("#arsenal tr").removeClass("placed");
    console.log("Screen cleared");
    //User is prompted to start placing their ships
    $("#message-panel-1 p").html("Please place your ships");
    $("#message-panel-2 p").html("Select a ship");
    //If user clicks on the arsenal table, it will run function shipSelector
    $("#aircraftcarrier").click(placeAircraftCarrier);
    $("#battleship").click(placeBattleship);
    $("#submarine").click(placeSubmarine);
    $("#destroyer").click(placeDestroyer);
    $("#patrolboat").click(placePatrolBoat);
    

}
//This function allows the user to place a selected ship.
function placeAircraftCarrier(){
    var shipSelected = "Aircraft Carrier";
    var spacesRemaining = 5;
    if($(this).hasClass("placed")){
        $("#message-panel-1 p").html(`You have already placed the ${shipSelected}`);
        $("#message-panel-2 p").html(`Please select another ship`);
    } else{
        $("#message-panel-1 p").html(`You have selected the ${shipSelected}`);
        $("#message-panel-2 p").html(`Spaces remaining:${spacesRemaining}`);
        $(".game-square").click(function(){
            if(spacesRemaining > 0){
                if($(this).hasClass("occupied")){
                    $("#message-panel-2 p").html("This square is occupied. Please select another");
                } else{
                    $(this).addClass("occupied");
                    spacesRemaining--;
                    $("#message-panel-2 p").html(`Spaces remaining:${spacesRemaining}`);
                }
            } else {
                $("#message-panel-2 p").html("Select another ship");
                $("#aircraftcarrier").addClass("placed");
            }
            
        }); 
    }
}
function placeBattleship(){
    var shipSelected = "Battleship";
    var spacesRemaining = 4;
    if($(this).hasClass("placed")){
        $("#message-panel-1 p").html(`You have already placed the ${shipSelected}`);
        $("#message-panel-2 p").html(`Please select another ship`);
    } else{
        $("#message-panel-1 p").html(`You have selected the ${shipSelected}`);
        $("#message-panel-2 p").html(`Spaces remaining:${spacesRemaining}`);
        $(".game-square").click(function(){
            if(spacesRemaining > 0){
                if($(this).hasClass("occupied")){
                    $("#message-panel-2 p").html("This square is occupied. Please select another");
                } else{
                    $(this).addClass("occupied");
                    spacesRemaining--;
                    $("#message-panel-2 p").html(`Spaces remaining:${spacesRemaining}`);
                }
            } else {
                $("#message-panel-2 p").html("Select another ship");
                $("#battleship").addClass("placed");
            }
        }) ;
    }
}
function placeSubmarine(){
    var shipSelected = "Submarine";
    var spacesRemaining = 3;
    if($(this).hasClass("placed")){
        $("#message-panel-1 p").html(`You have already placed the ${shipSelected}`);
        $("#message-panel-2 p").html(`Please select another ship`);
    } else{
        $("#message-panel-1 p").html(`You have selected the ${shipSelected}`);
        $("#message-panel-2 p").html(`Spaces remaining:${spacesRemaining}`);
        $(".game-square").click(function(){
            if(spacesRemaining > 0){
                if($(this).hasClass("occupied")){
                    $("#message-panel-2 p").html("This square is occupied. Please select another");
                } else{
                    $(this).addClass("occupied");
                    spacesRemaining--;
                    $("#message-panel-2 p").html(`Spaces remaining:${spacesRemaining}`);
                }
            } else {
                $("#message-panel-2 p").html("Select another ship");
                $("#submarine").addClass("placed");
            }
        }) ;
    }
}
function placeDestroyer(){
    var shipSelected = "Destroyer";
    var spacesRemaining = 3;
    if($(this).hasClass("placed")){
        $("#message-panel-1 p").html(`You have already placed the ${shipSelected}`);
        $("#message-panel-2 p").html(`Please select another ship`);
    } else{
        $("#message-panel-1 p").html(`You have selected the ${shipSelected}`);
        $("#message-panel-2 p").html(`Spaces remaining:${spacesRemaining}`);
        $(".game-square").click(function(){
            if(spacesRemaining > 0){
                if($(this).hasClass("occupied")){
                    $("#message-panel-2 p").html("This square is occupied. Please select another");
                } else{
                    $(this).addClass("occupied");
                    spacesRemaining--;
                    $("#message-panel-2 p").html(`Spaces remaining:${spacesRemaining}`);
                }
            } else {
                $("#message-panel-2 p").html("Select another ship");
                $("#destroyer").addClass("placed");
            }
        }) ;
    }
}
function placePatrolBoat(){
    var shipSelected = "Patrol Boat";
    var spacesRemaining = 2;
    if($(this).hasClass("placed")){
        $("#message-panel-1 p").html(`You have already placed the ${shipSelected}`);
        $("#message-panel-2 p").html(`Please select another ship`);
    } else{
        $("#message-panel-1 p").html(`You have selected the ${shipSelected}`);
        $("#message-panel-2 p").html(`Spaces remaining:${spacesRemaining}`);
        $(".game-square").click(function(){
            if(spacesRemaining > 0){
                if($(this).hasClass("occupied")){
                    $("#message-panel-2 p").html("This square is occupied. Please select another");
                } else{
                    $(this).addClass("occupied");
                    spacesRemaining--;
                    $("#message-panel-2 p").html(`Spaces remaining:${spacesRemaining}`);
                }
            } else {
                $("#message-panel-2 p").html("Select another ship");
                $("#patrolboat").addClass("placed");
            }
        });
    }
}
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
function checkReadyStatus(readyStatus){
    var readyStatus
    var aircraftReady;
    var battleshipReady;
    var submarineReady;
    var destroyerReady;
    var patrolboatReady;
    if($("#aircraftcarrier").hasClass("placed")){
        aircraftReady = true;
        console.log("Aircraft Carrier Ready");
    } else {
        aircraftReady = false;
        console.log("Please deploy your Aircraft Carrier");
    }
    if($("#battleship").hasClass("placed")){
        battleshipReady = true;
        console.log("Battleship Ready");
    } else {
        battleshipReady = false;
        console.log("Please deploy your Battleship");
    }
    if($("#submarine").hasClass("placed")){
        submarineReady = true;
        console.log("Submarine Ready");
    } else {
        submarineReady = false;
        console.log("Please deploy your Submarine");
    }
    if($("#destroyer").hasClass("placed")){
        destroyerReady = true;
        console.log("Destroyer Ready");
    } else {
        destroyerReady = false;
        console.log("Please deploy your Destroyer");
    }
    if($("#patrolboat").hasClass("placed")){
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

/*function checkOccupiedSquare(spacesRemaining){
    var spacesRemaining;
            if(spacesRemaining > 0){
                if($(this).hasClass("occupied")){
                    $("#message-panel-2 p").html("This square is occupied. Please select another");
                } else{
                    $(this).addClass("occupied");
                    $("#message-panel-2 p").html(`Spaces remaining:${spacesRemaining}`);
                    spacesRemaining--; 
                }
            } else {
                $("#message-panel-2 p").html("Select another ship");
            }
}*/

$("#new-game-btn").click(newScreen);
$("#ready-btn").click(getOpponentCoordinates);



    



