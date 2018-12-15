import { IChartItem } from "../../interfaces/IChartItem";
import { CandlePattern } from "../../enums/candlePattern";
import * as anal from 'technicalindicators'

export function candlePattern(chart:IChartItem[], pattern?:CandlePattern) {
    if(!pattern) {
        Object.keys(CandlePattern).forEach((pat:CandlePattern) => {
            candlePattern(chart, pat)
        })

        return
    }

    const analytic = anal[pattern.toString()]
    for(let i = 4; i < chart.length; i ++) {
        const item = chart[i]
        if(!item.candlePatterns) {
            item.candlePatterns = {}
        }

        const subChart = chart.slice(i - 4, i + 1)
        item.candlePatterns[pattern.toString()] = analytic({
            open: subChart.map(a => a.open),
            high: subChart.map(a => a.high),
            close: subChart.map(a => a.close),
            low: subChart.map(a => a.low),
        })
    }
}
