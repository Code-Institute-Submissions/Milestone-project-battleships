var shipSelection = [["Aircraft Carrier",5],["Battleship",4],["Submarine",3],["Destroyer",3],["Patrol Boat",2]];

function placeShips(){
    $("#message-panel-1 p").html("Please select a ship");
    var shipSelected;
    $("#arsenal tr").click(function(){
        shipClicked = $(this).find(">:first-child").html()
        if(shipClicked == "Aircraft Carrier"){
            shipSelected = 0;
        }
        if(shipClicked == "Battleship"){
            shipSelected = 1;
        }
        if(shipClicked == "Submarine"){
            shipSelected = 2;
        }
        if(shipClicked == "Destroyer"){
            shipSelected = 3
        }
        if(shipClicked == "Patrol Boat"){
            shipSelected = 4;
        }
        $("#message-panel-1 p").html(`You have selected the ${shipSelection[shipSelected][0]}`);
        $("#message-panel-2 p").html(`Spaces remaining:${shipSelection[shipSelected][1]}`);
        var spacesRemaining = shipSelection[shipSelected][1];
        $(".game-square").click(function(){
            //if(spacesRemaining >= 1){
                if($(this).hasClass("occupied")){
                    $("#message-panel-2 p").html("This square is occupied. Please select another");
                } else{
                    if(spacesRemaining > 1){
                        $(this).addClass("occupied");
                        spacesRemaining--;
                        $("#message-panel-2 p").html(`Spaces remaining:${spacesRemaining}`);
                        return;
                    } 
                    if(spacesRemaining = 1){
                        $(this).addClass("occupied");
                        spacesRemaining--;
                        $("#message-panel-1 p").html(`${shipSelection[shipSelected][0]} has been placed.`);
                        $("#message-panel-2 p").html("Please select another ship");
                        return;
                    } else{
                        $("#message-panel-2 p").html("Please select another ship");
                        return;
                    }
                }
            //} else {
                
            //}
        })
    })
    
}