import { IChartItem } from "../../interfaces/IChartItem";
import { ADX } from 'technicalindicators' 

export function adx(chart:IChartItem[], period: number) {
    let adx = new ADX({low: [], high: [], close: [], period})
    let lastValue
    for(let i = 0; i < chart.length; i ++) {
        const item = chart[i]
        const value = adx.nextValue(item)
        if(!value) continue
        
        item.adx = item.adx || {}
        item.adx[period] = {
            adx: value.adx,
            adxDelta: lastValue && lastValue.adx && value.adx / lastValue.adx - 1,
            pdi: value.pdi,
            pdiDelta: lastValue && lastValue.pdi && value.pdi / lastValue.pdi - 1,
            mdi: value.mdi,
            mdiDelta: lastValue && lastValue.mdi && value.mdi / lastValue.mdi - 1
        }

        lastValue = value
    }
}
