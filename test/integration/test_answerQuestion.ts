import { fetchEnrichedChart } from './../../src/engine/fetcher'
import { IEnrichedChartItem } from '../../src/interfaces/IChartItem';
import { IQuestion } from '../../src/interfaces/IQuestion'
import { ComparisonOperator } from '../../src/enums/ComparisonOperator';
import { answerQuestion } from '../../src/engine/answerQuestion'
import * as assert from 'assert'

describe('answerQuestion', () => {
    it('should resolve an easy question', async () => {
        const chart = await fetchEnrichedChart('aapl', '1m')
        const question:IQuestion = {
            symbol: 'aapl',
            condition: {
                analytic: 'lastChangePercent',
                comparison: {
                    operator: ComparisonOperator.LT,
                    value: -0.5
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

        const answer = answerQuestion(chart, question)
        assert.ok(answer)
        assert.ok(answer.matchingSize > 1)
    } )
})