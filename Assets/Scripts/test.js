function checkOccupiedStatus(){
    var occupiedStatus;
    getCoordinate();
    console.log(getCoordinate());
    if($(this).hasClass("occupied")){
        occupiedStatus = true;
    } else {
        occupiedStatus = false;
    }
    console.log(occupiedStatus);
}
function getCoordinate(){
    var getClasses = this.className;
    var sqCoor = [getClasses[0],getClasses[1]];
    return sqCoor;
}