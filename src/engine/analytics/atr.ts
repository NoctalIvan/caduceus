import { IChartItem } from "../../interfaces/IChartItem";
import { ATR } from 'technicalindicators' 

export function atr(chart:IChartItem[], period: number) {
    let atr = new ATR({low: [], high: [], close: [], period})
    let lastValue
    for(let i = 0; i < chart.length; i ++) {
        const item = chart[i]
        const value = atr.nextValue(item)
        if(!value) continue
        
        item.atr = item.atr || {}
        item.atr[period] = {
            atr: value,
            atrDelta: lastValue && lastValue && value / lastValue - 1,
        }

        lastValue = value
    }
}
