import axios from 'axios'
import { IChartItem } from '../interfaces/IChartItem';

export async function fetchChart(symbol:string, interval?: string):Promise<IChartItem[]> { 
    if(interval && symbol.indexOf('BTC') != -1) {
        return fetchBinance(symbol, interval)
    }

    return fetchIex(symbol, '5y')
}

export async function fetchIex(symbol:string, duration:string):Promise<IChartItem[]> {
    const res = await axios.get(`https://api.iextrading.com/1.0/stock/${symbol}/chart/${duration}`)
    return res.data
}

export async function fetchBinance(symbol:string, interval:string):Promise<IChartItem[]> {
    const res = await axios.get(`https://api.binance.com/api/v1/klines?symbol=${symbol}&interval=${interval}&limit=2000`)
    return res.data
}