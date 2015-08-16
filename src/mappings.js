'use strict'

module.exports = {
  halt: {
    base: 0x00,
    params: []
  },
  int: {
    base: 0x10,
    params: [
      {
        types: [ 'constant' ],
        typeTo: null,
        valueTo: [ 0, 8 ]
      }
    ]
  },
  cmp: {
    base: 0x20,
    params: [
      {
        types: [ 'register' ],
        typeTo: null,
        valueTo: [ 10, 2 ]
      },
      {
        types: [ 'register', 'constant' ],
        typeTo: [ 8, 2 ],
        valueTo: [ 0, 8 ]
      }
    ]
  },
  jmp: {
    base: 0x31,
    params: [
      {
        types: [ 'constant' ],
        typeTo: null,
        valueTo: [ 0, 8 ]
      }
    ]
  },
  call: {
    base: 0x41,
    params: [
      {
        types: [ 'constant' ],
        typeTo: null,
        valueTo: [ 0, 8 ]
      }
    ]
  },
  ret: {
    base: 0x50,
    params: []
  },
  jz: {
    base: 0x60,
    params: [
      {
        types: [ 'constant' ],
        typeTo: null,
        valueTo: [0, 8]
      }
    ]
  },
  jnz: {
    base: 0x61,
    params: [
      {
        types: [ 'constant' ],
        typeTo: null,
        valueTo: [0, 8]
      }
    ]
  },
  jc: {
    base: 0x62,
    params: [
      {
        types: [ 'constant' ],
        typeTo: null,
        valueTo: [0, 8]
      }
    ]
  },
  jnc: {
    base: 0x63,
    params: [
      {
        types: [ 'constant' ],
        typeTo: null,
        valueTo: [0, 8]
      }
    ]
  },
  ld: {
    base: 0x70,
    params: [
      {
        types: [ 'register' ],
        typeTo: null,
        valueTo: [ 10, 2 ]
      },
      {
        types: [ 'register', 'constant', 'address', 'relative' ],
        typeTo: [ 8, 2 ],
        valueTo: [ 0, 8 ]
      }
    ]
  },
  st: {
    base: 0x80,
    params: [
      {
        types: [ 'register' ],
        typeTo: null,
        valueTo: [ 10, 2 ]
      },
      {
        types: [ 'address', 'relative' ],
        typeTo: [ 8, 2 ],
        valueTo: [ 0, 8 ]
      }
    ]
  },
  add: {
    base: 0x90,
    params: [
      {
        types: [ 'register' ],
        typeTo: null,
        valueTo: [ 10, 2 ]
      },
      {
        types: [ 'register', 'constant' ],
        typeTo: [ 8, 2 ],
        valueTo: [ 0, 8 ]
      }
    ]
  },
  sub: {
    base: 0xa0,
    params: [
      {
        types: [ 'register' ],
        typeTo: null,
        valueTo: [ 10, 2 ]
      },
      {
        types: [ 'register', 'constant' ],
        typeTo: [ 8, 2 ],
        valueTo: [ 0, 8 ]
      }
    ]
  },
  and: {
    base: 0xb0,
    params: [
      {
        types: [ 'register' ],
        typeTo: null,
        valueTo: [ 10, 2 ]
      },
      {
        types: [ 'register', 'constant' ],
        typeTo: [ 8, 2 ],
        valueTo: [ 0, 8 ]
      }
    ]
  },
  or: {
    base: 0xc0,
    params: [
      {
        types: [ 'register' ],
        typeTo: null,
        valueTo: [ 10, 2 ]
      },
      {
        types: [ 'register', 'constant' ],
        typeTo: [ 8, 2 ],
        valueTo: [ 0, 8 ]
      }
    ]
  },
  xor: {
    base: 0xd0,
    params: [
      {
        types: [ 'register' ],
        typeTo: null,
        valueTo: [ 10, 2 ]
      },
      {
        types: [ 'register', 'constant' ],
        typeTo: [ 8, 2 ],
        valueTo: [ 0, 8 ]
      }
    ]
  },
  inc: {
    base: 0xe0,
    params: [
      {
        types: [ 'register' ],
        typeTo: null,
        valueTo: [ 0, 2 ]
      }
    ]
  },
  dec: {
    base: 0xe1,
    params: [
      {
        types: [ 'register' ],
        typeTo: null,
        valueTo: [ 0, 2 ]
      }
    ]
  },
  not: {
    base: 0xe2,
    params: [
      {
        types: [ 'register' ],
        typeTo: null,
        valueTo: [ 0, 2 ]
      }
    ]
  },
  asl: {
    base: 0xe3,
    params: [
      {
        types: [ 'register' ],
        typeTo: null,
        valueTo: [ 0, 2 ]
      }
    ]
  },
  asr: {
    base: 0xe4,
    params: [
      {
        types: [ 'register' ],
        typeTo: null,
        valueTo: [ 0, 2 ]
      }
    ]
  },
  push: {
    base: 0xf0,
    params: [
      {
        types: [ 'register' ],
        typeTo: null,
        valueTo: [ 10, 2 ]
      }
    ]
  },
  pop: {
    base: 0xf1,
    params: [
      {
        types: [ 'register' ],
        typeTo: null,
        valueTo: [ 10, 2 ]
      }
    ]
  }
}
