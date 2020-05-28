var shipSelection = [["Aircraft Carrier",5],["Battleship",4],["Submarine",3],["Destroyer",3],["Patrol Boat",2]];
var newScreen = function(){
    //This clears the squares, providing a new board to play upon
    $(".game-square").removeClass("occupied");
    console.log("Screen cleared");
    //User is prompted to start placing their ships
    $("#message-panel-1 p").html("Please place your ships");
    $("#message-panel-2 p").html("Select a ship");
    //If user clicks on the arsenal table, it will run function shipSelector
    $("#arsenal tr").click(placeShips);
}
//This function allows the user to place a selected ship.
function placeShips(){
    var shipClicked = $(this).find(">:first-child").html()
        if(shipClicked == "Aircraft Carrier"){
            shipSelected = 0;
            $("#message-panel-1 p").html(`You have selected the ${shipSelection[shipSelected][0]}`);
            $("#message-panel-2 p").html(`Spaces remaining:${shipSelection[shipSelected][1]}`);
        }
        if(shipClicked == "Battleship"){
            shipSelected = 1;
            $("#message-panel-1 p").html(`You have selected the ${shipSelection[shipSelected][0]}`);
            $("#message-panel-2 p").html(`Spaces remaining:${shipSelection[shipSelected][1]}`);
        }
        if(shipClicked == "Submarine"){
            shipSelected = 2;
            $("#message-panel-1 p").html(`You have selected the ${shipSelection[shipSelected][0]}`);
            $("#message-panel-2 p").html(`Spaces remaining:${shipSelection[shipSelected][1]}`);
        }
        if(shipClicked == "Destroyer"){
            shipSelected = 3
            $("#message-panel-1 p").html(`You have selected the ${shipSelection[shipSelected][0]}`);
            $("#message-panel-2 p").html(`Spaces remaining:${shipSelection[shipSelected][1]}`);
        }
        if(shipClicked == "Patrol Boat"){
            shipSelected = 4;
            $("#message-panel-1 p").html(`You have selected the ${shipSelection[shipSelected][0]}`);
            $("#message-panel-2 p").html(`Spaces remaining:${shipSelection[shipSelected][1]}`);
        }
        var spacesRemaining = shipSelection[shipSelected][1];
        $(".game-square").click(function(){
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
        })        
    }




//This function checks if selected square is occupied or not.
$("#play-btn").click(newScreen);
    



