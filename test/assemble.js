'use strict'

var assert = require('assert')
var fs = require('fs')
var path = require('path')

var assemble = require('../src/assemble.js')

var source = {
  labels: fs.readFileSync(
    path.join(__dirname, '../examples/labels.rasm'),
    { encoding: 'utf8' }
  ),
  rpm: fs.readFileSync(
    path.join(__dirname, '../examples/rpm.rasm'),
    { encoding: 'utf8' }
  ),
  hello: fs.readFileSync(
    path.join(__dirname, '../examples/hello.rasm'),
    { encoding: 'utf8' }
  )
}

describe('rasm-asm', function () {
  it('throws an error if an unknown instruction is given', function () {
    assert.throws(
      function () {
        assemble('mrltbrnft #2a')
      },
      /Unknown instruction: mrltbrnft/
    )
  })

  it('can assemble the right codes', function () {
    assert.deepEqual(assemble('halt'), [0x00, 0x00])

    assert.deepEqual(assemble('int #2a'), [0x10, 0x2a])

    assert.deepEqual(assemble('cmp r0 r1'), [0x20, 0x01])
    assert.deepEqual(assemble('cmp r3 #2a'), [0x2d, 0x2a])

    assert.deepEqual(assemble('jmp #2a'), [0x31, 0x2a])

    assert.deepEqual(assemble('call #2a'), [0x41, 0x2a])

    assert.deepEqual(assemble('ret'), [0x50, 0x00])

    assert.deepEqual(assemble('jz #2a'), [0x60, 0x2a])
    assert.deepEqual(assemble('jnz #2a'), [0x61, 0x2a])
    assert.deepEqual(assemble('jc #2a'), [0x62, 0x2a])
    assert.deepEqual(assemble('jnc #2a'), [0x63, 0x2a])

    assert.deepEqual(assemble('ld r0 r1'), [0x70, 0x01])
    assert.deepEqual(assemble('ld r0 #2a'), [0x71, 0x2a])
    assert.deepEqual(assemble('ld r0 @2a'), [0x72, 0x2a])
    assert.deepEqual(assemble('ld r0 @r1'), [0x73, 0x01])

    assert.deepEqual(assemble('st r0 @2a'), [0x82, 0x2a])
    assert.deepEqual(assemble('st r0 @r1'), [0x83, 0x01])

    assert.deepEqual(assemble('add r0 r1'), [0x90, 0x01])
    assert.deepEqual(assemble('add r0 #2a'), [0x91, 0x2a])

    assert.deepEqual(assemble('sub r0 r1'), [0xa0, 0x01])
    assert.deepEqual(assemble('sub r0 #2a'), [0xa1, 0x2a])

    assert.deepEqual(assemble('and r0 r1'), [0xb0, 0x01])
    assert.deepEqual(assemble('and r0 #2a'), [0xb1, 0x2a])

    assert.deepEqual(assemble('or r0 r1'), [0xc0, 0x01])
    assert.deepEqual(assemble('or r0 #2a'), [0xc1, 0x2a])

    assert.deepEqual(assemble('xor r0 r1'), [0xd0, 0x01])
    assert.deepEqual(assemble('xor r0 #2a'), [0xd1, 0x2a])

    assert.deepEqual(assemble('inc r0'), [0xe0, 0x00])
    assert.deepEqual(assemble('dec r1'), [0xe1, 0x01])
    assert.deepEqual(assemble('not r0'), [0xe2, 0x00])
    assert.deepEqual(assemble('asl r0'), [0xe3, 0x00])
    assert.deepEqual(assemble('asr r3'), [0xe4, 0x03])

    assert.deepEqual(assemble('push r0'), [0xf0, 0x00])
    assert.deepEqual(assemble('pop r3'), [0xfd, 0x00])

  })

  it('can assemble number constants into the code', function () {
    assert.deepEqual(
      assemble('.num #00\n.num #2a\n.num #42\n'),
      [
        0x00,
        0x2a,
        0x42
      ]
    )
  })

  it('can assemble string constants into the code', function () {
    assert.deepEqual(
      assemble('.str Hello, World!'),
      [
        0x48,
        0x65,
        0x6c,
        0x6c,
        0x6f,
        0x2c,
        0x20,
        0x57,
        0x6f,
        0x72,
        0x6c,
        0x64,
        0x21
      ]
    )
  })

  it('throws an error if an instruction is given the wrong number of parameters', function () {
    assert.throws(
      function () {
        assemble('int #2a @2b r0')
      },
      /Wrong number of parameters for int \(3 instead of 1\)/
    )
  })

  it('throws an error if a parameter has an invalid type', function () {
    assert.throws(
      function () {
        assemble('add #20 #0a')
      },
      /Illegal type for parameter 1 of add \(must be one of: register\)/
    )
  })

  it('can assemble programs with labels', function () {
    assert.deepEqual(
      assemble(source.labels),
      [
        0x71, 0x0a,
        0x75, 0x60,
        0x21, 0x00,
        0x60, 0x10,
        0x83, 0x01,
        0xe0, 0x00,
        0xe0, 0x01,
        0x31, 0x04,
        0x00, 0x00
      ]
    )
  })

  it('can assemble the russian peasant algorithm', function () {
    assert.deepEqual(
      assemble(source.rpm),
      [
        0x31, 0x1a,
        0x79, 0x00,
        0x21, 0x00,
        0x60, 0x18,
        0x7c, 0x00,
        0xbd, 0x01,
        0x2d, 0x01,
        0x61, 0x12,
        0x98, 0x01,
        0xe4, 0x00,
        0xe3, 0x01,
        0x31, 0x04,
        0x50, 0x00,
        0x71, 0x06,
        0x75, 0x07,
        0x41, 0x02,
        0x00, 0x00
      ]
    )
  })

  it('can assemble programs with constants', function () {
    assert.deepEqual(
      assemble(source.hello),
      [
        0x31, 0x10,
        0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x2c, 0x20, 0x57, 0x6f, 0x72, 0x6c, 0x64, 0x21,
        0x00,
        0x71, 0x02,
        0x75, 0xe0,
        0x7b, 0x00,
        0x29, 0x00,
        0x60, 0x22,
        0x8b, 0x01,
        0xe0, 0x00,
        0xe0, 0x01,
        0x31, 0x14,
        0x00, 0x00
      ]
    )
  })
})
