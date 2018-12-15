export interface IBaseChartItem {
    date: string,
    open: number,
    high: number,
    low: number,
    close: number,
    volume: number,
    unadjustedVolume: number,
    change: number,
    changePercent: number,
    vwap: number,
    label: string,
    changeOverTime: number
}

export interface IChartItem extends IBaseChartItem {
    // past future ratio
    priceEvolution: {[period: string] : {
        past: number,
        pastRelative: number,
        future: number,
        futureRelative: number,
        pastLowest: number,
        pastLowestRelative: number,
        pastHighest: number,
        pastHighestRelative: number,
        futureLowest: number,
        futureLowestRelative: number,
        futureHighest: number,
        futureHighestRelative: number,
    }},

    // movingAvg
    movingAverages: {[period: string] : {
        sma: number,
        ema: number,
        wma: number,
        wema: number,
        smaRelative: number,
        emaRelative: number,
        wmaRelative: number,
        wemaRelative: number,
        smaDelta: number,
        emaDelta: number,
        wmaDelta: number,
        wemaDelta: number,
    }}

    // candle patterns
    candlePatterns: {[name: string]: boolean},

    // MACD
    macd: {[period: string] : {
        macd: number,
        macdDelta: number,
        signal: number,
        signalDelta: number,
        histogram: number,
        histogramDelta: number,
    }}
    
    // RSI
    rsi: {[period: string] : {
        rsi: number,
        rsiDelta: number,
    }}

    // ADX
    adx: {[period: string] : {
        adx: number,
        adxDelta: number,
        mdi: number,
        mdiDelta: number,
        pdi: number,
        pdiDelta: number,
    }}

    atr: {[period: string] : {
        atr: number,
        atrDelta: number,
    }}

    roc: {[period: string] : {
        roc: number,
        rocDelta: number,
    }}
}