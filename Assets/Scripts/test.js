var checkSunk;
if (attemptedGuesses.length == 0){
        getRandomCoordinate();
} else {
    //Did our last guess hit?
    if (lastStatus == true){ //Yes (4)
        //Did that ship sink?
        for(i=0;i<usersShips.length;i++){
            if(usersShips[i][0]==attemptedGuesses[lastIndex][2])
            checkSunk = usersShips[i][1];
        }
        if(checkSunk == 0){//Yes (6)
            //Random Number
            getRandomCoordinate();
        } else {//No (6)
            //Did our pen guess hit?
            if(penStatus == true){//Yes (10)
                //Was it the same ship?
                if(attemptedGuesses[lastIndex][1] == attemptedGuesses[penIndex][1]){//Yes (12)
                    //Does the last guess and pen guess share the same x-coor?
                    if (lastxCoor == penxCoor){//Yes (14)
                        //Should I go up or down the y-axis?
                        if(lastyIndex > penyIndex){//Down (16)
                            //Same x coor, larger y coor
                            sqCoor = `${lastxCoor}${yAxis[lastyIndex+1]}`;
                        } else {//Up (16)
                            //Same x coor, smaller y coor
                            sqCoor = `${lastxCoor}${yAxis[lastyIndex-1]}`;
                        }
                    } else {//No (14)
                        //Does the last guess and pen guess share the same y-coor?
                        if(lastyCoor == penyCoor){//Yes (23)
                            //Should I go up or down the x-axis?     
                            if(lastxIndex > penxIndex){//Down/Right (25)
                                //Same y coor, larger x coor
                                sqCoor = `${xAxis[lastxIndex+1]}${lastyCoor}`;
                            } else {//Up/Left (25)
                                //Same y coor, smaller x coor
                                sqCoor = `${xAxis[lastxIndex-1]}${lastyCoor}`;
                            }
                        } else{//No (23)
                           //This cannot happen, because lastguess and penguess ship is the same, and ship's must share either x or y coor.     
                        }
                    }
                } else {//No(12)
                    //Did the penguess sink the ship?
                    for(i=0;i<usersShips.length;i++){
                        if(usersShips[i][0]==attemptedGuesses[penIndex][2])
                        checkSunk = usersShips[i][1];
                    }
                    if(checkSunk == 0){//Yes (36)
                        //Then ignore penguess, previous ship irrelevant
                        //I need to search around the area of lastguess.
                        //Can go x+/-1 or y+/-1. But keep one constant
                        sqCoor = `${xAxis[lastxIndex-1]}${lastyCoor}`;
                    } else {//No (36)
                        //Can this happen?
                        console.log("I am the diagonal ship problem. My last two guesses hit two different ships.")
                    }
                }
            } else {//No (10)
                //Did our pro guess hit?
                if(proStatus == hit){//Yes (47)
                    //Was it the same ship as lastguess?
                    if(attemptedGuesses[lastIndex][2]==attemptedGuesses[proIndex][2]){//Yes (49)
                        //Then we want to continue in the same axis trend.
                        //Does last guess and pro guess share the same x coor?
                        if (lastxCoor == proxCoor){//Yes (52)
                            //Should I go up or down?
                            if(lastyCoor > proyCoor){//Down (54)
                                //Same x coor, larger y coor
                                sqCoor = `${lastxCoor}${yAxis[lastyIndex+1]}`;
                            } else {//Up (54)
                                //Same x coor, smaller y coor
                                sqCoor = `${lastxCoor}${yAxis[lastyIndex-1]}`;
                            }
                        } else {//No (52)
                            //Does the last guess and pro guess share the same y coor?
                            if(lastyCoor == proyCoor){//Yes (61)
                                //Should I go up or down the y axis?
                                if (lastyCoor > proyCoor){//Down/Right(63)
                                    //Same y coor, larger x coor
                                    sqCoor = `${xAxis[lastxIndex+1]}${lastyCoor}`;
                                } else {//Up/left (63)
                                    //Same y coor, smaller x coor
                                    sqCoor = `${xAxis[lastxIndex-1]}${lastyCoor}`;
                                }
                            } else {//No (61)
                                //This cannot happen, because lastguess and proguess ship is the same, and ship's must share either x or y coor.
                            }
                        }
                    } else { //No (49)
                        //Then they are different ships. Disregard pro guess.
                        //Explore around last guess coor.
                        sqCoor = `${xAxis[lastxIndex-1]}${lastyCoor}`;
                    }
                } else {//No (47)
                    //Previous two guesses were misses.
                    //Check if penguess x coor share the same pen guess x coor
                    if(penxCoor == proxCoor){//yes (79)
                        //I know that I have previously attempted the space inbetween with the same x coor. 
                        //So i want to check lastguessx, but away from pen/pro guess.
                        //I check if lastguessx is higher or lower
                        if(lastxCoor > penxCoor){//lgX is larger (83)
                            //So i want to keep the same y coor with a larger x coor.
                            sqCoor = `${xAxis[lastxIndex+1]}${lastyCoor}`;
                        } else {//lgX is smaller (83)
                            //I want to keep the same y coor but with a smaller x coor.
                            sqCoor = `${xAxis[lastxIndex-1]}${lastyCoor}`;
                        }
                    } else {//No (79)
                        //Then I keep the same x coor.
                        //I want to check if lastguessy is higher or lower
                        if(lastyCoor > penyCoor){//lgY is larger (91)
                            //Same x coor, larger y coor.
                            sqCoor = `${lastXCoor}${yAxis[lastxIndex+1]}`;
                        } else {//Smaller (91)
                            //Same x coor, smaller y coor.
                            sqCoor = `${lastXCoor}${yAxis[lastxIndex-1]}`;
                        }
                    }
                }
            }
        }
    } else{ //No (4)
        //Did our pen guess hit?
        if(penStatus == true){//Yes (102)
            //Did pen guess sink?
            for(i=0;i<usersShips.length;i++){
                if(usersShips[i][0]==attemptedGuesses[penIndex][2])
                checkSunk = usersShips[i][1];
            }
            if(checkSunk == 0){//yes (104)
                getRandomCoordinate();
            } else {//No (104)
                //Did last guess and pen guess share the same x coor?
                if(lastxCoor == penxCoor){//Yes(109)
                    //Should I go up or down the y-axis?
                    if(lastyCoor < penyCoor){//Down(111)
                        //Keep the same x coor, but larger y coor.
                        //Using penguess, NOT last guess.
                        //Otherwise youre in the same space.
                        sqCoor = `${penxCoor}${yAxis[penyIndex+1]}`;
                    } else {//Up(111)
                        //Keep the same x coor, but smaller y coor.
                        //Use pen guess NOT last guess
                        sqCoor = `${penxCoor}${yAxis[penyIndex-1]}`;
                    }
                } else {//No (109)
                    //Last guess and pen guess had the same y coor.
                    //Should I go up or down the x-axis?
                    if(lastxCoor < penxCoor){//Up/right (122)
                        //Keep the same y coor, but larger x coor.
                        //Use pen guess NOT last guess.
                        sqCoor = `${xAxis[penxIndex+1]}${penyCoor}`;
                    }else{//Down/left (122)
                        //Keep the same y coor, but smaller x coor.
                        //Use pen guess NOT last guess.
                        sqCoor = `${xAxis[penxIndex-1]}${penyCoor}`;
                    }
                }
            }
        } else { // No (102)
            //Check if pro guess hit
            if(proStatus == true){//Yes (133)
                //Does last guess and pen guess share the same x coor?
                if(lastxCoor == penxCoor){//Yes (135)
                    //Then we know pro guess also shares the same x coor.
                    //So we want to a higher or lower x coor, with pro guess y coor.
                    sqCoor = `${xAxis[lastxCoor+1]}${proxCoor}`;
                } else {//No (135)
                    //Then we know pro guess also shares the same y coor.
                    //So we want a higher or lower y coor, with pro guess x coor.
                    sqCoor = `${proxCoor}${yAxis[proxIndex+1]}`;
                }
            } else {//No (133)
                //Check if pen guess and pro guess have same the x coor
                if(penxCoor == proxCoor){//Yes (144)
                    //Then we know that there is an attempted square between pen and pro guess on the y-axis.
                    //If the square to the left/right of last guess is attempted, or hit, then we need to try two squares to the left/right.
                    if($(`#${whichBoard} .${xAxis[lastxIndex+1]}${yAxis[lastyIndex]}`).hasClass("attempted")){
                        sqCoor = `${xAxis[lastxIndex-2]}${yIndex[lastyIndex]}`
                    }
                    if($(`#${whichBoard} .${xAxis[lastxIndex-1]}${yAxis[lastyIndex]}`).hasClass("attempted")){
                        sqCoor = `${xAxis[lastxIndex-2]}${yAxis[lastyIndex]}`
                    }
                } else {//No(144)
                    //Then we know that there is an attempted square between pro and pro guess on the x-axis.
                    //If the square to the up/down of last guess is attempted, or hit, then we need to try two squares up/down.
                    if($(`#${whichBoard} .${xAxis[lastxIndex]}${yAxis[lastyIndex+1]}`).hasClass("attempted")){
                        sqCoor = `${xAxis[lastxIndex]}${yAxis[lastyIndex-2]}`
                    }
                    if($(`#${whichBoard} .${xAxis[lastxIndex]}${yAxis[lastyIndex-1]}`).hasClass("attempted")){
                        sqCoor = `${xAxis[lastxIndex]}${yAxis[lastyIndex+2]}`
                    }
                }
            }
        }
    }
}

//Always go higher