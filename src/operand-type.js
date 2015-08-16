'use strict'

module.exports = function operandType (operand) {
  var type

  switch (operand[0]) {
    case 'r':
      if (operand[1].match(/[0-9]/) === null) {
        type = 'label'
      } else {
        type = 'register'
      }

      break
    case '#':
      type = 'constant'

      break
    case '@':
      if (operand[1] === 'r') {
        type = 'relative'
      } else {
        type = 'address'
      }

      break
    default:
      type = 'label'

      break
  }

  return type
}
