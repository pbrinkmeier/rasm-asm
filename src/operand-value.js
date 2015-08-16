'use strict'

var operandType = require('./operand-type.js')

module.exports = function operandValue (operand) {
  var value

  switch (operandType(operand)) {
    case 'register':
    case 'constant':
    case 'address':
      value = operand.slice(1)

      break
    case 'relative':
      value = operand.slice(2)

      break
  }

  return parseInt(value, 16)
}
