import { IChartItem } from "../../interfaces/IChartItem";
import { SMA, EMA, WMA, WEMA } from 'technicalindicators' 

export function movingAverages(chart:IChartItem[], period: number) {
    const sma = new SMA({values: [], period})
    const ema = new EMA({values: [], period})
    const wma = new WMA({values: [], period})
    const wema = new WEMA({values: [], period})
    
    let lastValue
    for(let i = 0; i < chart.length; i ++) {
        const item = chart[i]
        const value = {
            sma: sma.nextValue(item.close),
            ema: ema.nextValue(item.close),
            wma: wma.nextValue(item.close),
            wema: wema.nextValue(item.close),
        }

        item.movingAverages = item.movingAverages || {}
        item.movingAverages[period] = {
            sma: value.sma,
            ema: value.ema,
            wma: value.wma,
            wema: value.sma,

            smaRelative: value.sma && value.sma / item.close - 1,
            emaRelative: value.ema && value.ema / item.close - 1,
            wmaRelative: value.wma && value.wma / item.close - 1,
            wemaRelative: value.wema && value.wema / item.close - 1,

            smaDelta: lastValue && lastValue.sma && value.sma / lastValue.sma - 1,
            emaDelta: lastValue && lastValue.ema && value.ema / lastValue.ema - 1,
            wmaDelta: lastValue && lastValue.wma && value.wma / lastValue.wma - 1,
            wemaDelta: lastValue && lastValue.wema && value.wema / lastValue.wema - 1,
        }

        lastValue = value
    }
}
