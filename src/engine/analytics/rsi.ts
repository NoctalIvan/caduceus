import { IChartItem } from "../../interfaces/IChartItem";
import { RSI } from 'technicalindicators' 

export function rsi(chart:IChartItem[], period: number) {
    const rsi = new RSI({values: [], period})
    
    let lastValue
    for(let i = 0; i < chart.length; i ++) {
        const item = chart[i]
        const value = rsi.nextValue(item.close)

        item.rsi = item.rsi || {}
        item.rsi[period] = {
            rsi: value,
            rsiDelta: lastValue && value / lastValue - 1
        }

        lastValue = value
    }
}
