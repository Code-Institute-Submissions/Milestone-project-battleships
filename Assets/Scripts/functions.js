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
        }) ;
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
                $("#battleship").addClass("placed");
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
        }) ;
    }
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


//This function checks if selected square is occupied or not.
$("#play-btn").click(newScreen);
    



