import axios from 'axios'
import { IChartItem } from '../interfaces/IChartItem';

export async function fetchChart(symbol:string, duration:string):Promise<IChartItem[]> {
    const res = await axios.get(`https://api.iextrading.com/1.0/stock/${symbol}/chart/${duration}`)
    return res.data
}