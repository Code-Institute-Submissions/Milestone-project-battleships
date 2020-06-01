            if (event.shiftKey) { 
                alert ("Shift key is pressed."); 
            } 
            else { 
                alert ("Shift key is not pressed."); 
            }

function changeOrientation(event){
    if (event.shiftKey) {
       if($("#orientation-btn").hasClass("vertical")){
        $("#orientation-btn").removeClass("vertical");
    } else {
        $("#orientation-btn").addClass("vertical");
    } 
    }
    if($("#orientation-btn").hasClass("vertical")){
        $("#orientation-btn").removeClass("vertical");
    } else {
        $("#orientation-btn").addClass("vertical");
    }
}

$("#orientation-btn").addEventListener("click", changeOrientation);
$("#orientation-btn").addEventListener('keypress', changeOrientation);