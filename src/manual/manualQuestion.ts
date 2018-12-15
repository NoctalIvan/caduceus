import { IQuestion } from "../interfaces/IQuestion";
import { ComparisonOperator } from "../enums/ComparisonOperator";
import { fetchAndAnswer, answerQuestion } from "../engine/answerQuestion";

const question:IQuestion = {
    symbol: 'aapl',
    condition: {
        analytic: {
            type: 'candlePatterns',
            subType: 'morningstar'
        },
        comparison: {
            operator: ComparisonOperator.TRUE,
        },
    },
    resultCondition: {
        analytic: {
            type: 'priceEvolution',
            subType: 'futureHighestRelative',
            period: [5]
        },
        comparison: {
            operator: ComparisonOperator.GT,
            value: -10
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