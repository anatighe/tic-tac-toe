var Box = {
  setSymbol: function(input) {
    this.symbol = input;
  },
  setColumn: function(input) {
    this.column = input;
  },
  setRow: function(input) {
    this.row = input;
  },
  setChosen: function() {
    this.chosen = true;
  }
}

var Player = {
  setSymbol: function(symbol) {
    this.symbol = symbol;
  }
}

var Game = {
  createTwoPlayers: function() {
    this.players = [];
    var player1 = Object.create(Player);
    player1.setSymbol("x");
    this.players.push(player1);
    var player2 = Object.create(Player);
    player2.setSymbol("o");
    this.players.push(player2);
  },

  createBoard: function() {
    this.board = [];
    for (var i=1; i<4; i++) {
      for (var j=1; j<4; j++) {
        var box = Object.create(Box);
        box.setSymbol("");
        box.setColumn(j);
        box.setRow(i);
        this.board.push(box);
      }
    }
  },

  nextPlayer: function() {
    this.currentPlayer = this.players.shift();
    this.players.push(this.currentPlayer);
  },

  turn: function(box) {
    this.nextPlayer();
    box.setSymbol(this.currentPlayer.symbol);
    box.setChosen(true);
  },

  checkDiagonal: function() {
    return (this.board[0].symbol === this.board[4].symbol && 
        this.board[4].symbol === this.board[8].symbol && 
        this.board[0].symbol !== "") ||
      (this.board[2].symbol === this.board[4].symbol && 
        this.board[4].symbol === this.board[6].symbol && 
        this.board[2].symbol !== "");
  },

  checkHorizontal: function() {
    for (var i = 0; i < 7; i+=3) { 
      if (this.board[i].symbol === this.board[i+1].symbol && this.board[i+1].symbol === this.board[i+2].symbol && this.board[i].symbol !== "") {
        return true;
      }
    } return false;
   },

  checkVertical: function() {
    for (var i = 0; i < 3; i++) {
      if (this.board[i].symbol === this.board[i+3].symbol && this.board[i+3].symbol === this.board[i+6].symbol && this.board[i].symbol !== "") {
        return true;
      }
    } return false;
  },

  over: function() {  
    return this.checkDiagonal() || this.checkHorizontal() || this.checkVertical();
  },

  cats: function() {
    for (var i = 0; i < 9; i++) {
      if (!this.board[i].chosen) {
        return false;
      }
    } return true;
  }
}

$(function() {
  $(window).load(function() {
    $(".start").click(function() {
      location.reload();
    });
    var game = Object.create(Game);
    game.createTwoPlayers();
    game.createBoard();
    game.board.forEach(function(box, index) {
      $("td#" + index).last().click(function() {
        if (box.chosen) {
          $(".result").empty().append("That square is already taken!");
        } else {
          game.turn(game.board[index]);
          $("td#" + index).append(game.board[index].symbol); 
        }  

        if (game.over()) {
          $(".result").empty().append((game.board[index].symbol.toUpperCase()) + "  is the winner!");
          $(".start").show();
        } else if (game.cats()) {
          $(".result").empty().append("Cat's game!");
          $(".start").show();

        }
      });
    });  
  });  
});  
