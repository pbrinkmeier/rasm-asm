'use strict'

var mappings = require('./mappings.js')
var operandType = require('./operand-type.js')
var operandValue = require('./operand-value.js')

var modes = {
  register: 0,
  constant: 1,
  address: 2,
  relative: 3
}

module.exports = function assemble (raw) {
  var lines = raw
    .split('\n')
    // remove comments
    .filter(function (line) {
      return line[0] !== ';'
    })
    // trim whitespace
    .map(function (line) {
      return line.trim()
    })
    // remove empty lines
    .filter(function (line) {
      return line !== ''
    })

  var code = []
  var labels = {}
  var replacements = []

  lines.forEach(function (line) {
    var _split
    var instruction
    var operands
    var firstByte
    var secondByte

    if (line[line.length - 1] === ':') {
      labels[line.slice(0, -1)] = code.length
    } else {
      _split = line.split(' ')
      instruction = _split[0]
      operands = _split.slice(1)
      firstByte = 0x00
      secondByte = 0x00

      if (operands.length !== mappings[instruction].params.length) {
        throw new Error('Wrong number of parameters for ' + instruction + ' (' + String(operands.length) + ' instead of ' + String(mappings[instruction].params.length) + ')')
      }

      firstByte |= mappings[instruction].base

      operands.forEach(function (operand, index) {
        var opSpec = mappings[instruction].params[index]
        var type = operandType(operand)
        var typeNumber = modes[type]
        var value

        if (type === 'label') {
          replacements.push({
            address: code.length + 1,
            with: operand
          })
        } else {
          value = operandValue(operand)

          if (opSpec.types.indexOf(type) === -1) {
            throw new Error('Illegal type for parameter ' + String(index + 1) + ' of ' + instruction + ' (must be one of: ' + opSpec.types.join(', ') + ')')
          }

          if (opSpec.typeTo !== null) {
            if (opSpec.typeTo[0] > 7) {
              firstByte |= (typeNumber << (opSpec.typeTo[0] % 8))
            } else {
              secondByte |= (typeNumber << (opSpec.typeTo[0]))
            }
          }

          if (opSpec.valueTo[0] > 7) {
            firstByte |= (value << (opSpec.valueTo[0] % 8))
          } else {
            secondByte |= (value << (opSpec.valueTo[0]))
          }
        }
      })

      code.push(firstByte, secondByte)
    }
  })

  replacements.forEach(function (replacement) {
    code[replacement.address] = labels[replacement.with]
  })

  return code
}
