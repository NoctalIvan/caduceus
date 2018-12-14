import { IEnrichedChartItem } from '../../interfaces/IChartItem';
import { MACD } from 'technicalindicators'
import { MACDOutput } from 'technicalindicators/declarations/moving_averages/MACD';

export function macd(chart:IEnrichedChartItem[], fastPeriod:number, slowPeriod:number, signalPeriod:number) {
    const analytic = new MACD({values: [], fastPeriod, slowPeriod, signalPeriod, SimpleMAOscillator: false, SimpleMASignal: false})
    const periodStr = [fastPeriod, slowPeriod, signalPeriod].join('_')

    let lastValue:MACDOutput
    chart.forEach(item => {
        const value = analytic.nextValue(item.close)
        if(!item.macd) {
            item.macd = {}
            item.macdDelta = {}
            item.macdSignal = {}
            item.macdSignalDelta = {}
            item.macdHistogram = {}
            item.macdHistogramDelta = {}
        }
        if(!value) {
            return
        }

        item.macd[periodStr] = value.MACD
        item.macdDelta[periodStr] = lastValue && value.MACD / lastValue.MACD - 1

        item.macdSignal[periodStr] = value.signal
        item.macdSignalDelta[periodStr] = lastValue && lastValue.signal && value.signal / lastValue.signal - 1

        item.macdHistogram[periodStr] = value.histogram
        item.macdHistogramDelta[periodStr] = lastValue && lastValue.histogram && value.histogram / lastValue.histogram - 1

        lastValue = value
    })
}