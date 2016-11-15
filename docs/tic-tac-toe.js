var TicTacToe = (function() {
  var x = true
  var o = false
  var events = {}
  var Game = {
    inProgress: false,
    complete: false,
    pieces: null,
    turn: null,
    state: null,
    size: 3,
    start: function() {
      Game.inProgress = true
      Game.pieces = 0
      Game.turn = x
      Game.state = []
      for (var i = 0; i < Math.pow(Game.size, 2); i++) {
        Game.state.push(null)
      }
      Game.emit("start", {})
    },
    reset: function() {
      Game.complete = false
      Game.emit("reset", {})
      Game.start()
    },
    place: function(index, type) {
      var pos = Vector.fromIndex(index, Game.size)
      if (Game.state[index] === null) {
        if (arguments.length < 2) {
          type = Game.turn
          Game.turn = !Game.turn
        }
        Game.state[index] = type
        var matches = []
        var directions = [Vector.UP_LEFT, Vector.UP, Vector.UP_RIGHT, Vector.RIGHT]
        directions.forEach(function(direction) {
          var currentType
          var currentIndex
          var currentPos
          var match = []
          var r = Game.size - 1
          var imin =-r
          var imax = r
          for (var i = imin; i <= imax; i++) {
            currentPos = Vector.added(pos, Vector.scaled(direction, i))
            if (Vector.isInside(currentPos, Game.size)) {
              currentIndex = Vector.toIndex(currentPos, Game.size)
              currentType  = Game.state[currentIndex]
              if (type === currentType) {
                match.push(currentPos)
                if (match.length >= 3) {
                  matches.push(match)
                  return
                }
              } else {
                return
              }
            }
          }
        })
        Game.pieces++
        Game.emit("place", {
          pos: pos,
          player: (type ? "x" : "o")
        })
        if (matches.length) {
          var player = (type ? "x" : "o")
          Game.emit("match", {
            player: player,
            matches: matches
          })
          Game.emit("end", {
            result: player
          })
        } else {
          if (Game.pieces === Math.pow(Game.size, 2)) {
            Game.emit("draw", {})
            Game.emit("end", {
              result: "draw"
            })
          }
        }
      }
    },
    emit: function(eventName, data) {
      var callbacks = events[eventName]
      if (callbacks) {
        callbacks.forEach(function(callback) {
          callback.call(data, data)
        })
      }
    },
    on: function(eventName, callback) {
      var callbacks = events[eventName]
      if (!callbacks) {
        callbacks = events[eventName] = []
      }
      callbacks.push(callback)
    }
  }
  Game.on("end", function() {
    Game.complete = true
    Game.inProgress = false
  })
  return Game
}())
