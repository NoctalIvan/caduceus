import * as assert from 'assert'
import { IEnrichedChartItem } from './../../src/interfaces/IChartItem'
import { 
    sma,
    ema,
    wma,
    wema,
    smaDelta,
} from './../../src/engine/analytics/movingAvg'

describe('analytics - movingAvg', () => {
    const chart:IEnrichedChartItem[] = require('./../mocks/appl.json')

    describe('sma & co', () => {
        const chart:IEnrichedChartItem[] = require('./../mocks/appl.json')
        sma(chart, 3)
        ema(chart, 3)
        wma(chart, 3)
        wema(chart, 3)
    
        it('should resolve p3', () => {
            assert.equal(chart[3].sma[3].toFixed(2), '190.15')
            assert.equal(chart[3].ema[3].toFixed(2), '191.24')
            assert.equal(chart[3].wma[3].toFixed(2), '190.01')
            assert.equal(chart[3].wema[3].toFixed(2), '191.18')
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
})