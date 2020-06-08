                                        sqCoor = `${xCoor}${yCoor}`;
                                        if($(`#user-game-board .${sqCoor}`).hasClass("attempted")){
                                            console.log("I already attempted this square, I will make a random guess");
                                        }
                                        console.log(`Come find me ${sqCoor}`);
                                        return;