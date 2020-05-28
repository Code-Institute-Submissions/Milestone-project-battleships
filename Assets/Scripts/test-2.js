function checkOccupiedStatus(event){
    if(event.hasClass("occupied")){
        console.log("This space is occupied. Please choose another");
    } else{
        console.log("Space available");
    }
};
$(".game-square").click(checkOccupiedStatus);

        if($(this).hasClass("occupied")){
                    $("#message-panel-2 p").html("This square is occupied. Please select another");
            } else{
                if(spacesRemaining > 1){
                        $(this).addClass("occupied");
                        spacesRemaining--;
                        $("#message-panel-2 p").html(`Spaces remaining:${spacesRemaining}`);
                        return
                    } 
                    if(spacesRemaining = 1){
                        $(this).addClass("occupied");
                        spacesRemaining--;
                        $("#message-panel-1 p").html(`${shipSelection[shipSelected][0]} has been placed.`);
                        $("#message-panel-2 p").html("Please select another ship");
                        return;
                    }
                    if(spacesRemaining=0){
                        $("#message-panel-2 p").html("Please select another ship");
                        return;
                    }
                    
                }

        if(spacesRemaining > 0){
            if($(this).hasClass("occupied")){
                    $("#message-panel-2 p").html("This square is occupied. Please select another");
            } else{
                $(this).addClass("occupied");
                        spacesRemaining--;
                        $("#message-panel-2 p").html(`Spaces remaining:${spacesRemaining}`);
            }
        } else {
            $("#message-panel-2 p").html("Please select another ship");
        }
