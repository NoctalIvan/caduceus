import * as assert from 'assert'
import { IEnrichedChartItem } from './../../src/interfaces/IChartItem'
import { 
    pastChange,
    futureChange
} from './../../src/engine/analytics/pastFutureRatio'

describe('analytics - pastFutureRatio', () => {
    const chart:IEnrichedChartItem[] = require('./../mocks/appl.json')

    describe('analytics - pastChange', () => {
        const chart:IEnrichedChartItem[] = require('./../mocks/appl.json')
        pastChange(chart, 1)
        pastChange(chart, 3)
    
        it('should resolve p1 changes', () => {
            assert.equal(chart[0].pastChange[1], chart[0].close / chart[0].open - 1)
        })
    
        it('should resolve p3 changes', () => {
            assert.equal(chart[3].pastChange[3], chart[3].close / chart[1].open - 1)
        })
    
        it('should ignore early values', () => {
            assert.equal(chart[1].pastChange[3], undefined)
        })
    })

    describe('analytics - futureChange', () => {
        futureChange(chart, 1)
        futureChange(chart, 3)
    
        it('should resolve p1 changes', () => {
            assert.equal(chart[0].futureChange[1], chart[1].close / chart[0].close - 1)
        })
    
        it('should resolve p3 changes', () => {
            assert.equal(chart[0].futureChange[3], chart[3].close / chart[0].close - 1)
        })
    
        it('should ignore late values', () => {
            assert.equal(chart.slice(-1)[0].futureChange, undefined)
        })
    })
})