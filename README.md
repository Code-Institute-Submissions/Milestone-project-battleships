#Battleships
##Milestone Project 2 - Interactive Front-End Development
##Created by Lindsay Kerr

Battleships is an web-based gaming application, based on the pencil and paper, turn-based strategy game of the same name. 
Users are invited to set out their tokens in a unique arrangment, and then take turns to guess the locations of an opponent's tokens on a 10x10 grid.
The opponent's role is taken by JavaScript functions that have been programmed to make accurate guesses depending on the success of their previous guesses. This is done to simulate the environment of playing against an opponent in real time.

##UX
Growing up with flash-powered online games, I wanted to create an environment in which players are able to start a game, play for as long and they wish. 
With this in mind, Battleships must be a game that must entertain a user for as long as they wish to be engaged. The game must not require a long time commitment to establish a profile, and if a user wishes to leave, they must be able to do so without requiring a checkpoint to save their progress.
To remain competitive, scores must be quantifiable. A user is able to track progress, see previous attempts and compare their successes with other players or friends.

The target audience for this application is a younger generation, one that is more familiar with web-based games. However, a previous experience is not required or limit a user's experience.
The purpose of choosing Battleships is that it is a widely known game, one that is simple enough for new players to quickly grasp, yet challenging enough that someone with prior experience would want to return to improve their score.
Simply put, the website is designed for anyone searching for entertainment, or a distraction, and be able fulfill that need, staying for as long as they wish. 

To remain engaging, each new game provides a new layout of opponent's ships, while collecting a running 'turn count' for each game, so that user's are experiencing a new challenge each game, while being  able to compare to previous attempts. Furthermore, the opponent's guesses are determined by a JavaScript function that helps simulate a skilled opponent.

###User Stories

In particular, as part of this section we recommend that you provide a list of User Stories, with the following general structure:

As a user type, I want to perform an action, so that I can achieve a goal.
This section is also where you would share links to any wireframes, mockups, diagrams etc. that you created as part of the design process. These files should themselves either be included as a pdf file in the project itself (in an separate directory), or just hosted elsewhere online and can be in any format that is viewable inside the browser.

##Features
###Existing Features
* **Scoresboard** - When a user completes a game, they are able to enter a profile, a nickname, that is registered into a scoreboard. The scores are stored in local sotrage, so when a user returns, they are able to review their previous performances. It improves a competitive aspect to the game and encourages players to play repeated games to improve their scores.
* **Armory** - Once the placement phase has begun, a modal window appears to aid the user in deploying their ships. The modal window lists all the available ships, their length and whether the ship has been deployed. This will increase the ease of use for the users during the deployment phase.
* **Orientation** - During the placement phase, users are able to change the orientation of their ships. This feature is controlled with a button located underneath the armory. To further aid the user, the button itself is shows the direction that the ship is facing. 
* **Banners** - Throughout all stages of the game, from the opening of the web page, a user is supplied information through a banner modal. The modal is located in such a position that it does not interfere with the gameplay, and provides information that prompts the user's next move, such as "All ships are deployed. Please press 'Ready' to begin the game".
* **Show Coordinates** - Using a mouse-enter function, when the mouse is on top of the two game boards, a function registers which game square is being hovered over, highlighting that square, and then sends that coordinate to subsequent functions. Highlighting the square provides a user with clarity of which square will be selected, allowing greater ease of use for tablet and mobile users, so that selecting an incorrect square can be avoided.
* **Intelligent Guesses** - After each of the opponent's turns, the guess made is recorded into an array. Using this knowledge, the JavaScript function 'intelligenceGuess' is able to make a more accurate guess for their next turn. For example, if the opponent's previous guess was a hit, and it was the first hit on that specific ship, then the opponent will make their next guess in the vicinity of their previous guess, searching for that ship. This has been implemented to increase the competitive edge of the opponent.

###Future Features
* **Mobile Devices** - While the web page and all its components are responsive to window size, 'clickability' is temperamental without the use of a mouse. In future versions, I hope to make a mobile user's experience streamlined and without issue.
* **Adjacent Placement** - Currently, the only restrictions during the placement phase are that the user must place their ships within the boundaries of the grid, and that users are unable place ships on top of each other. In future, I would like to integrate a restriction that prohibits users placing their ships adjacently.
* **Difficulty Settings** - To adapt for the experience or skill of the user, I hope to implement the feature that allows users to choose their preferred grid size(8x8,12x12,16x16) and the strength of the opponent. This will open the appeal of the web page to a wider audience.


##Technologies Used
* **Bootstrap** - Bootstrap was used to implement the layout and structure of the entire website.
    https://getbootstrap.com/
* **FontAwesome** - All of the icons used in the navigation bar were provided by FontAwesome.
    https://fontawesome.com/start
* **jQuery** - Throughout the JavaScript functions, jQuery was integral to help manipulate the DOM.
    https://jquery.com/download/
* **Canva** - All graphics were created in Canva's design software.
    https://www.canva.com/
* **W3School** - Although not providing any libraries, w3School was used to troubleshoot any issues in producing this website. In production of the modal windows found throughout the web page, this resource was very helpful.
    https://www.w3schools.com/

##Testing
A lot of testing, throughout the creation of this website could be done manually. A lot of the functions are called by "onclick" functions, and because of this a majority of the testing can be accomplished manually.
This manual testing included such actions as placing ships, clicking a square to check if it was occupied, loading of scores and instruction modals, and so on.
Any testing that could be accomplished automatedly can be found in file 'functionsSpec.js'. This  was tested using Jasmine framework which can be found here: https://jasmine.github.io/. I have subsequently removed the framework from 'index.html' so that it was not visible to any visitors to the site.
The automated testing was used to ensure that the correct coordinates were recorded and returned by various functions, that the game-scripts were able to load, however as each game would upload a random script, it was impossible to predict which game-script was loaded. Further more, I used automated testing to predict which square would be guessed by 'intelligenceGuesses' when provided with a number of variables.

As a third, more thorough level of testing, I also sent the web page to my parents. This can be classified as 'defensive testing' as they are notoriously inept with computers, and have a knack for finding any weak points of a web page. They were useful in finding any obstacles that would prevent a future user from playing the game of battleships. They were able to ensure that the user interface was easy enough to use, that any user would be able to play a game from beginning to end.
My parents were asked to load the web page, place/deploy all of their ships, begin a game, and play it all the way through to completetion. After that, they were able to save their score, and if so desired, start a new game.
In this section, you need to convince the assessor that you have conducted enough testing to legitimately believe that the site works well. Essentially, in this part you will want to go over all of your user stories from the UX section and ensure that they all work as intended, with the project providing an easy and straightforward way for the users to achieve their goals.

Furthermore, I tested the web page across a number of devices such as laptops, tablets and mobiles. While there are some issues with devices that operate with a touch-screen, the web page was responsive to the window width. On a desktop unit, the website ran without errors. 

You should also mention in this section any interesting bugs or problems you discovered during your testing, even if you haven't addressed them yet.

##Deployment
This website has been deployed through GitHub's hosting service, with the page being found at:
https://lindsaykerr1994.github.io/Milestone-project-battleships/
Due to short-sightedness while making Git Commits, the commit messages were very lengthy. For clarity, I have complied a log of my commit messages throughout the production of the web page. This can be found in the root directory under the name "commit-log.txt"

##Credits
###Content
Throughout the construction of this web page, I relied heavily upon advice from a number of forum websites such as: **W3School**, **StackOverflow** and **Mozilla Development Web Docs**.  The advice and solutions provided by this website were very helpful throughout.

###Acknowledgements
Firstly, I would like to acknowledge the game of battleships. While there are several versions of the game, the original pencil and paper game was instrumental in the inspiration of this web page.
I want to thank everyone that possessed a huge amount of patience while I constructed this web page, through all of my confusion and ramblings of 'if' functions.