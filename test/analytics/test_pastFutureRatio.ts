import * as assert from 'assert'
import { IEnrichedChartItem } from './../../src/interfaces/IChartItem'
import { 
    pastChange,
    futureChange,
    lowestPast,
    highestPast,
    lowestFuture,
    highestFuture
} from './../../src/engine/analytics/pastFutureRatio'

describe('analytics - pastFutureRatio', () => {
    const chart:IEnrichedChartItem[] = require('./../mocks/appl.json')

    describe('pastChange', () => {
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

    describe('futureChange', () => {
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

    describe('lowestPast', () => {
        const chart:IEnrichedChartItem[] = require('./../mocks/appl.json')
        lowestPast(chart, 1)
        lowestPast(chart, 3)
    
        it('should resolve p1 lowest', () => {
            assert.equal(chart[0].lowestPast[1], chart[0].low)
        })
    
        it('should resolve p3 lowest', () => {
            assert.equal(chart[2].lowestPast[3], chart[2].low)
            assert.equal(chart[3].lowestPast[3], chart[2].low)
            assert.equal(chart[4].lowestPast[3], chart[2].low)
            assert.equal(chart[5].lowestPast[3], chart[5].low)
        })
    
        it('should ignore early values', () => {
            assert.equal(chart[1].lowestPast[3], undefined)
        })
    })

    describe('lowestPast', () => {
        const chart:IEnrichedChartItem[] = require('./../mocks/appl.json')
        lowestPast(chart, 1)
        lowestPast(chart, 3)
    
        it('should resolve p1', () => {
            assert.equal(chart[0].lowestPast[1], chart[0].low)
        })
    
        it('should resolve p3', () => {
            assert.equal(chart[2].lowestPast[3], chart[2].low)
            assert.equal(chart[3].lowestPast[3], chart[2].low)
            assert.equal(chart[4].lowestPast[3], chart[2].low)
            assert.equal(chart[5].lowestPast[3], chart[5].low)
        })
    
        it('should ignore early values', () => {
            assert.equal(chart[1].lowestPast[3], undefined)
        })
    })

    describe('highestPast', () => {
        const chart:IEnrichedChartItem[] = require('./../mocks/appl.json')
        highestPast(chart, 1)
        highestPast(chart, 3)
    
        it('should resolve p1', () => {
            assert.equal(chart[0].highestPast[1], chart[0].high)
        })
    
        it('should resolve p3', () => {
            assert.equal(chart[2].highestPast[3], chart[0].high)
            assert.equal(chart[3].highestPast[3], chart[1].high)
            assert.equal(chart[4].highestPast[3], chart[4].high)
        })
    
        it('should ignore early values', () => {
            assert.equal(chart[1].highestPast[3], undefined)
        })
    })

    describe('lowestFuture', () => {
        const chart:IEnrichedChartItem[] = require('./../mocks/appl.json')
        lowestFuture(chart, 1)
        lowestFuture(chart, 3)
    
        it('should resolve p1', () => {
            assert.equal(chart[0].lowestFuture[1], chart[1].low)
        })
    
        it('should resolve p3', () => {
            assert.equal(chart[2].lowestFuture[3], Math.min(...chart.slice(3,6).map(a => a.low)))
        })
    
        it('should ignore late values', () => {
            assert.equal(chart.slice(-1)[0].futureChange, undefined)
        })
    })

    describe('highestFuture', () => {
        const chart:IEnrichedChartItem[] = require('./../mocks/appl.json')
        highestFuture(chart, 1)
        highestFuture(chart, 3)
    
        it('should resolve p1', () => {
            assert.equal(chart[0].highestFuture[1], chart[1].high)
        })
    
        it('should resolve p3', () => {
            assert.equal(chart[2].highestFuture[3], Math.max(...chart.slice(3,6).map(a => a.high)))
        })
    
        it('should ignore late values', () => {
            assert.equal(chart.slice(-1)[0].futureChange, undefined)
        })
    })
})