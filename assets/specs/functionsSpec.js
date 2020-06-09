describe("Game Board",function(){
    describe("findCoordinate",function(){
        it("should return correct coordinates",function(){
            expect(findCoordinate($("#user-game-board .B4"))).toBe("B4","user-game-board");
            expect(findCoordinate($("#opp-game-board .F6"))).toBe("F6","opp-game-board");
        });
    });
    describe("checkOrientation",function(){
        it("should return vertical/true",function(){
            expect(checkOrientation($("#orientation-btn").hasClass("vertical"))).toBe(true);
        });
    });
    describe("checkReadyStatus",function(){
        it("should return false",function(){
            expect(checkReadyStatus(4)).toBe(false);
        });
    });
    describe("intelligenceGuess",function(){
        it("should guess C4",function(){
            expect(intelligenceGuess(B4)).toBe(C4);
        });
    });
    describe("getOpponentCoordinates",function(){
        it("should open a script",function(){
            expect(getOpponentCoordinates(1)).toBe(true);
        });
    });
});