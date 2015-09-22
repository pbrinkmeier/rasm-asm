'use strict'

module.exports = function errorAtLine (line) {
  return '\nAt line ' + String(line.number + 1) + ": '" + line.text + "'"
}
