function placeAircraftCarrier(){
    var spacesRemaining = shipLength;
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