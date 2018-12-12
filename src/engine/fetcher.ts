import axios from 'axios'
import { IChartItem, IEnrichedChartItem } from '../interfaces/IChartItem';
import { enrichChart } from './enrichChart';

export async function fetchChart(symbol:string, duration:string):Promise<IChartItem[]> {
    const res = await axios.get(`https://api.iextrading.com/1.0/stock/${symbol}/chart/${duration}`)
    return res.data
}

export async function fetchEnrichedChart(symbol:string, duration:string):Promise<IEnrichedChartItem[]> {
    const chart = await fetchChart(symbol, duration)
    return enrichChart(chart)
}