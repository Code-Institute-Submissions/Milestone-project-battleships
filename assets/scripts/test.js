function intelligentGuess(){
    var checkSunk;
    var xCoor;
    var yCoor;
    if (attemptedGuesses.length == 0){
            getRandomCoordinate();
            console.log("This is my first guess. I will make a random one.");
            return;
    } else {
        if (attemptedGuesses.length == 1){
            getlastCoor();
            //Did our first guess hit?
            if(lastStatus == true){
                console.log("This is my second guess. My first one hit, so I looking in the vicinity.");
                xCoor = xAxis[lastxIndex+1];
                yCoor = lastyCoor;
                if (typeof xCoor === "undefined" || typeof yCoor === "undefined"){
                    getRandomCoordinate();
                    console.log("Coordinates were undefined. I will make a random one.");
                    return;
                } else {
                    sqCoor = `${xCoor}${yCoor}`;
                    console.log(`Come find me ${sqCoor}`);
                    return;
                }
            } else{//No (493)
                getRandomCoordinate();
                console.log("This is my second guess. My first guess missed, so I will make a random one.");
                return;
            }
        } else{
            if(attemptedGuesses.length == 2){
                getlastCoor();
                getpenCoor();
                console.log("This is my third guess.");
                //Did our second guess hit?
                if(lastStatus == true){
                    console.log("My most recent guess hit");
                    //Did our guess sink the ship?
                    //This can only happen to patrol boat, being length of 2.Meaning pen guess had to hit as well.
                    //Did our pen guess hit?
                    if(penStatus == true){//Yes(514)
                        console.log("My guess before that also hit.");
                        for(i=0;i<usersShips.length;i++){
                            if(usersShips[i][0]==attemptedGuesses[lastIndex][2]){
                                checkSunk = usersShips[i][1];
                            }
                        }
                        if(checkSunk == 0){
                            console.log("The ship sunk, so I will make a randon guess next");
                            getRandomCoordinate();
                            return;
                        } else {
                            console.log("The ship didn't sink. So i will keep looking in this area");
                            //Check which axis the hits were on
                            //Are the guesses share the same x coor?
                            if (lastxCoor == penxCoor){//Yes (516)
                                console.log("My last 2 guesses shared an x-coor.");
                                //Are we going up/down the y-axis
                                if(lastyIndex < penyIndex){//Up
                                    //Continue going up the y-axis with the same x coor.
                                    xCoor = lastxCoor;
                                    yCoor = yAxis[lastyIndex-1];
                                    console.log("My last guess is above on the y-axis of the one before.");
                                    if (typeof xCoor === "undefined" || typeof yCoor === "undefined"){
                                        getRandomCoordinate();
                                        console.log("Coordinates were undefined. I will make a random one.");
                                        return;
                                    } else {
                                        sqCoor = `${xCoor}${yCoor}`;
                                        console.log(`Come find me ${sqCoor}`);
                                        return;
                                    }
                                } else {//Down
                                    //Go down the y-axis with the same x coor.
                                    xCoor = lastxCoor;
                                    yCoor = yAxis[lastyIndex+1];
                                    console.log("My last guess is below the one before.");
                                    if (typeof xCoor === "undefined" || typeof yCoor === "undefined"){
                                        getRandomCoordinate();
                                        console.log("Coordinates were undefined. I will make a random one.");
                                        return;
                                    } else {
                                        sqCoor = `${xCoor}${yCoor}`;
                                        console.log(`Come find me ${sqCoor}`);
                                        return;
                                    }
                                }
                            } else {//No (516)
                                //Are we going up/down the x-axis?
                                console.log("My last 2 guesses shared an y-coor.");
                                if(lastxIndex < penxIndex){//Up/left
                                    console.log("My last guess is left the one before.");
                                    //Continue going left on the x-axis with the same y coor.
                                    xCoor = xAxis[lastxIndex-1];
                                    yCoor = lastyCoor;
                                    if (typeof xCoor === "undefined" || typeof yCoor === "undefined"){
                                        getRandomCoordinate();
                                        console.log("Coordinates were undefined. I will make a random one.");
                                        return;
                                    } else {
                                        sqCoor = `${xCoor}${yCoor}`;
                                        console.log(`Come find me ${sqCoor}`);
                                        return;
                                    }
                                } else {//Down/right
                                    console.log("My last guess is right the one before.");
                                    //Continue going right on the x-axis with the same y coor.
                                    xCoor = xAxis[lastxIndex+1];
                                    yCoor = lastyCoor;
                                    if (typeof xCoor === "undefined" || typeof yCoor === "undefined"){
                                        getRandomCoordinate();
                                        console.log("Coordinates were undefined. I will make a random one.");
                                        return;
                                    } else {
                                        sqCoor = `${xCoor}${yCoor}`;
                                        console.log(`Come find me ${sqCoor}`);
                                        return;
                                    }
                                }
                            }
                    
                        }
                    } else {
                        console.log("My guess before that missed.");
                        xCoor = xAxis[lastxIndex+1];
                        yCoor = lastyCoor;
                        if (typeof xCoor === "undefined" || typeof yCoor === "undefined"){
                            getRandomCoordinate();
                            console.log("Coordinates were undefined. I will make a random one.");
                            return;
                        } else {
                            sqCoor = `${xCoor}${yCoor}`;
                            console.log(`Come find me ${sqCoor}`);
                            return;
                        }
                    }
                } else{//No (493)
                    console.log("My most recent guess missed");
                    //Did our first guess hit?
                    if(penStatus == true){//Yes(571)
                        console.log("But my first one hit.");
                        xCoor = xAxis[penxIndex-1];
                        yCoor = lastyIndex;
                        if (typeof xCoor === "undefined" || typeof yCoor === "undefined"){
                            getRandomCoordinate();
                            console.log("Coordinates were undefined. I will make a random one.");
                            return;
                        } else {
                            sqCoor = `${xCoor}${yCoor}`;
                            console.log(`Come find me ${sqCoor}`);
                            return;
                        }
                    } else {
                        console.log("Both my previous guesses missed, so I'll be making a random guess");
                        getRandomCoordinate(); 
                        return;
                    }
                }
            } else {
                console.log("This is my 4th guess");
                getlastCoor();
                getpenCoor();
                getproCoor();
                //Did our last guess hit?
                if (lastStatus == true){ //Yes (4)
                    console.log("My last guess hit.");
                    //Did that ship sink?
                    for(i=0;i<usersShips.length;i++){
                        if(usersShips[i][0]==attemptedGuesses[lastIndex][2]){
                        checkSunk = usersShips[i][1];
                        }
                    }
                    if(checkSunk == 0){//Yes (6)
                        //Random Number
                        console.log("My last guess sunk the ship. I will make a random guess.");
                        getRandomCoordinate();
                        return;
                    } else {//No (6)
                    //Did our pen guess hit?
                        if(penStatus == true){//Yes (10)
                            console.log("My last 2 guesses hit");
                            //Was it the same ship?
                            if(attemptedGuesses[lastIndex][1] == attemptedGuesses[penIndex][1]){//Yes (12)
                                console.log("My last guess hit the same ship as the guess before");
                                //Does the last guess and pen guess share the same x-coor?
                                if (lastxCoor == penxCoor){//Yes (14)
                                    console.log("My last guess has the same x coor as the guess before");
                                    //Should I go up or down the y-axis?
                                    if(lastyIndex < penyIndex){//Down (16)
                                        //Same x coor, larger y coor
                                        console.log("My last 2 guesses have the same x coor, but a smaller y coor");
                                        xCoor = lastxCoor;
                                        yCoor = yAxis[lastyIndex-1];
                                        if (typeof xCoor === "undefined" || typeof yCoor === "undefined"){
                                            getRandomCoordinate();
                                            console.log("Coordinates were undefined. I will make a random one.");
                                            return;
                                        } else {
                                            sqCoor = `${xCoor}${yCoor}`;
                                            if($(`#user-game-board .${sqCoor}`).hasClass("attempted")){
                                                console.log("I already attempted this square, I will make a random guess");
                                                getRandomCoordinate();
                                                return;
                                            }
                                            console.log(`Come find me ${sqCoor}`);
                                            return;
                                        }
                                    } else {//Up (16)
                                    console.log("My last 2 guesses have the same x coor, but a larger y coor");
                                        //Same x coor, smaller y coor
                                        xCoor = lastxCoor;
                                        yCoor = yAxis[lastyIndex+1];
                                        if (typeof xCoor === "undefined" || typeof yCoor === "undefined"){
                                            getRandomCoordinate();
                                            console.log("Coordinates were undefined. I will make a random one.");
                                            return;
                                        } else {
                                            sqCoor = `${xCoor}${yCoor}`;
                                            if($(`#user-game-board .${sqCoor}`).hasClass("attempted")){
                                                console.log("I already attempted this square, I will make a random guess");
                                                getRandomCoordinate();
                                                return;
                                            }
                                            console.log(`Come find me ${sqCoor}`);
                                            return;
                                        }
                                    }
                                } else {//No (14)
                                    console.log("My last guess has the same y coor as the guess before");
                                    //Does the last guess and pen guess share the same y-coor?   
                                    if(lastxIndex > penxIndex){//Up/Left (25)
                                        console.log("My last guess has a smaller x coor than the guess before");
                                        //Same y coor, smaller x coor
                                        xCoor = xAxis[lastxIndex-1];
                                        yCoor = lastyCoor;
                                        if (typeof xCoor === "undefined" || typeof yCoor === "undefined"){
                                            getRandomCoordinate();
                                            console.log("Coordinates were undefined. I will make a random one.");
                                            return;
                                        } else {
                                            sqCoor = `${xCoor}${yCoor}`;
                                            if($(`#user-game-board .${sqCoor}`).hasClass("attempted")){
                                                console.log("I already attempted this square, I will make a random guess");
                                                getRandomCoordinate();
                                                return;
                                            }
                                            console.log(`Come find me ${sqCoor}`);
                                            return;
                                        }
                                    } else {//Down/Right (25)
                                        console.log("My last guess has a larger x coor than the guess before");
                                        //Same y coor, larger x coor
                                        xCoor = xAxis[lastxIndex+1];
                                        yCoor = lastyCoor;
                                        if (typeof xCoor === "undefined" || typeof yCoor === "undefined"){
                                            getRandomCoordinate();
                                            console.log("Coordinates were undefined. I will make a random one.");
                                            return;
                                        } else {
                                            sqCoor = `${xCoor}${yCoor}`;
                                            if($(`#user-game-board .${sqCoor}`).hasClass("attempted")){
                                                console.log("I already attempted this square, I will make a random guess");
                                                getRandomCoordinate();
                                                return;
                                            }
                                            console.log(`Come find me ${sqCoor}`);
                                            return;
                                            }
                                    }
                                }
                            } else {//No(12)
                                console.log("My last guess hit a different than the guess before");
                                //Did the penguess sink the ship?
                                for(i=0;i<usersShips.length;i++){
                                    if(usersShips[i][0]==attemptedGuesses[penIndex][2])
                                    checkSunk = usersShips[i][1];
                                }
                                if(checkSunk == 0){//Yes (36)
                                    console.log("My penultimate guess hit a different ship, and it sunk.");
                                    //Then ignore penguess, previous ship irrelevant
                                    //I need to search around the area of lastguess.
                                    //Can go x+/-1 or y+/-1. But keep one constant
                                    xCoor = xAxis[lastxIndex-1];
                                    yCoor = lastyCoor;
                                    if (typeof xCoor === "undefined" || typeof yCoor === "undefined"){
                                        getRandomCoordinate();
                                        console.log("Coordinates were undefined. I will make a random one.");
                                        return;
                                    } else {
                                        sqCoor = `${xCoor}${yCoor}`;
                                        if($(`#user-game-board .${sqCoor}`).hasClass("attempted")){
                                            console.log("I already attempted this square, I will make a random guess");
                                            getRandomCoordinate();
                                            return;
                                        }
                                        console.log(`Come find me ${sqCoor}`);
                                        return;
                                    }
                                } else {//No (36)
                                    //As far as I am aware, this can never happen, but I have left this here so that the function does not stall.
                                    console.log("I am the diagonal ship problem. My last two guesses hit two different ships.");
                                    getRandomCoordinate();
                                    return;
                                }
                            }
                        } else {//No (10)
                            console.log("My last guess hit but not the one before");
                            //Did our pro guess hit?
                            if(proStatus == true){//Yes (47)
                                console.log("My last guess hit, the one before didn't, but the one before that did.");
                                //Was it the same ship as lastguess?
                                if(attemptedGuesses[lastIndex][2]==attemptedGuesses[proIndex][2]){//Yes (49)
                                    console.log("My last guess and propenultimate guess hit the same ship");
                                    //Then we want to continue in the same axis trend.
                                    //Does last guess and pro guess share the same x coor?
                                    if (lastxCoor == proxCoor){//Yes (52)
                                        console.log("My last guess and propenultimate guess share the same x coor");
                                        //Should I go up or down?
                                        if(lastyCoor < proyCoor){//Down (54)
                                            console.log("My last guess has a smaller y coor than my propenultimate guess");
                                            //Same x coor, smaller y coor
                                            xCoor = lastxCoor;
                                            yCoor = yAxis[lastyIndex-1];
                                            if (typeof xCoor === "undefined" || typeof yCoor === "undefined"){
                                                getRandomCoordinate();
                                                console.log("Coordinates were undefined. I will make a random one.");
                                                return;
                                            } else {
                                                sqCoor = `${xCoor}${yCoor}`;
                                                if($(`#user-game-board .${sqCoor}`).hasClass("attempted")){
                                                    console.log("I already attempted this square, I will make a random guess");
                                                    getRandomCoordinate();
                                                    return;
                                                }
                                                console.log(`Come find me ${sqCoor}`);
                                                return;
                                            }
                                        } else {//Up (54)
                                            console.log("My last guess has a larger y coor than my propenultimate guess");
                                            //Same x coor, larger y coor
                                            xCoor = lastxCoor;
                                            yCoor = yAxis[lastyIndex+1];
                                            if (typeof xCoor === "undefined" || typeof yCoor === "undefined"){
                                                getRandomCoordinate();
                                                console.log("Coordinates were undefined. I will make a random one.");
                                                return;
                                            } else {
                                                sqCoor = `${xCoor}${yCoor}`;
                                                if($(`#user-game-board .${sqCoor}`).hasClass("attempted")){
                                                    console.log("I already attempted this square, I will make a random guess");
                                                    getRandomCoordinate();
                                                    return;
                                                }
                                                console.log(`Come find me ${sqCoor}`);
                                                return;
                                            }
                                        }
                                    } else {//No (52)
                                        console.log("My last guess and propenultimate guess share the same y coor");
                                        //Does the last guess and pro guess share the same y coor?
                                        //Should I go up or down the y axis?
                                        if (lastxCoor < proxCoor){//Down/Right(63)
                                            console.log("My last guess has a smaller x coor than my propenultimate guess");
                                            //Same y coor, larger x coor
                                            xCoor = xAxis[lastxIndex-1];
                                            yCoor = lastyCoor;
                                            if (typeof xCoor === "undefined" || typeof yCoor === "undefined"){
                                                getRandomCoordinate();
                                                console.log("Coordinates were undefined. I will make a random one.");
                                                return;
                                            } else {
                                                sqCoor = `${xCoor}${yCoor}`;
                                                if($(`#user-game-board .${sqCoor}`).hasClass("attempted")){
                                                    console.log("I already attempted this square, I will make a random guess");
                                                    getRandomCoordinate();
                                                    return;
                                                }
                                                console.log(`Come find me ${sqCoor}`);
                                                return;
                                            }
                                        } else {//Up/left (63)
                                            console.log("My last guess has a larger x coor than my propenultimate guess");
                                            //Same y coor, smaller x coor
                                            xCoor = xAxis[lastxIndex+1];
                                            yCoor = lastyCoor;
                                            if (typeof xCoor === "undefined" || typeof yCoor === "undefined"){
                                                getRandomCoordinate();
                                                console.log("Coordinates were undefined. I will make a random one.");
                                                return;
                                            } else {
                                                sqCoor = `${xCoor}${yCoor}`;
                                                if($(`#user-game-board .${sqCoor}`).hasClass("attempted")){
                                                    console.log("I already attempted this square, I will make a random guess");
                                                    getRandomCoordinate();
                                                    return;
                                                }
                                                console.log(`Come find me ${sqCoor}`);
                                                return;
                                            }
                                        }
                                    }
                                } else { //No (49)
                                    console.log("My last guess and propenultimate guess hit different ships");
                                    //Then they are different ships. Disregard pro guess.
                                    //Explore around last guess coor.
                                    xCoor = xAxis[lastxIndex-1];
                                    yCoor = lastyCoor;
                                    if (typeof xCoor === "undefined" || typeof yCoor === "undefined"){
                                        getRandomCoordinate();
                                        console.log("Coordinates were undefined. I will make a random one.");
                                        return;
                                    } else {
                                        sqCoor = `${xCoor}${yCoor}`;
                                        if($(`#user-game-board .${sqCoor}`).hasClass("attempted")){
                                            console.log("I already attempted this square, I will make a random guess");
                                            getRandomCoordinate();
                                            return;
                                        }
                                        console.log(`Come find me ${sqCoor}`);
                                        return;
                                    }
                                }
                            } else {//No (47)
                                console.log("My last guess hit, the two before that didn't.");
                                //Previous two guesses were misses.
                                if(attemptedGuesses[attemptedGuesses.length-4][1]==true){
                                    console.log("My last guess hit, the two before that didn't. But the one before them did. So I am looking for a ship and missed left and right of my original guess ");
                                    if(penxCoor == proxCoor){//yes (79)
                                        console.log("My pro and penultimate guesses shared the same x coor");
                                        //I know that I have previously attempted the space inbetween with the same x coor. 
                                        //So i want to check lastguessx, but away from pen/pro guess.
                                        //I check if lastguessx is higher or lower
                                        if(lastxCoor > penxCoor){//lgX is larger (83)
                                            console.log("My last guess had a larger x coor than my penultimate. So I want to check the space between");
                                            //So i want to keep the same y coor with a larger x coor.
                                            xCoor = xAxis[lastxIndex+1];
                                            yCoor = lastyCoor;
                                            if (typeof xCoor === "undefined" || typeof yCoor === "undefined"){
                                                getRandomCoordinate();
                                                console.log("Coordinates were undefined. I will make a random one.");
                                                return;
                                            } else {
                                                sqCoor = `${xCoor}${yCoor}`;
                                                if($(`#user-game-board .${sqCoor}`).hasClass("attempted")){
                                                    console.log("I already attempted this square, I will make a random guess");
                                                    getRandomCoordinate();
                                                    return;
                                                }
                                                console.log(`Come find me ${sqCoor}`);
                                                return;
                                            }
                                        } else {//lgX is smaller (83)
                                            console.log("My last guess had a smaller x coor than my penultimate. So I want to check the space between");
                                            //I want to keep the same y coor but with a smaller x coor.
                                            xCoor = xAxis[lastxIndex-1];
                                            yCoor = lastyCoor;
                                            if (typeof xCoor === "undefined" || typeof yCoor === "undefined"){
                                                getRandomCoordinate();
                                                console.log("Coordinates were undefined. I will make a random one.");
                                                return;
                                            } else {
                                                sqCoor = `${xCoor}${yCoor}`;
                                                if($(`#user-game-board .${sqCoor}`).hasClass("attempted")){
                                                    console.log("I already attempted this square, I will make a random guess");
                                                    getRandomCoordinate();
                                                    return;
                                                }
                                                console.log(`Come find me ${sqCoor}`);
                                                return;
                                            }
                                        }
                                    } else {//No (79)
                                        console.log("My pro and penultimate guesses shared the same y coor");
                                        //Then I keep the same x coor.
                                        //I want to check if lastguessy is higher or lower
                                        if(lastyCoor > penyCoor){//lgY is larger (91)
                                            console.log("My last guess had a larger y coor than my penultimate. So I want to check the space between");
                                            //Same x coor, larger y coor.
                                            xCoor = lastxCoor;
                                            yCoor = yAxis[lastyIndex+1];
                                            if (typeof xCoor === "undefined" || typeof yCoor === "undefined"){
                                                getRandomCoordinate();
                                                console.log("Coordinates were undefined. I will make a random one.");
                                                return;
                                            } else {
                                                sqCoor = `${xCoor}${yCoor}`;
                                                if($(`#user-game-board .${sqCoor}`).hasClass("attempted")){
                                                    console.log("I already attempted this square, I will make a random guess");
                                                    getRandomCoordinate();
                                                    return;
                                                }
                                                console.log(`Come find me ${sqCoor}`);
                                                return;
                                            }
                                        } else {//Smaller (91)
                                            console.log("My last guess had a smaller x coor than my penultimate. So I want to check the space between");
                                            //Same x coor, smaller y coor.
                                            xCoor = lastxCoor;
                                            yCoor = yAxis[lastyIndex-1];
                                            if (typeof xCoor === "undefined" || typeof yCoor === "undefined"){
                                                getRandomCoordinate();
                                                console.log("Coordinates were undefined. I will make a random one.");
                                                return;
                                            } else {
                                                sqCoor = `${xCoor}${yCoor}`;
                                                if($(`#user-game-board .${sqCoor}`).hasClass("attempted")){
                                                    console.log("I already attempted this square, I will make a random guess");
                                                    getRandomCoordinate();
                                                    return;
                                                }
                                                console.log(`Come find me ${sqCoor}`);
                                                return;
                                            }
                                        }
                                    }
                                } else {
                                    console.log("My last guess hit, the three before that didn't. So I will make a random guess");
                                    getRandomCoordinate();
                                    return;
                                }
                                //Check if penguess x coor share the same pen guess x coor
                                
                            }
                        }
                    }
                } else { //No (4)
                    console.log("My last guess did not hit.");
                    //Did our pen guess hit?
                    if(penStatus == true){//Yes (102)
                        console.log("My last guess did not hit, but the one before did.");
                        //Did pen guess sink?
                        for(i=0;i<usersShips.length;i++){
                            if(usersShips[i][0]==attemptedGuesses[penIndex][2])
                            checkSunk = usersShips[i][1];
                        }
                        if(checkSunk == 0){//yes (104)
                            console.log("My penultimate guess sunk the ship, so I will make a random guess");
                            getRandomCoordinate();
                            return;
                        } else {//No (104)
                            console.log("My penultimate guess hit a ship, but it didn't sink");
                            //Did last guess and pen guess share the same x coor?
                            if(lastxCoor == penxCoor){//Yes(109)
                                console.log("My last and penultimate guess share the same x coor");
                                //Should I go up or down the y-axis?
                                if(lastyCoor < penyCoor){//Down(111)
                                    console.log("My last guess has a smaller y coor than my penultimate guess");
                                    //Keep the same x coor, but larger y coor.
                                    //Using penguess, NOT last guess.
                                    //Otherwise youre in the same space.
                                    xCoor = penxCoor;
                                    yCoor = yAxis[penyIndex+1];
                                    if (typeof xCoor === "undefined" || typeof yCoor === "undefined"){
                                        getRandomCoordinate();
                                        console.log("Coordinates were undefined. I will make a random one.");
                                        return;
                                    } else {
                                        sqCoor = `${xCoor}${yCoor}`;
                                        if($(`#user-game-board .${sqCoor}`).hasClass("attempted")){
                                            console.log("I already attempted this square, I will make a random guess");
                                            getRandomCoordinate();
                                            return;
                                        }
                                        console.log(`Come find me ${sqCoor}`);
                                        return;
                                    }                                    
                                } else {//Up(111)
                                    console.log("My last guess has a larger y coor than my penultimate guess");
                                    //Keep the same x coor, but smaller y coor.
                                    //Use pen guess NOT last guess
                                    xCoor = penxCoor;
                                    yCoor = yAxis[penyIndex-1];
                                    if (typeof xCoor === "undefined" || typeof yCoor === "undefined"){
                                        getRandomCoordinate();
                                        console.log("Coordinates were undefined. I will make a random one.");
                                        return;
                                    } else {
                                        sqCoor = `${xCoor}${yCoor}`;
                                        if($(`#user-game-board .${sqCoor}`).hasClass("attempted")){
                                            console.log("I already attempted this square, I will make a random guess");
                                            getRandomCoordinate();
                                            return;
                                        }
                                        console.log(`Come find me ${sqCoor}`);
                                        return;
                                    }
                                }
                            } else {//No (109)
                                console.log("My last and penultimate guess share the same y coor");
                                //Last guess and pen guess had the same y coor.
                                //Should I go up or down the x-axis?
                                if(lastxCoor < penxCoor){//Up/right (122)
                                    console.log("My last guess has a smaller y coor than my penultimate guess");
                                    //Keep the same y coor, but larger x coor.
                                    //Use pen guess NOT last guess.
                                    xCoor = xAxis[penxIndex+1];
                                    yCoor = penyCoor;
                                    if (typeof xCoor === "undefined" || typeof yCoor === "undefined"){
                                        getRandomCoordinate();
                                        console.log("Coordinates were undefined. I will make a random one.");
                                        return;
                                    } else {
                                        sqCoor = `${xCoor}${yCoor}`;
                                        if($(`#user-game-board .${sqCoor}`).hasClass("attempted")){
                                            console.log("I already attempted this square, I will make a random guess");
                                            getRandomCoordinate();
                                            return;
                                        }
                                        console.log(`Come find me ${sqCoor}`);
                                        return;
                                    }
                                }else{//Down/left (122)
                                    console.log("My last guess has a larger y coor than my penultimate guess");
                                    //Keep the same y coor, but smaller x coor.
                                    //Use pen guess NOT last guess.
                                    xCoor = xAxis[penxIndex-1];
                                    yCoor = penyCoor;
                                    if (typeof xCoor === "undefined" || typeof yCoor === "undefined"){
                                        getRandomCoordinate();
                                        console.log("Coordinates were undefined. I will make a random one.");
                                        return;
                                    } else {
                                        sqCoor = `${xCoor}${yCoor}`;
                                        if($(`#user-game-board .${sqCoor}`).hasClass("attempted")){
                                            console.log("I already attempted this square, I will make a random guess");
                                            getRandomCoordinate();
                                            return;
                                        }
                                        console.log(`Come find me ${sqCoor}`);
                                        return;
                                    }
                                }
                            }
                        }   
                    } else { // No (102)
                        console.log("My last 2 guess did not hit.");
                        //Check if pro guess hit
                        if(proStatus == true){//Yes (133)
                            console.log("My last 2 guess did not hit, but the one before did.");
                            //Does last guess and pen guess share the same x coor?
                            if(lastxCoor == penxCoor){//Yes (135)
                                console.log("My last 2 guess share the same x coor.");
                                //Then we know pro guess also shares the same x coor.
                                //So we want to a higher or lower x coor, with pro guess y coor.
                                xCoor = xAxis[lastxCoor+1];
                                yCoor = proyCoor;
                                if (typeof xCoor === "undefined" || typeof yCoor === "undefined"){
                                    getRandomCoordinate();
                                    console.log("Coordinates were undefined. I will make a random one.");
                                    return;
                                } else {
                                    sqCoor = `${xCoor}${yCoor}`;
                                    if($(`#user-game-board .${sqCoor}`).hasClass("attempted")){
                                        console.log("I already attempted this square, I will make a random guess");
                                        getRandomCoordinate();
                                        return;
                                    }
                                    console.log(`Come find me ${sqCoor}`);
                                    return;
                                }
                            } else {//No (135)
                                for(i=0;i<usersShips.length;i++){
                                    if(usersShips[i][0]==attemptedGuesses[proIndex][2])
                                    checkSunk = usersShips[i][1];
                                }
                                if(checkSunk == 0){
                                    console.log("My penultimate guess sunk the ship, so I will make a random guess");
                                    getRandomCoordinate();
                                    return;
                                } else {
                                    console.log("My last 2 guesses don't share the same x coor.");
                                    if(proStatus == true){
                                        xCoor = proxCoor;
                                        yCoor = yAxis[proyIndex+1];
                                        if (typeof xCoor === "undefined" || typeof yCoor === "undefined"){
                                            getRandomCoordinate();
                                            console.log("Coordinates were undefined. I will make a random one.");
                                            return;
                                        } else {
                                            sqCoor = `${xCoor}${yCoor}`;
                                            if($(`#user-game-board .${sqCoor}`).hasClass("attempted")){
                                                console.log("I already attempted this square, I will make a random guess");
                                                getRandomCoordinate();
                                                return;
                                            }
                                            console.log(`Come find me ${sqCoor}`);
                                            return;
                                        }
                                    }
                                }
                            }     
                        } else {//No (133)
                            console.log("My last 3 guesses did not hit");
                            //Check if any guesses have hit yet.
                            if(attemptedGuesses.length>=4){
                                if(attemptedGuesses[attemptedGuesses.length-4][1]==true){
                                    //Check if pen guess and pro guess have same the x coor
                                    if(penxCoor == proxCoor){//Yes (144)
                                        //Then we know that there is an attempted square between pen and pro guess on the y-axis.
                                        //If the square to the left/right of last guess is attempted, or hit, then we need to try two squares to the left/right.
                                        if($(`#user-game-board .${xAxis[lastxIndex+1]}${lastyCoor}`).hasClass("attempted")){
                                            xCoor = xAxis[lastxIndex+2];
                                            yCoor = lastyCoor;
                                            if (typeof xCoor === "undefined" || typeof yCoor === "undefined"){
                                                getRandomCoordinate();
                                                console.log("Coordinates were undefined. I will make a random one.");
                                                return;
                                            } else {
                                                sqCoor = `${xCoor}${yCoor}`;
                                                if($(`#user-game-board .${sqCoor}`).hasClass("attempted")){
                                                    console.log("I already attempted this square, I will make a random guess");
                                                    getRandomCoordinate();
                                                    return;
                                                }
                                                console.log(`Come find me ${sqCoor}`);
                                                return;
                                            }
                                        }
                                        if($(`#user-game-board .${xAxis[lastxIndex-1]}${lastyCoor}`).hasClass("attempted")){
                                            xCoor = xAxis[lastxIndex-2];
                                            yCoor = lastyCoor;
                                            if (typeof xCoor === "undefined" || typeof yCoor === "undefined"){
                                                getRandomCoordinate();
                                                console.log("Coordinates were undefined. I will make a random one.");
                                                return;
                                            } else {
                                                sqCoor = `${xCoor}${yCoor}`;
                                                if($(`#user-game-board .${sqCoor}`).hasClass("attempted")){
                                                    console.log("I already attempted this square, I will make a random guess");
                                                    getRandomCoordinate();
                                                    return;
                                                }
                                                console.log(`Come find me ${sqCoor}`);
                                                return;
                                            }
                                        }
                                    } else {//No(144)
                                        //Then we know that there is an attempted square between pro and pro guess on the x-axis.
                                        //If the square to the up/down of last guess is attempted, or hit, then we need to try two squares up/down.
                                        if($(`#user-game-board .${lastxCoor}${yAxis[lastyIndex+1]}`).hasClass("attempted")){
                                            xCoor = lastxCoor;
                                            yCoor = yAxis[lastyIndex+2];
                                            if (typeof xCoor === "undefined" || typeof yCoor === "undefined"){
                                                getRandomCoordinate();
                                                console.log("Coordinates were undefined. I will make a random one.");
                                                return;
                                            } else {
                                                sqCoor = `${xCoor}${yCoor}`;
                                                if($(`#user-game-board .${sqCoor}`).hasClass("attempted")){
                                                    console.log("I already attempted this square, I will make a random guess");
                                                    getRandomCoordinate();
                                                    return;
                                                }
                                                console.log(`Come find me ${sqCoor}`);
                                                return;
                                            }
                                        }
                                        if($(`#user-game-board .${lastxCoor}${yAxis[lastyIndex-1]}`).hasClass("attempted")){
                                            xCoor = lastxCoor;
                                            yCoor = yAxis[lastyIndex-2];
                                            if (typeof xCoor === "undefined" || typeof yCoor === "undefined"){
                                                getRandomCoordinate();
                                                console.log("Coordinates were undefined. I will make a random one.");
                                                return;
                                            } else {
                                                sqCoor = `${xCoor}${yCoor}`;
                                                if($(`#user-game-board .${sqCoor}`).hasClass("attempted")){
                                                    console.log("I already attempted this square, I will make a random guess");
                                                    getRandomCoordinate();
                                                    return;
                                                }
                                                console.log(`Come find me ${sqCoor}`);
                                                return;
                                            }
                                        }
                                    }
                                } else {
                                console.log("My last 4 guesses did not hit, so I will make a random guess");
                                getRandomCoordinate();
                                return;
                                }
                            } else {
                                console.log("I only made 3 guess. None hit. I will make a random guess");
                                getRandomCoordinate();
                                return;
                            }
                        }
                    }
                }
            }
        }   
    }
    return sqCoor;
}  