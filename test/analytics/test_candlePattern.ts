import { IEnrichedChartItem } from "../../src/interfaces/IChartItem";
import * as assert from 'assert'
import { candlePattern } from '../../src/engine/analytics/candlePatterns'
import { CandlePattern } from "../../src/enums/candlePattern";

describe('analytics - pattern', () => {
    const chart:IEnrichedChartItem[] = require('./../mocks/appl.json')

    it('all patterns', () => {
        Object.keys(CandlePattern).forEach((pat:CandlePattern) => {
            candlePattern(chart, pat)
            assert.notEqual(chart[5].candlePatterns[pat], undefined)
        })
        assert.deepEqual(
            chart.map(a => a.candlePatterns && a.candlePatterns.bearishspinningtop).filter(a => a).length,
            10
        )
    })
})