import { IQuestion, IAnswer } from "../interfaces/IQuestion";
import { getConditionFunction } from "./getConditionFunction";
import { IChartItem } from "../interfaces/IChartItem";
import { fetchChart } from "./fetcher";
import anal from "./analytics/index";

export function answerQuestion(chart:IChartItem[], question:IQuestion):IAnswer {   
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
    const chart = await fetchChart(question.symbol, '5y')
    anal.candlePatterns(chart)
    anal.priceEvolution(chart, 3)

    return answerQuestion(chart, question)
}