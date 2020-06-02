} else {
        //lastIndex is the most recent guess made by opponent
        var lastIndex = attemptedGuesses.length-1;
        //lastGuess is the coordinates string of the most recent guess
        var lastGuess = attemptedGuesses[lastIndex][0];
        //var xIndex = xAxis.indexOf(lastGuess[i]);
        var lastXCoor = lastGuess[0]
        //If lastGuess.length is 3, then y Coordinate == '10'.
        if(lastGuess.length == 3){
            var lastyCoor = `${lastGuess[1]}${lastGuess[2]}`;
        } else {
            var lastyCoor = lastGuess[1];
        };
        var lastsqCoor = `${lastxCoor}${lastyCoor}`;
    // penIndex is the penultimate guess made by opponent
    var penIndex = attemptedGuesses.length-2;
    // proIndex is the propenultimate guess made by opponent
    var proIndex = attemptedGuesses.length-3;
    }

} else {
    //lastIndex is the most recent guess made by opponent
    var lastIndex = attemptedGuesses.length-1;
    console.log(`Finding last index: ${lastIndex}`);
    getlastCoor();
    // penIndex is the penultimate guess made by opponent
    var penIndex = attemptedGuesses.length-2;
    console.log(`Finding penultimate index: ${penIndex}`);
    getpenCoor();
    // proIndex is the propenultimate guess made by opponent
    var proIndex = attemptedGuesses.length-3;
    console.log(`Finding propenultimate index: ${proIndex}`);
    getproCoor();
    //Check the last guess if 'hit' or 'miss'
    console.log("Check is last guessing was 'hit' or 'miss'");
    if(attemptedGuesses[lastIndex][1]==true){
        console.log("Last guess was 'hit'. Check if last guess sunk the ship");
        //Check if the previous guess sunk the ship
        for(i=0;i<usersShips.length;i++){
            if(usersShips[i][0]==attemptedGuesses[lastIndex][2]){
                console.log(`Comparing ${attemptedGuesses[lastIndex][2]} health against ${usersShips[i][0]}`);
                //If ship was sunk, get a random coordinate
                if(usersShips[i][1]==0){
                    console.log(`${attemptedGuesses[lastIndex][2]} was sunk. Getting random coordinate.`)
                    getRandomCoordinate();
                    console.log(`Random coordinate: ${sqCoor}`);
                    return sqCoor;
                } else {
                    //Ship was not sunk. Check penultimate guess 
                    console.log(`${attemptedGuesses[lastIndex][2]} was NOT sunk.`);
                    //We have our previous guess. Should we try the adjacent x-axis or y-axis square?
                    //Check if penultimate guess was a 'hit'
                    if(attemptedGuesses[penIndex][1]==true){
                        //Pen guess was successful. Check if it part of the same ship
                        if(attemptedGuesses[lastIndex][2]==attemptedGuesses[penIndex][2]){
                            //It is the same ship. Should follow the axis trend.
                            //Get penultimate guess to compare.
                            //Compare penIndex to lastIndex
                            if(penxIndex==lastxIndex){
                                //Trend is y-axis. Determine if heading up or down.
                                if(penyIndex>lastyIndex){
                                    //Trend is heading up the y-axis
                                    //So next guess should be heading further up the y-axis
                                    yIndex = lastyIndex--;
                                    //If yIndex = 0, the next guess cannot be higher up the y-axis, therefore the next guess should be in the opposite direction.
                                    //The next guess cannot be in a square already guessed, so the propenultimate guess should be taken as the last guess.
                                    if(yIndex == 0){
                                        yIndex = proyIndex++;
                                    }
                                    yCoor = yAxis[yIndex];
                                    xIndex = lastxIndex;
                                    xCoor = xAxis[xIndex]
                                    sqCoor = `${xCoor}${yCoor}`;
                                    return sqCoor;
                                } else {
                                    //Trend is heading down the y-axis
                                    //So next guess should be heading further down the y-axis
                                    yIndex = lastxIndex++;
                                    //If yIndex = 9, the next guess cannot be lower down the y-axis, therefore the next guess should be in the opposite direction.
                                    //The next guess cannot be in a square already guessed, so the propenultimate guess should be taken as the last guess.
                                    if(yIndex == 0){
                                        yIndex = proyIndex--;
                                    }
                                    yCoor = yAxis[yIndex];
                                    xIndex = lastxIndex;
                                    xCoor = xAxis[xIndex]
                                    sqCoor = `${xCoor}${yCoor}`;
                                    return sqCoor;
                                }
                            }else{
                                //Trend is x-axis. Determine if heading up or down.
                                if(penxIndex>lastxIndex){
                                    //Trend is heading up the x-axis
                                    //So next guess should be heading further up the x-axis
                                    xIndex = lastxIndex--;
                                    //If xIndex = 0, the next guess cannot be higher up the x-axis, therefore the next guess should be in the opposite direction.
                                    //The next guess cannot be in a square already guessed, so the propenultimate guess should be taken as the last guess.
                                    if(xIndex == 0){
                                        xIndex = proxIndex++;
                                    }
                                    xCoor = xAxis[xIndex];
                                    yIndex = lastyIndex;
                                    yCoor = yAxis[yIndex]
                                    sqCoor = `${xCoor}${yCoor}`;
                                    return sqCoor;
                                } else {
                                    //Trend is heading down the x-axis
                                    //So next guess should be heading further down the x-axis
                                    xIndex = lastxIndex++;
                                    //If xIndex = 0, the next guess cannot be higher up the x-axis, therefore the next guess should be in the opposite direction.
                                    //The next guess cannot be in a square already guessed, so the propenultimate guess should be taken as the last guess.
                                    if(xIndex == 0){
                                        xIndex = proxIndex--;
                                    }
                                    xCoor = xAxis[xIndex];
                                    yIndex = lastyIndex;
                                    yCoor = yAxis[yIndex]
                                    sqCoor = `${xCoor}${yCoor}`;
                                    return sqCoor;
                                }
                            }
                        } else { //It was a different ship. Should take no account of this guess.

                        }
                    } else {

                    }
                }
            } else {

            }
        }
    } else {
        //If last guess guess was a miss, check the penultimate guess

    }
}

function getlastCoor (){
    var lastIndex = attemptedGuesses.length-1;
    window.lastsqCoor = attemptedGuesses[lastIndex][0];
    window.lastStatus = attemptedGuesses[lastIndex][1];
    window.lastxCoor = lastsqCoor[0];
    window.lastxIndex = xAxis.indexOf(lastxCoor);
    if(lastsqCoor.length == 3){
        window.lastyCoor = `${lastsqCoor[1]}${lastsqCoor[2]}`;
    } else {
        window.lastyCoor = lastsqCoor[1];
    }
    window.lastyIndex = yAxis.indexOf(lastyCoor);    
}
function getpenCoor (){
    var penIndex = attemptedGuesses.length-2;
    window.pensqCoor = attemptedGuesses[penIndex][0];
    window.penStatus = attemptedGuesses[penIndex][1]
    window.penxCoor = pensqCoor[0];
    window.penxIndex = xAxis.indexOf(penxCoor);
    if(pensqCoor.length == 3){
        window.penyCoor = `${pensqCoor[1]}${pensqCoor[2]}`;
    } else {
        window.penyCoor = pensqCoor[1];
    }
    window.penyIndex = yAxis.indexOf(penyCoor);    
}
function getproCoor (){
    var proIndex = attemptedGuesses.length-3
    window.prosqCoor = attemptedGuesses[proIndex][0];
    window.proStatus = attemptedGuesses[proIndex][1]
    window.proxCoor = prosqCoor[0];
    window.proxIndex = xAxis.indexOf(proxCoor);
    if(prosqCoor.length == 3){
        window.proyCoor = `${prosqCoor[1]}${prosqCoor[2]}`;
    } else {
        window.proyCoor = prosqCoor[1];
    }
    window.proyIndex = yAxis.indexOf(proyCoor);    
}