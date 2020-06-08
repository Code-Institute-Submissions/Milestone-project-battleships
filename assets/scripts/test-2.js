if (typeof xCoor === "undefined" || typeof yCoor === "undefined"){
    do{
        getRandomCoordinate();
        console.log("Coordinates were undefined. I will make a random one.");
    }while($(`#user-game-board .${sqCoor}`).hasClass("attempted"));
    return;
}