describe("Box", function() {

  describe("setSymbol", function() {
    it("lets you set its value", function() {
      var box = Object.create(Box);
      box.setSymbol("x");
      box.symbol.should.equal("x");
    });
  });  

  describe("setColumn", function() {
    it("lets you set the column position", function() {
      var box = Object.create(Box);
      box.setColumn(1);
      box.column.should.equal(1);
    });
  });  

  describe("setRow", function() {
    it("lets you set the row position", function() {
      var box = Object.create(Box);
      box.setRow(1);
      box.row.should.equal(1);
    });
  });  

  describe("setChosen", function() {
    it("lets you set its symbol as 'chosen'", function() {
      var box = Object.create(Box);
      box.setChosen();
      box.chosen.should.equal(true);
    });
  });
});  

describe("Player", function() {
  it("lets you create player with symbol either 'X' or 'O'", function() {
    var player = Object.create(Player);
    player.setSymbol("x");
    player.symbol.should.equal("x");
  });
});

describe("Game", function() {

  describe("createTwoPlayers", function() {  
    it("lets you create two players", function() {
      var game = Object.create(Game);
      game.createTwoPlayers();
      game.players.length.should.equal(2);
    });
  });  
  
  describe("createBoard", function() {
    it("creates a tic tac toe gameboard", function() {
      var game = Object.create(Game);
      game.createBoard();
      game.board[0].row.should.equal(1);
    });
  
    it("has a board with 9 boxes", function() {
      var game = Object.create(Game);
      game.createBoard();
      game.board.length.should.equal(9);
    });
  });
  
  describe("nextPlayer", function() {
    it("sets the current player in the game", function() {
      var game = Object.create(Game);
      game.createTwoPlayers();
      game.nextPlayer();
      game.currentPlayer.symbol.should.equal("x");
    });
  });  

  describe("turn", function() {
 
    it("changes the current player to the next player", function() {
      var game = Object.create(Game);
      game.createTwoPlayers();
      game.createBoard();
      game.turn(game.board[0]);
      var player = game.currentPlayer;
      game.turn(game.board[1]);
      game.currentPlayer.should.not.equal(player);
    });

    it("Sets the box symbol to the player's symbol when they choose the box", function() {
      var game = Object.create(Game);
      game.createTwoPlayers();
      game.createBoard();
      game.turn(game.board[0]);
      game.board[0].symbol.should.equal(game.currentPlayer.symbol);
    });
  });

  describe("checkDiagonal", function() {
    it("returns true if there are 3 of the same symbols in diagonal", function () {
      var game = Object.create(Game);
      game.createTwoPlayers();
      game.createBoard();
      game.turn(game.board[2]);
      game.turn(game.board[0]);
      game.turn(game.board[4]);
      game.turn(game.board[3]);
      game.turn(game.board[6]);
      game.checkDiagonal().should.equal(true);
    });

    it("returns false if there are not 3 of the same symbol diagonally", function() {
      var game = Object.create(Game);
      game.createTwoPlayers();
      game.createBoard();
      game.turn(game.board[0]);
      game.checkDiagonal().should.equal(false);
    });
  });

  describe("checkHorizontal", function() {
    it("returns true if there are 3 of the same symbols in a row", function () {
      var game = Object.create(Game);
      game.createTwoPlayers();
      game.createBoard();
      game.turn(game.board[3]);
      game.turn(game.board[0]);
      game.turn(game.board[4]);
      game.turn(game.board[6]);
      game.turn(game.board[5]);
      game.checkHorizontal().should.equal(true);
    });
  
    it("returns false if there are not 3 of the same symbols in a row", function () {
      var game = Object.create(Game);
      game.createTwoPlayers();
      game.createBoard();
      game.nextPlayer();
      game.turn(game.board[0]);
      game.checkHorizontal().should.equal(false);
    });
  });   

  describe("checkVertical", function() {
    it("returns true if there are 3 of the same symbols in a column", function () {
      var game = Object.create(Game);
      game.createTwoPlayers();
      game.createBoard();
      game.turn(game.board[1]);
      game.turn(game.board[2]);
      game.turn(game.board[4]);
      game.turn(game.board[5]);
      game.turn(game.board[7]);
      game.checkVertical().should.equal(true);
    });
    
    it("returns false if there are not 3 of the same symbols in a row", function() {
      var game = Object.create(Game);
      game.createTwoPlayers();
      game.createBoard();
      game.turn(game.board[0]);
    });
  });  

  describe("over", function() {
    it("returns false if there are not 3 in a row", function() {
      var game = Object.create(Game);
      game.createTwoPlayers();
      game.createBoard();
      game.turn(game.board[0]);
      game.over().should.equal(false);
    });

    it("returns true if there are 3 in a row", function() {
      var game = Object.create(Game);
      game.createTwoPlayers();
      game.createBoard();
      game.turn(game.board[0]);
      game.turn(game.board[2]);
      game.turn(game.board[3]);
      game.turn(game.board[4]);
      game.turn(game.board[6]);
      game.over().should.equal(true);
    });

    it("returns true if there are 3 of the same diagonally", function() {
      var game = Object.create(Game);
      game.createTwoPlayers();
      game.createBoard();
      game.turn(game.board[0]);
      game.turn(game.board[2]);
      game.turn(game.board[4]);
      game.turn(game.board[3]);
      game.turn(game.board[8]);
      game.over().should.equal(true);
    });
  });

  describe("cats", function() {
    it("returns false if all boxes do not yet have a symbol", function() {
      var game = Object.create(Game);
      game.createTwoPlayers();
      game.createBoard();
      game.turn(game.board[0]);
      game.turn(game.board[1]);
      game.turn(game.board[2]);
      game.turn(game.board[3]);
      game.turn(game.board[4]);
      game.turn(game.board[8]);
      game.turn(game.board[6]);
      game.turn(game.board[7]);
      game.turn(game.board[5]);
      game.cats().should.equal(true);
    });

    it("returns true if all boxes have a symbol", function() {
      var game = Object.create(Game);
      game.createTwoPlayers();
      game.createBoard();
      game.turn(game.board[0]);
      game.cats().should.equal(false);
    });
  });
});
