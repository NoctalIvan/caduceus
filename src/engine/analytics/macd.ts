import { IChartItem } from '../../interfaces/IChartItem';
import { MACD } from 'technicalindicators'
import { MACDOutput } from 'technicalindicators/declarations/moving_averages/MACD';

export function macd(chart:IChartItem[], period: number[]) {
    const macd = new MACD({values: [], fastPeriod: period[0], slowPeriod: period[1], signalPeriod: period[2], SimpleMASignal: false, SimpleMAOscillator: false})
    const periodStr = period.join('_')
    
    let lastValue:MACDOutput
    for(let i = 0; i < chart.length; i ++) {
        const item = chart[i]
        const value = macd.nextValue(item.close)

        item.macd = item.macd || {}
        item.macd[periodStr] = {
            macd: value && value.MACD,
            macdDelta: lastValue && value.MACD / lastValue.MACD - 1,
            signal: value && value.signal,
            signalDelta: lastValue && value.signal && lastValue.signal / value.signal - 1,
            histogram: value && value.histogram,
            histogramDelta: lastValue && value.histogram && lastValue.histogram / value.histogram - 1,
            
        }

        lastValue = value
    }
}