var i = localStorage.length;
localStorage.setItem(`${i}`,`${score}`);
//Get all the scores saved in LocalStorage
for(i=0;i<localStorage.length;i++){
    var newValue = localStorage.get(`${i}`);
    //Scores are saved as `${userName} ${userScore}`
    var newScore =  newValue.split(" ");
    //Assign values to correct variables
    var userName = newScores[0];
    //Make userScore an integer
    var userScore = parseInt(newScore[1],10);
    //Add variables to totalScores
    var totalScores;
    totalScores.push(userName, userScore);
}
//Sort totalScores in order of turnCount
totalScores.sort(compareUserScore);
function compareUserScore(a, b) {
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        //Made this greater than because we want userScore in ascending order, not descending
        return (a[1] > b[1]) ? -1 : 1;
    }
}
//Fill the scores table with the top 10 scores
if(totalScores.length >= 10){
    for(i=0;i<10;i++){
        var topTenScores;
        var tableRow = i;
        $(`#scores-table .row${tableRow} .${userName}`).innerHTML(totalScores[i][0]);
        $(`#scores-table .row${tableRow} .${userScore}`).innerHTML(totalScores[i][1]);
    }
} else { //If we have less than 10 scores, we only fill in the appropriate number of rows.
   for(i=0;i<totalScores.length;i++){
        var topTenScores;
        var tableRow = i;
        $(`#scores-table .row${tableRow} .${userName}`).innerHTML(totalScores[i][0]);
        $(`#scores-table .row${tableRow} .${userScore}`).innerHTML(totalScores[i][1]);
    }
}
