'use strict'

var assert = require('assert')

var operandType = require('../src/operand-type.js')

describe('string operandType(string)', function () {
  it('returns the right type of an operand as a string', function () {
    assert.strictEqual(operandType('r0'), 'register')
    assert.strictEqual(operandType('r3'), 'register')
    assert.strictEqual(operandType('#00'), 'constant')
    assert.strictEqual(operandType('#2a'), 'constant')
    assert.strictEqual(operandType('@2a'), 'address')
    assert.strictEqual(operandType('@r0'), 'relative')
    assert.strictEqual(operandType('fourty.two'), 'label')
    assert.strictEqual(operandType('rpm'), 'label')
    assert.strictEqual(operandType('rx'), 'label')
  })
})
