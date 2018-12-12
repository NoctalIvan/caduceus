import { IQuestion } from "../interfaces/IQuestion";
import { ComparisonOperator } from "../enums/ComparisonOperator";
import { fetchAndAnswer, answerQuestion } from "../engine/answerQuestion";

const question:IQuestion = {
    symbol: 'aapl',
    condition: {
        analytic: 'lastChangePercent',
        comparison: {
            operator: ComparisonOperator.LT,
            value: -2
        },
    },
    resultCondition: {
        analytic: 'futureChangePercent',
        comparison: {
            operator: ComparisonOperator.GT,
            value: 0.5
        }
    }
}

fetchAndAnswer(question).then(answer => {
    console.log(question)
    console.log(answer)
    console.log({
        dummyRatio: answer.dummySize / answer.totalSize,
        matchingRatio: answer.matchingSize / answer.sampleSize,
        sampleSizeRatio: answer.sampleSize / answer.totalSize
    })
})