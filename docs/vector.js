var Vector = (function() {
  var UP_LEFT    = [-1,-1]
  var UP         = [ 0,-1]
  var UP_RIGHT   = [ 1,-1]
  var LEFT       = [-1, 0]
  var RIGHT      = [ 1, 0]
  var DOWN_LEFT  = [-1, 1]
  var DOWN       = [ 0, 1]
  var DOWN_RIGHT = [ 1, 1]
  return {
    UP_LEFT:    UP_LEFT,
    UP:         UP,
    UP_RIGHT:   UP_RIGHT,
    LEFT:       LEFT,
    RIGHT:      RIGHT,
    DOWN_LEFT:  DOWN_LEFT,
    DOWN:       DOWN,
    DOWN_RIGHT: DOWN_RIGHT,
    DIRECTIONS: [UP_LEFT, UP, UP_RIGHT, LEFT, RIGHT, DOWN_LEFT, DOWN, DOWN_RIGHT],
    added: function(a, b) {
      return [a[0] + b[0], a[1] + b[1]]
    },
    scaled: function(vector, scalar) {
      return [vector[0] * scalar, vector[1] * scalar]
    },
    fromIndex: function(index, mapSize) {
      var x = index % mapSize
      return [x, (index - x) / mapSize]
    },
    toIndex: function(pos, mapSize) {
      return pos[1] * mapSize + pos[0]
    },
    isInside: function(pos, mapSize) {
      return pos[0] >= 0 && pos[1] >= 0 && pos[0] <= mapSize - 1 && pos[1] <= mapSize - 1
    }
  }
}())
