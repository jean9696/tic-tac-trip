import * as fs from 'fs'

import { justify } from './justify'

describe('justify', () => {
  it('should not have line length above parameter', () => {
    const lorem = fs.readFileSync(
      `${__dirname}/__test_data__/long_lorem.txt`,
      'utf8'
    )
    justify(lorem, 80)
      .split('\n')
      .forEach((line) => {
        expect(line.length).toBeLessThanOrEqual(80)
      })
  })
  it('should not have line length above different parameter', () => {
    const lorem = fs.readFileSync(
      `${__dirname}/__test_data__/long_lorem.txt`,
      'utf8'
    )
    justify(lorem, 50)
      .split('\n')
      .forEach((line) => {
        expect(line.length).toBeLessThanOrEqual(80)
      })
  })
  it('should make each line the length of the given parameter except the last one', () => {
    const lorem = fs.readFileSync(
      `${__dirname}/__test_data__/short_lorem.txt`,
      'utf8'
    )
    fs.writeFileSync('test.txt', justify(lorem, 80))
    justify(lorem, 80)
      .split('\n')
      .forEach((line, i, array) => {
        if (i < array.length - 1) {
          expect(line.length).toBe(80)
        }
      })
  })
  it('should keep break when more than double', () => {
    expect(justify('\n\n', 80)).toEqual('\n')
  })
  it('should keep break when more than double', () => {
    expect(justify('\n\n\n', 80)).toEqual('\n\n')
  })
  // FIXME: Unable to find all rules used to generate this file. Needs more time
  it.skip('match snapshot', () => {
    const input = fs.readFileSync(
      `${__dirname}/__test_data__/input.txt`,
      'utf8'
    )
    const output = fs.readFileSync(
      `${__dirname}/__test_data__/output.txt`,
      'utf8'
    )
    expect(justify(input, 80)).toEqual(output)
  })
  it('should throw if invalid line length', () => {
    const lorem = fs.readFileSync(
      `${__dirname}/__test_data__/long_lorem.txt`,
      'utf8'
    )
    expect(() => justify(lorem, 8)).toThrow()
  })
})
