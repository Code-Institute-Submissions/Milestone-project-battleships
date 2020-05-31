function checkReadyStatus(readyStatus){
    var readyStatus
    var aircraftReady;
    var battleshipReady;
    var submarineReady;
    var destroyerReady;
    var patrolboatReady;
    if($("#aircc").hasClass("placed")){
        aircraftReady = true;
        console.log("Aircraft Carrier Ready");
    } else {
        aircraftReady = false;
        console.log("Please deploy your Aircraft Carrier");
    }
    if($("#btsp").hasClass("placed")){
        battleshipReady = true;
        console.log("Battleship Ready");
    } else {
        battleshipReady = false;
        console.log("Please deploy your Battleship");
    }
    if($("#sub").hasClass("placed")){
        submarineReady = true;
        console.log("Submarine Ready");
    } else {
        submarineReady = false;
        console.log("Please deploy your Submarine");
    }
    if($("#dest").hasClass("placed")){
        destroyerReady = true;
        console.log("Destroyer Ready");
    } else {
        destroyerReady = false;
        console.log("Please deploy your Destroyer");
    }
    if($("#pboat").hasClass("placed")){
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

function checkReadyStatus(){
    if(deployedList.length == 5){
        console.log("All ships deployed");
        readyStatus = true;
    } else {
        console.log("Please place all your ships before starting");
        readyStatus = false;
        var yetToBeDeployed=[];
        while (i < shipList.length){
            var i =0;
            var j = 0;
            if(shipList[i][0]==deployedList[j]){
                i++;
            }
            else{
                j++;
                if(j=deployedList.length){
                    yetToBeDeployed.push(shipList[i][1]);
                    j=0;
                }
            }
            
        }
        console.log(yetToBeDeployed);
    }
}
var toBeDeployedID = shipIdList.filter(x => !deployedList.includes(x));
        for(i=0;i<shipList.length;i++){
            for(j=0;j<toBeDeplo)
            if(shipList[i][0]==toBeDeployed[j])
        }
        
while(i<shipList.length){
    for(j=0;j<deployedList.length;j++){
        if(shipList[i][0]==deployedList[j]){
            i++;
        } else {
            yetToBeDeployed.push(shipList[i][1]);
        }
    }
}
var a = [5],
  count = 5;
var missing = new Array();

for (var i = 1; i <= count; i++) {
  if (a.indexOf(i) == -1) {
    missing.push(i);
  }
}
console.log(missing); // to check the result.