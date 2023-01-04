import { describe, it, expect } from 'vitest'
import { Id, split, listToDirection } from '../../../src/util'

describe('util functions', () => {
  describe('Id', () => {
    it('sequentially generates id starting with 0', () => {
      const results = [...Array(5)].map(() => Id())

      expect(results).toStrictEqual([0, 1, 2, 3, 4])
    })
  })

  describe('split', () => {
    it('splits space-separated string into array', () => {
      const value = 'taco pizza sushi'
      const result = split(value)

      expect(result).toStrictEqual(['taco', 'pizza', 'sushi'])
    })

    it('splits tab-separated string into array', () => {
      const value = 'taco\tpizza\tsushi'
      const result = split(value)

      expect(result).toStrictEqual(['taco', 'pizza', 'sushi'])
    })

    it('removes empty string items', () => {
      const value = 'taco \n \n \n'
      const result = split(value)

      expect(result).toStrictEqual(['taco'])
    })
  })

  describe('listToDirection', () => {
    it('returns object with x and y keys representing location', () => {
      const scenarios = [
        { value: 'top left', result: { x: 'left', y: 'top' } },
        { value: 'top center', result: { x: 'center', y: 'top' } },
        { value: 'top right', result: { x: 'right', y: 'top' } },
        { value: 'bottom left', result: { x: 'left', y: 'bottom' } },
        { value: 'bottom center', result: { x: 'center', y: 'bottom' } },
        { value: 'bottom right', result: { x: 'right', y: 'bottom' } },
      ]

      scenarios.forEach((scenario) => {
        const result = listToDirection(scenario.value)

        expect(result).toStrictEqual(scenario.result)
      })
    })

    it('when location is invalid', () => {
      const scenarios = [
        { value: 'top pizza', result: { x: '', y: 'top' } },
        { value: 'pizza right', result: { x: 'right', y: '' } },
        { value: 'taco pizza', result: { x: '', y: '' } },
      ]

      scenarios.forEach((scenario) => {
        const result = listToDirection(scenario.value)

        expect(result).toStrictEqual(scenario.result)
      })
    })
  })
})
