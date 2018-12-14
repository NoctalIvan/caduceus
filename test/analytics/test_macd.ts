import * as assert from 'assert'
import { IEnrichedChartItem } from './../../src/interfaces/IChartItem'
import { macd } from './../../src/engine/analytics/macd'

describe('analytics - macd', () => {
    const chart:IEnrichedChartItem[] = require('./../mocks/appl.json')

    it('macd', () => {
        macd(chart, 2, 3, 2)
        assert.deepEqual(chart[6].macd['2_3_2'].toFixed(2), '-2.37')
        assert.deepEqual(chart[6].macdDelta['2_3_2'].toFixed(2), '1.29')
        assert.deepEqual(chart[6].macdSignal['2_3_2'].toFixed(2), '-1.85')
        assert.deepEqual(chart[6].macdSignalDelta['2_3_2'].toFixed(2), '1.29')
        assert.deepEqual(chart[6].macdHistogram['2_3_2'].toFixed(2), '-0.52')
        assert.deepEqual(chart[6].macdHistogramDelta['2_3_2'].toFixed(2), '1.30')
    })
})