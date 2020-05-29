function placeAircraftCarrier(){
    var spacesRemaining = 5;
    if($(this).hasClass("placed")){
        $("#message-panel-1 p").html(`You have already placed the Aircraft Carrier`);
        $("#message-panel-2 p").html(`Please select another ship`);
    } else{
        $("#message-panel-1 p").html(`You have selected the Aircraft Carrier`);
        $("#message-panel-2 p").html(`Spaces remaining:${spacesRemaining}`);
        $(".game-square").click(checkOccupiedSquare);
    }
}