import * as assert from 'assert'
import { IEnrichedChartItem } from './../../src/interfaces/IChartItem'
import { 
    sma,
    ema,
    smaDelta,
    emaDelta,
} from './../../src/engine/analytics/movingAvg'

describe('analytics - movingAvg', () => {
    const chart:IEnrichedChartItem[] = require('./../mocks/appl.json')

    describe('sma', () => {
        const chart:IEnrichedChartItem[] = require('./../mocks/appl.json')
        sma(chart, 3)
    
        it('should resolve p3 sma', () => {
            assert.equal(
                chart[3].sma[3].toFixed(4), 
                ((chart[1].close + chart[2].close + chart[3].close)/3).toFixed(4)
            )
        })
    })

    describe('ema', () => {
        const chart:IEnrichedChartItem[] = require('./../mocks/appl.json')
        ema(chart, 3)
    
        it('should resolve p3 ema', () => {
            assert.equal(
                chart[3].ema[3].toFixed(4), 
                '191.2383'
            )
        })
    })

    describe('smaDelta', () => {
        const chart:IEnrichedChartItem[] = require('./../mocks/appl.json')
        smaDelta(chart, 3)
    
        it('should resolve p3 smaDelta', () => {
            assert.equal(
                chart[3].smaDelta[3].toFixed(4), 
                (chart[3].sma[3] / chart[2].sma[3] - 1).toFixed(4)
            )
        })
    })

    describe('emaDelta', () => {
        const chart:IEnrichedChartItem[] = require('./../mocks/appl.json')
        emaDelta(chart, 3)
    
        it('should resolve p3 ema', () => {
            assert.equal(
                chart[3].emaDelta[3].toFixed(4), 
                (chart[3].ema[3] / chart[2].ema[3] - 1).toFixed(4)
            )
        })
    })
})