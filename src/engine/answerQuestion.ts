import { IQuestion } from "../interfaces/IQuestion";
import { getConditionFunction } from "./getConditionFunction";
import { IAnswer } from "../interfaces/IAnswer";
import { IEnrichedChartItem } from "../interfaces/IChartItem";
import { fetchEnrichedChart } from "./fetcher";

export function answerQuestion(chart:IEnrichedChartItem[], question:IQuestion):IAnswer {   
    const conditionFunction = getConditionFunction(question.condition)
    const resultFunction = getConditionFunction(question.resultCondition)

    const chartMatchingCondition = chart.filter(item => conditionFunction(item))
    const chartMatchingResult = chart.filter(item => resultFunction(item))
    const chartMatchingBoth = chartMatchingCondition.filter(item => resultFunction(item))

    return {
        totalSize: chart.length,
        sampleSize: chartMatchingCondition.length,
        matchingSize: chartMatchingBoth.length,
        dummySize: chartMatchingResult.length,
    }
}

export async function fetchAndAnswer(question: IQuestion):Promise<IAnswer> {
    const chart = await fetchEnrichedChart(question.symbol, '5y')
    return answerQuestion(chart, question)
} 