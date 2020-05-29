function checkReadyStatus(){
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
    if(aircraftReady == true && battleshipReady == true && submarineReady == true && destroyerReady == true && patrolboat == true){
        console.log("All ships deployed");
        readyStatus == true;
        return readyStatus;
    } else {
        console.log("Please place all your ships before starting")\
        readyStatus == false;
        return readyStatus;
    }
}
$("#message-panel-1 p").html("Please place your ships before starting")