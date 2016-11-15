var Game = TicTacToe

var grid
var cells

function initGrid() {
  grid = document.createElement("ul")
  grid.className = "grid"
  grid.id = "tic-tac-toe"
  for (var i = 0; i < Game.size; i++) {
    var row = document.createElement("ul")
    row.className = "row"
    for (var j = 0; j < Game.size; j++) {
      var cell = document.createElement("li")
      cell.className = "cell"
      cell.id = Vector.toIndex([i, j], Game.size)
      cell.title = "(" + i + ", " + j + ")"
      row.appendChild(cell)
    }
    grid.appendChild(row)
  }
  document.body.appendChild(grid)
}

function initListeners() {
  cells = document.getElementsByClassName("cell")
  var cell, i = cells.length
  while (i--) {
    cell = cells[i]
    cell.addEventListener("click", function(event) {
      var cell = event.target
      var index = parseInt(cell.id)
      Game.place(index)
      event.stopPropagation()
    })
  }
  grid.addEventListener("click", function() {
    if (Game.complete) {
      Game.reset()
    }
  })
}

function init() {
  var previous
  initGrid()
  initListeners()
  Game.start()
  Game.on("start", function() {
    grid.classList.remove("complete")
  })
  Game.on("end", function() {
    grid.classList.add("complete")
  })
  Game.on("place", function(event) {
    var index = Vector.toIndex(event.pos, Game.size)
    var cell = document.getElementById(index.toString())
    cell.classList.add(event.player, "filled", "previous")
    if (previous) {
      previous.classList.remove("previous")
    }
    previous = cell
  })
  Game.on("match", function(event) {
    var team = event.player.toUpperCase()
    var matches = event.matches
    // alert("Team " + team + " got " + matches.length + " match" + (matches.length === 1 ? "" : "es") + "!")
    matches.forEach(function(match) {
      match.forEach(function(pos) {
        var index = Vector.toIndex(pos, Game.size)
        var cell = document.getElementById(index.toString())
        cell.classList.add("matched")
      })
    })
  })
  Game.on("reset", function() {
    var cell, i = cells.length
    while (i--) {
      cell = cells[i]
      cell.className = "cell"
    }
  })
}

document.body.onload = init
