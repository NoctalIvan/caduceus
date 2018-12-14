import { IChartItem } from "../../src/interfaces/IChartItem";
import * as assert from 'assert'
import { candlePattern } from '../../src/engine/analytics/candlePatterns'
import { CandlePattern } from "../../src/enums/candlePattern";

it('analytics - candle patterns', () => {
    const chart:IChartItem[] = require('./../mocks/appl.json')
    Object.keys(CandlePattern).forEach((pat:CandlePattern) => {
        candlePattern(chart, pat)
        assert.notEqual(chart[5].candlePatterns[pat], undefined)
    })
    assert.deepEqual(
        chart.map(a => a.candlePatterns && a.candlePatterns.bearishspinningtop).filter(a => a).length,
        10
    )
})