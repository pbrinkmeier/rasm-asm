'use strict'

var errorAtLine = require('./error-at-line.js')
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
    // remove white space
    // add line numbers
    .map(function (line, lineNumber) {
      return {
        text: line.split(';')[0].trim(),
        number: lineNumber
      }
    })
    // remove empty lines
    .filter(function (line) {
      return line.text !== ''
    })

  var code = []
  var labels = {}
  var replacements = []

  lines.forEach(function (line) {
    var text = line.text
    var _split
    var instruction
    var operands
    var firstByte
    var secondByte

    if (text[text.length - 1] === ':') {
      labels[text.slice(0, -1)] = code.length
    } else {
      _split = text.split(' ')
      instruction = _split[0]
      operands = _split.slice(1)
      firstByte = 0x00
      secondByte = 0x00

      switch (instruction) {
        case '.num':
          code.push(operandValue(operands[0]))

          break
        case '.str':
          operands
          .join(' ')
          .split('')
          .forEach(function (character) {
            code.push(character.charCodeAt(0))
          })

          break
        default:
          if (!mappings.hasOwnProperty(instruction)) {
            throw new Error('Unknown instruction: ' + instruction + errorAtLine(line))
          }

          if (operands.length !== mappings[instruction].params.length) {
            throw new Error('Wrong number of parameters for ' + instruction + ' (' + String(operands.length) + ' instead of ' + String(mappings[instruction].params.length) + ')')
          }

          firstByte |= mappings[instruction].base

          operands.forEach(function (operand, index) {
            var opSpec = mappings[instruction].params[index]
            var type = operandType(operand)
            var typeNumber
            var value

            if (type === 'label') {
              replacements.push({
                address: code.length + 1,
                with: operand
              })

              typeNumber = modes.constant
            } else {
              value = operandValue(operand)
              typeNumber = modes[type]

              if (opSpec.types.indexOf(type) === -1) {
                throw new Error('Illegal type for parameter ' + String(index + 1) + ' of ' + instruction + ' (must be one of: ' + opSpec.types.join(', ') + ')')
              }

              if (opSpec.valueTo[0] > 7) {
                firstByte |= (value << (opSpec.valueTo[0] % 8))
              } else {
                secondByte |= (value << (opSpec.valueTo[0]))
              }
            }

            if (opSpec.typeTo !== null) {
              if (opSpec.typeTo[0] > 7) {
                firstByte |= (typeNumber << (opSpec.typeTo[0] % 8))
              } else {
                secondByte |= (typeNumber << (opSpec.typeTo[0]))
              }
            }
          })

          code.push(firstByte, secondByte)

          break
      }
    }
  })

  replacements.forEach(function (replacement) {
    code[replacement.address] = labels[replacement.with]
  })

  return code
}
